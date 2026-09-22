// components/codearn-ai/chat-container.tsx

"use client";

import { useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, RefreshCw, Plus } from "lucide-react";
import { useChat } from "@/lib/codearn-ai/use-chat";
import { getFollowUps } from "@/lib/codearn-ai/suggestions-map";
import ChatMessage from "./chat-message";
import ChatInput from "./chat-input";
import ChatEmpty from "./chat-empty";
import ChatTyping from "./chat-typing";
import ChatSuggestions from "./chat-suggestions";

interface ChatContainerProps {
  variant?: "page" | "widget";
}

export default function ChatContainer({
  variant = "page",
}: ChatContainerProps) {
  const {
    messages,
    isLoading,
    error,
    rateLimit,
    hydrated,
    sendMessage,
    regenerate,
    reset,
  } = useChat();

  const scrollRef = useRef<HTMLDivElement>(null);
  const isCompact = variant === "widget";
  const isEmpty = messages.length === 0;

  /* Auto scroll on new messages */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  /* Compute follow-up suggestions based on last AI message */
  const followUps = useMemo(() => {
    if (isLoading) return [];
    if (messages.length === 0) return [];
    const last = messages[messages.length - 1];
    if (last.role !== "assistant") return [];
    return getFollowUps(last.content);
  }, [messages, isLoading]);

  const lastAiIndex = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return i;
    }
    return -1;
  }, [messages]);

  const showFollowUps = !isLoading && followUps.length > 0 && !error;

  /* Don't render until hydration to avoid flicker */
  if (!hydrated) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          <p className="text-xs text-muted-foreground">Loading conversation…</p>
        </div>
      </div>
    );
  }

  return (
    /* ✅ FIX 1: outer wrapper has `min-h-0` so children can shrink */
    <div className="flex h-full min-h-0 flex-col">
      {/* Top bar — New chat button (only when messages exist) */}
      {!isEmpty && (
        <div
          className={`flex shrink-0 items-center justify-between border-b border-border ${
            isCompact ? "px-3 py-2" : "px-6 py-2.5"
          }`}
        >
          <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            Conversation
          </p>
          <button
            onClick={reset}
            disabled={isLoading}
            className="group flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
          >
            <Plus className="h-3 w-3 transition-transform group-hover:rotate-90" />
            <span>New chat</span>
          </button>
        </div>
      )}

      {/* ✅ FIX 2: messages area has `min-h-0` + custom scrollbar class */}
      <div
        ref={scrollRef}
        className="codearn-ai-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain"
      >
        {isEmpty && !isLoading ? (
          <ChatEmpty onSelectSuggestion={sendMessage} compact={isCompact} />
        ) : (
          <div
            className={`space-y-5 ${
              isCompact ? "p-4 pb-2" : "mx-auto max-w-3xl px-6 py-8"
            }`}
          >
            {messages.map((message, i) => (
              <ChatMessage
                key={`${message.role}-${i}`}
                message={message}
                index={i}
                isLast={i === lastAiIndex}
                onRegenerate={
                  i === lastAiIndex && messages.length > 1
                    ? regenerate
                    : undefined
                }
                showActions={i === lastAiIndex}
              />
            ))}

            <AnimatePresence>
              {isLoading && <ChatTyping />}
            </AnimatePresence>

            {/* Error message */}
            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-xs text-destructive">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <div className="flex-1">
                  <p>{error}</p>
                  <button
                    onClick={reset}
                    className="mt-2 inline-flex items-center gap-1 font-medium underline-offset-2 hover:underline"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Start over
                  </button>
                </div>
              </div>
            )}

            {/* Follow-up suggestions */}
            <AnimatePresence>
              {showFollowUps && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pl-10"
                >
                  <p className="mb-2 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                    Ask next
                  </p>
                  <ChatSuggestions
                    onSelect={sendMessage}
                    suggestions={followUps}
                    variant="followup"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Input area — shrink-0 so it never collapses */}
      <div
        className={`shrink-0 border-t border-border bg-background/80 backdrop-blur-sm ${
          isCompact ? "p-3" : "px-6 py-4"
        }`}
      >
        <div className={isCompact ? "" : "mx-auto max-w-3xl"}>
          <ChatInput
            onSend={sendMessage}
            isLoading={isLoading}
            autoFocus={!isCompact}
          />

          {/* Footer meta */}
          {!isCompact && (
            <div className="mt-2.5 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>
                CodEarn AI can make mistakes. Verify important information.
              </span>
              {rateLimit && (
                <span className="tabular-nums">
                  {rateLimit.remaining} messages left this hour
                </span>
              )}
            </div>
          )}

          {isCompact && rateLimit && (
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              {rateLimit.remaining} messages left this hour
            </p>
          )}
        </div>
      </div>
    </div>
  );
}