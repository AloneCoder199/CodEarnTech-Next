// lib/codearn-ai/use-copy.ts

"use client";

import { useCallback, useState } from "react";

export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
      return true;
    } catch (err) {
      console.error("[useCopy] failed:", err);
      return false;
    }
  }, []);

  return { copy, copied };
}