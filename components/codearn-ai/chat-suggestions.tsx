// components/codearn-ai/chat-suggestions.tsx

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const DEFAULT_SUGGESTIONS = [
  "What is CodEarn?",
  "What is GigThink?",
  "Who founded CodEarn?",
  "What does CodEarn build?",
  "How can I work with CodEarn?",
  "Does CodEarn build custom software?",
];

interface ChatSuggestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
  compact?: boolean;
  suggestions?: string[];
  variant?: "default" | "followup";
}

export default function ChatSuggestions({
  onSelect,
  disabled = false,
  compact = false,
  suggestions,
  variant = "default",
}: ChatSuggestionsProps) {
  const items =
    suggestions ||
    (compact ? DEFAULT_SUGGESTIONS.slice(0, 4) : DEFAULT_SUGGESTIONS);

  const isFollowUp = variant === "followup";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: isFollowUp ? 0 : 0.2 }}
      className="flex flex-wrap gap-2"
    >
      {items.map((question, i) => (
        <motion.button
          key={question}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (isFollowUp ? 0 : 0.25) + i * 0.04 }}
          onClick={() => !disabled && onSelect(question)}
          disabled={disabled}
          className={`group inline-flex items-center gap-1.5 rounded-full border transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${
            isFollowUp
              ? "border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium text-primary hover:border-primary/40 hover:bg-primary/10"
              : "border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-sm hover:border-primary/40 hover:bg-card hover:text-foreground"
          }`}
        >
          <span>{question}</span>
          <ArrowUpRight
            className={`h-3 w-3 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
              isFollowUp
                ? "text-primary"
                : "text-muted-foreground group-hover:text-primary"
            }`}
          />
        </motion.button>
      ))}
    </motion.div>
  );
}