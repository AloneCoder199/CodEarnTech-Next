// components/smart-editor.tsx
'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link as LinkIcon,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Quote,
  Code,
  Trash2,
  Wand2,
  Type,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface SmartEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

// Auto-format text on paste
const autoFormatText = (text: string): string => {
  if (!text) return '';
  
  const lines = text.split('\n').filter(line => line.trim());
  let formattedHTML = '';
  let inList = false;
  let listType = '';
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const lower = trimmed.toLowerCase();
    
    // Detect headings (ALL CAPS or ends with :)
    const isHeading1 = trimmed === trimmed.toUpperCase() && trimmed.length > 3 && trimmed.length < 50;
    const isHeading2 = trimmed.endsWith(':') && trimmed.length < 60;
    const isHeading3 = /^(chapter|section|part|step|tip|note|warning)/i.test(lower);
    
    // Detect list items
    const isBullet = /^[-•*]\s/.test(trimmed) || /^\d+[.)]\s/.test(trimmed);
    const isNumbered = /^\d+[.)]\s/.test(trimmed);
    
    // Detect code block (indentation or special chars)
    const isCode = trimmed.startsWith('    ') || trimmed.startsWith('\t') || /[{};]/.test(trimmed);
    
    // Detect quote
    const isQuote = trimmed.startsWith('"') || trimmed.startsWith("'") || trimmed.startsWith('>');
    
    // Close previous list if needed
    if (inList && !isBullet) {
      formattedHTML += listType === 'ol' ? '</ol>' : '</ul>';
      inList = false;
    }
    
    // Format based on type
    if (isHeading1 || isHeading2 || isHeading3) {
      const cleanText = trimmed.replace(/:$/, '');
      formattedHTML += `<h2 class="text-xl font-bold text-foreground mt-4 mb-2 border-b border-border pb-1">${cleanText}</h2>`;
    } 
    else if (isQuote) {
      const cleanText = trimmed.replace(/^["'>]\s*/, '');
      formattedHTML += `<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground my-3 bg-muted/30 py-2 pr-2 rounded-r">${cleanText}</blockquote>`;
    }
    else if (isCode) {
      formattedHTML += `<pre class="bg-muted p-3 rounded-lg font-mono text-sm overflow-x-auto my-3 border border-border"><code>${trimmed}</code></pre>`;
    }
    else if (isBullet) {
      if (!inList) {
        listType = isNumbered ? 'ol' : 'ul';
        formattedHTML += `<${listType} class="${isNumbered ? 'list-decimal' : 'list-disc'} pl-6 my-3 space-y-1">`;
        inList = true;
      }
      const cleanText = trimmed.replace(/^[-•*\d.)]\s*/, '');
      formattedHTML += `<li class="text-foreground leading-relaxed">${cleanText}</li>`;
    }
    else {
      // Regular paragraph with smart formatting
      let formatted = trimmed
        // Auto-bold text between ** or __
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')
        .replace(/__(.*?)__/g, '<strong class="font-bold text-foreground">$1</strong>')
        // Auto-italic between * or _
        .replace(/\*(.*?)\*/g, '<em class="italic text-foreground/90">$1</em>')
        .replace(/_(.*?)_/g, '<em class="italic text-foreground/90">$1</em>')
        // Auto-links
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="text-primary underline underline-offset-4 hover:text-primary/80" target="_blank">$1</a>');
      
      formattedHTML += `<p class="text-foreground leading-relaxed mb-3 last:mb-0">${formatted}</p>`;
    }
  });
  
  // Close any open list
  if (inList) {
    formattedHTML += listType === 'ol' ? '</ol>' : '</ul>';
  }
  
  return formattedHTML;
};

export function SmartEditor({ 
  content, 
  onChange, 
  placeholder = "Paste your text here, or start typing... We'll auto-format it for you" 
}: SmartEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([content]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isAutoFormatting, setIsAutoFormatting] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  // Check active formats
  const checkFormats = useCallback(() => {
    if (!editorRef.current) return;
    
    const formats = [];
    if (document.queryCommandState('bold')) formats.push('bold');
    if (document.queryCommandState('italic')) formats.push('italic');
    if (document.queryCommandState('underline')) formats.push('underline');
    if (document.queryCommandState('insertUnorderedList')) formats.push('insertUnorderedList');
    if (document.queryCommandState('insertOrderedList')) formats.push('insertOrderedList');
    if (document.queryCommandState('justifyLeft')) formats.push('justifyLeft');
    if (document.queryCommandState('justifyCenter')) formats.push('justifyCenter');
    if (document.queryCommandState('justifyRight')) formats.push('justifyRight');
    
    setActiveFormats(formats);
  }, []);

  // Smart paste handler
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text/plain');
    
    if (isAutoFormatting && pastedText.length > 20) {
      // Auto-format pasted text
      const formatted = autoFormatText(pastedText);
      document.execCommand('insertHTML', false, formatted);
      setIsAutoFormatting(false); // Disable after first paste to allow manual editing
    } else {
      // Plain paste
      document.execCommand('insertText', false, pastedText);
    }
    
    checkFormats();
    saveToHistory();
  }, [isAutoFormatting, checkFormats]);

  // Execute command
  const execCommand = useCallback((command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    checkFormats();
    saveToHistory();
  }, [checkFormats]);

  // Save to history
  const saveToHistory = useCallback(() => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(html);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    onChange(html);
  }, [history, historyIndex, onChange]);

  // Handle input
  const handleInput = useCallback(() => {
    if (!editorRef.current) return;
    onChange(editorRef.current.innerHTML);
    checkFormats();
  }, [onChange, checkFormats]);

  // Undo/Redo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      if (editorRef.current) {
        editorRef.current.innerHTML = history[newIndex];
        onChange(history[newIndex]);
      }
    }
  }, [history, historyIndex, onChange]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      if (editorRef.current) {
        editorRef.current.innerHTML = history[newIndex];
        onChange(history[newIndex]);
      }
    }
  }, [history, historyIndex, onChange]);

  // Auto-format existing content on mount
  useEffect(() => {
    if (content && isAutoFormatting && editorRef.current) {
      const plainText = editorRef.current.innerText;
      if (plainText.length > 50 && !content.includes('<h')) {
        const formatted = autoFormatText(plainText);
        editorRef.current.innerHTML = formatted;
        onChange(formatted);
        setIsAutoFormatting(false);
      }
    }
  }, []);

  // Toolbar button
  const ToolbarButton = ({ 
    command, 
    icon: Icon, 
    label, 
    isActive = false 
  }: { 
    command: string; 
    icon: React.ElementType; 
    label: string;
    isActive?: boolean;
  }) => (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            pressed={isActive}
            onPressedChange={() => execCommand(command)}
            className="data-[state=on]:bg-primary/10 data-[state=on]:text-primary h-8 w-8 p-0 hover:bg-muted"
          >
            <Icon className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="border rounded-2xl overflow-hidden bg-background shadow-lg focus-within:ring-2 focus-within:ring-primary/20 transition-all">
      {/* Header with Smart Badge */}
      <div className="border-b px-4 py-3 flex items-center justify-between bg-gradient-to-r from-muted/50 to-background">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">Smart Editor</span>
          </div>
          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Auto-Format
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      {!showPreview && (
        <div className="border-b p-2 flex gap-1 flex-wrap bg-muted/20 items-center">
          {/* Text Style */}
          <div className="flex gap-0.5">
            <ToolbarButton command="bold" icon={Bold} label="Bold (Ctrl+B)" isActive={activeFormats.includes('bold')} />
            <ToolbarButton command="italic" icon={Italic} label="Italic (Ctrl+I)" isActive={activeFormats.includes('italic')} />
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Headings */}
          <div className="flex gap-0.5">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => execCommand('formatBlock', 'H1')}>
                    <Heading1 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs"><p>Heading 1</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => execCommand('formatBlock', 'H2')}>
                    <Heading2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs"><p>Heading 2</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Lists */}
          <div className="flex gap-0.5">
            <ToolbarButton command="insertUnorderedList" icon={List} label="Bullet List" isActive={activeFormats.includes('insertUnorderedList')} />
            <ToolbarButton command="insertOrderedList" icon={ListOrdered} label="Numbered List" isActive={activeFormats.includes('insertOrderedList')} />
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Alignment */}
          <div className="flex gap-0.5">
            <ToolbarButton command="justifyLeft" icon={AlignLeft} label="Align Left" isActive={activeFormats.includes('justifyLeft')} />
            <ToolbarButton command="justifyCenter" icon={AlignCenter} label="Center" isActive={activeFormats.includes('justifyCenter')} />
            <ToolbarButton command="justifyRight" icon={AlignRight} label="Align Right" isActive={activeFormats.includes('justifyRight')} />
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Insert */}
          <div className="flex gap-0.5">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Toggle size="sm" onPressedChange={() => {
                    const url = prompt('Enter URL:');
                    if (url) execCommand('createLink', url);
                  }} className="h-8 w-8 p-0">
                    <LinkIcon className="h-4 w-4" />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs"><p>Insert Link</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => execCommand('formatBlock', 'BLOCKQUOTE')}>
                    <Quote className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs"><p>Quote</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => execCommand('formatBlock', 'PRE')}>
                    <Code className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs"><p>Code Block</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Clear & Undo/Redo */}
          <div className="flex gap-0.5 ml-auto">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => execCommand('removeFormat')}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs"><p>Clear Format</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="w-px h-6 bg-border mx-1" />
            
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleUndo} disabled={historyIndex <= 0}>
                    <Undo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs"><p>Undo (Ctrl+Z)</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRedo} disabled={historyIndex >= history.length - 1}>
                    <Redo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs"><p>Redo (Ctrl+Y)</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}

      {/* Editor Area */}
      <div className="relative bg-background">
        {!showPreview ? (
          <div
            ref={editorRef}
            contentEditable
            className="prose prose-sm dark:prose-invert max-w-none p-6 min-h-[400px] outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground empty:before:italic text-foreground leading-relaxed"
            data-placeholder={placeholder}
            dangerouslySetInnerHTML={{ __html: content }}
            onInput={handleInput}
            onKeyUp={checkFormats}
            onMouseUp={checkFormats}
            onPaste={handlePaste}
            onBlur={saveToHistory}
          />
        ) : (
          <div className="p-6 min-h-[400px] prose prose-sm dark:prose-invert max-w-none bg-muted/20">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
      </div>

      {/* Smart Footer */}
      <div className="border-t px-4 py-3 bg-muted/30 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="flex items-center gap-1">
            <Type className="w-3 h-3" />
            {content.replace(/<[^>]*>/g, '').length} words
          </span>
          <span className="hidden sm:inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-primary" />
            Auto-formatting {isAutoFormatting ? 'ON' : 'OFF'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Paste text to auto-format</span>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: hsl(var(--muted-foreground));
          font-style: italic;
          pointer-events: none;
        }
        
        [contenteditable] h1, [contenteditable] h2 {
          color: hsl(var(--foreground));
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        [contenteditable] h1 { font-size: 1.5rem; }
        [contenteditable] h2 { font-size: 1.25rem; border-bottom: 1px solid hsl(var(--border)); padding-bottom: 0.5rem; }
        
        [contenteditable] p {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }
        
        [contenteditable] blockquote {
          border-left: 4px solid hsl(var(--primary));
          padding: 0.75rem 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: hsl(var(--muted-foreground));
          background: hsl(var(--muted) / 0.3);
          border-radius: 0 0.5rem 0.5rem 0;
        }
        
        [contenteditable] pre {
          background: hsl(var(--muted));
          padding: 1rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          font-family: ui-monospace, monospace;
          font-size: 0.875rem;
          border: 1px solid hsl(var(--border));
          margin: 1rem 0;
        }
        
        [contenteditable] ul, [contenteditable] ol {
          padding-left: 1.5rem;
          margin: 0.75rem 0;
        }
        
        [contenteditable] li {
          margin-bottom: 0.25rem;
          line-height: 1.6;
        }
        
        [contenteditable] a {
          color: hsl(var(--primary));
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 2px;
          font-weight: 500;
        }
        
        [contenteditable] strong, [contenteditable] b {
          color: hsl(var(--foreground));
          font-weight: 700;
        }
        
        [contenteditable] em, [contenteditable] i {
          color: hsl(var(--foreground) / 0.9);
        }
      `}</style>
    </div>
  );
}