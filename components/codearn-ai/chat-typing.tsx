// components/codearn-ai/chat-typing.tsx

"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ChatTyping() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start"
    >
      <div className="flex max-w-[90%] items-start gap-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-primary" />
        </div>

        <div className="rounded-2xl rounded-tl-sm border border-border bg-card/80 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary/60 [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary/60 [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary/60 [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}