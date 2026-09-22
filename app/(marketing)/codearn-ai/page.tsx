// app/codearn-ai/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ChatContainer from "@/components/codearn-ai/chat-container";

export const metadata: Metadata = {
  title: "CodEarn AI — Ask anything about CodEarn",
  description:
    "The official AI assistant for CodEarn. Ask about our products, founder, services, and what we're building.",
};

export default function CodEarnAIPage() {
  return (
    <main className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Top bar */}
      <div className="shrink-0 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back
          </Link>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Live
            </span>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="min-h-0 flex-1">
        <ChatContainer variant="page" />
      </div>
    </main>
  );
}