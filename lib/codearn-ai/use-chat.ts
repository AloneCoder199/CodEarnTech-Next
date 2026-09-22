// lib/codearn-ai/use-chat.ts

"use client";

import { useCallback, useEffect, useState } from "react";
import type { ChatMessage, ChatResponse } from "./types";

interface RateLimitInfo {
  remaining: number;
  resetAt: string;
}

interface UseChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  rateLimit: RateLimitInfo | null;
}

const INITIAL_STATE: UseChatState = {
  messages: [],
  isLoading: false,
  error: null,
  rateLimit: null,
};

const STORAGE_KEY = "codearn-ai-conversation";

interface StoredConversation {
  messages: ChatMessage[];
  conversationId?: string;
  savedAt: number;
}

/* ============================================================
   PERSISTENCE HELPERS
============================================================ */
function loadStoredConversation(): StoredConversation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConversation;
    // Only restore if saved within last 24 hours
    const ONE_DAY = 24 * 60 * 60 * 1000;
    if (Date.now() - parsed.savedAt > ONE_DAY) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveStoredConversation(data: StoredConversation) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or disabled — silently ignore
  }
}

function clearStoredConversation() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/* ============================================================
   HOOK
============================================================ */
export function useChat() {
  const [state, setState] = useState<UseChatState>(INITIAL_STATE);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [hydrated, setHydrated] = useState(false);

  /* --------------------------------------------------------
     Load persisted conversation on mount
  -------------------------------------------------------- */
  useEffect(() => {
    const stored = loadStoredConversation();
    if (stored) {
      setState((s) => ({ ...s, messages: stored.messages }));
      setConversationId(stored.conversationId);
    }
    setHydrated(true);
  }, []);

  /* --------------------------------------------------------
     Save conversation on change
  -------------------------------------------------------- */
  useEffect(() => {
    if (!hydrated) return;
    if (state.messages.length === 0) return;
    saveStoredConversation({
      messages: state.messages,
      conversationId,
      savedAt: Date.now(),
    });
  }, [state.messages, conversationId, hydrated]);

  /* --------------------------------------------------------
     Core fetch function
  -------------------------------------------------------- */
  const runRequest = useCallback(
    async (
      message: string,
      historyOverride?: ChatMessage[],
      options?: { isRegenerate?: boolean }
    ) => {
      const trimmed = message.trim();
      if (!trimmed) return;

      try {
        const res = await fetch("/api/codearn-ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            conversationId,
            history: historyOverride || state.messages.slice(-10),
            isRegenerate: options?.isRegenerate || false,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setState((s) => ({
            ...s,
            isLoading: false,
            error: data?.error || "Something went wrong. Please try again.",
          }));
          return;
        }

        const response = data as ChatResponse;

        setState((s) => ({
          ...s,
          messages: [
            ...s.messages,
            { role: "assistant", content: response.reply },
          ],
          isLoading: false,
          rateLimit: response.meta.rateLimit,
        }));
        setConversationId(response.conversationId);
      } catch (err) {
        console.error("[useChat] send error:", err);
        setState((s) => ({
          ...s,
          isLoading: false,
          error: "Network error. Please try again.",
        }));
      }
    },
    [conversationId, state.messages]
  );

  /* --------------------------------------------------------
     Send a new message
  -------------------------------------------------------- */
  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || state.isLoading) return;

      const userMessage: ChatMessage = { role: "user", content: trimmed };
      setState((s) => ({
        ...s,
        messages: [...s.messages, userMessage],
        isLoading: true,
        error: null,
      }));

      await runRequest(trimmed, [
        ...state.messages.slice(-10),
        userMessage,
      ]);
    },
    [runRequest, state.isLoading, state.messages]
  );

  /* --------------------------------------------------------
     Regenerate the last AI response
  -------------------------------------------------------- */
  const regenerate = useCallback(async () => {
    if (state.isLoading) return;
    if (state.messages.length < 2) return;

    // Find the last user message
    const lastUserIdx = [...state.messages]
      .reverse()
      .findIndex((m) => m.role === "user");

    if (lastUserIdx === -1) return;

    const realIdx = state.messages.length - 1 - lastUserIdx;
    const lastUserMessage = state.messages[realIdx];
    const historyUpToLast = state.messages.slice(0, realIdx);

    // Remove the last AI response, keep loading state
    setState((s) => ({
      ...s,
      messages: historyUpToLast,
      isLoading: true,
      error: null,
    }));

    await runRequest(lastUserMessage.content, historyUpToLast, {
      isRegenerate: true,
    });
  }, [state.isLoading, state.messages, runRequest]);

  /* --------------------------------------------------------
     Reset / New Chat
  -------------------------------------------------------- */
  const reset = useCallback(() => {
    setState(INITIAL_STATE);
    setConversationId(undefined);
    clearStoredConversation();
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    rateLimit: state.rateLimit,
    hydrated,
    sendMessage,
    regenerate,
    reset,
  };
}