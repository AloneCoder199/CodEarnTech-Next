'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SmartEditor } from '@/components/tiptap-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Send, Eye } from 'lucide-react';

export default function NewsletterPage() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('<p>Start writing your newsletter here...</p>');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (!subject.trim() || !content.trim()) {
      setStatus('error');
      setMessage('Please fill in both subject and content');
      return;
    }

    if (!confirm(`Are you sure you want to send this newsletter to all active subscribers?`)) {
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/admin/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, content }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(`Newsletter sent successfully! Sent to ${data.stats.success} subscribers.`);
        setSubject('');
        setContent('<p>Start writing your newsletter here...</p>');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to send newsletter');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to send newsletter. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Compose Newsletter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Subject Line</label>
            <Input
              placeholder="Enter newsletter subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <SmartEditor content={content} onChange={setContent} />
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="mr-2 h-4 w-4" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>
            
            <Button 
              onClick={handleSend}
              disabled={status === 'loading'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send to All Subscribers
                </>
              )}
            </Button>
          </div>

          {showPreview && (
            <div className="border rounded-lg p-6 bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">Preview</h3>
              <div 
                className="prose max-w-none bg-white p-6 rounded border"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          )}

          {status === 'success' && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                {message}
              </AlertDescription>
            </Alert>
          )}

          {status === 'error' && (
            <Alert variant="destructive">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}