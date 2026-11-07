"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bot, LoaderCircle, Send, X } from "lucide-react";
import { baseUrl } from "@/lib/constants";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Reference = {
  id: string;
  type: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  documentUrl?: string;
  documentLabel?: string;
};

type WebSource = {
  url: string;
  title: string;
};

type ApiResponse = {
  answer: string;
  references: Reference[];
  webSources: WebSource[];
  message?: string;
};

const welcomeMessage: Message = {
  role: "assistant",
  content: "Hi, I am **The Doer AI**. How can I help you?",
};

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="rounded bg-muted px-1 py-0.5 text-[0.9em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function FormattedAnswer({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    const heading = line.match(/^#{1,3}\s+(.+)$/);
    if (heading) {
      blocks.push(
        <h3 key={`heading-${index}`} className="mb-1 mt-3 text-base font-bold first:mt-0">
          {renderInline(heading[1])}
        </h3>,
      );
      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line) || /^\d+[.)]\s+/.test(line)) {
      const ordered = /^\d+[.)]\s+/.test(line);
      const listItems: ReactNode[] = [];
      while (index < lines.length && (/^[-*]\s+/.test(lines[index].trim()) || /^\d+[.)]\s+/.test(lines[index].trim()))) {
        const item = lines[index].trim().replace(/^(?:[-*]|\d+[.)])\s+/, "");
        listItems.push(<li key={`list-${index}`}>{renderInline(item)}</li>);
        index += 1;
      }
      const List = ordered ? "ol" : "ul";
      blocks.push(
        <List
          key={`list-block-${index}`}
          className={`${ordered ? "list-decimal" : "list-disc"} my-2 space-y-1 pl-5`}
        >
          {listItems}
        </List>,
      );
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^#{1,3}\s+/.test(lines[index].trim()) &&
      !/^[-*]\s+/.test(lines[index].trim()) &&
      !/^\d+[.)]\s+/.test(lines[index].trim())
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(
      <p key={`paragraph-${index}`} className="my-2 first:mt-0 last:mb-0">
        {renderInline(paragraph.join(" "))}
      </p>,
    );
  }

  return <div className="text-sm leading-6">{blocks}</div>;
}

function ResultImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={72}
      height={72}
      unoptimized
      className="size-16 shrink-0 rounded-sm object-cover"
      onError={() => setFailed(true)}
    />
  );
}

function ReferenceCard({
  reference,
  onNavigate,
}: {
  reference: Reference;
  onNavigate: () => void;
}) {
  const internal = reference.url.startsWith("/");
  const externalDocument =
    reference.documentUrl && !reference.documentUrl.startsWith("/");

  return (
    <article className="flex gap-3 rounded-sm border border-black/10 bg-white p-3">
      {reference.image && (
        <ResultImage src={reference.image} alt="" />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
          {reference.type}
        </p>
        <h4 className="mt-1 text-sm font-bold leading-5">{reference.title}</h4>
        {reference.description && (
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
            {reference.description}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold">
          {internal ? (
            <Link href={reference.url} onClick={onNavigate} className="text-primary hover:underline">
              View details <ArrowUpRight size={12} className="inline" aria-hidden="true" />
            </Link>
          ) : (
            <a href={reference.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              View details <ArrowUpRight size={12} className="inline" aria-hidden="true" />
            </a>
          )}
          {reference.documentUrl && (
            <a
              href={reference.documentUrl}
              target={externalDocument ? "_blank" : undefined}
              rel={externalDocument ? "noopener noreferrer" : undefined}
              onClick={onNavigate}
              className="text-primary hover:underline"
            >
              {reference.documentLabel || "Open link"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function WebSources({ sources }: { sources: WebSource[] }) {
  if (!sources.length) return null;

  return (
    <div className="mt-4 space-y-2 border-t border-black/10 pt-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        Sources from the web
      </p>
      <ul className="space-y-1">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-primary hover:underline"
            >
              {source.title} <ArrowUpRight size={12} className="inline" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WebsiteAssistant() {
  const [open, setOpen] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  const [webSources, setWebSources] = useState<WebSource[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], textarea:not([disabled])',
      ));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open || !scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, references, open, sending]);

  const close = () => setOpen(false);

  const submit = async (event?: FormEvent) => {
    event?.preventDefault();
    const question = input.trim();
    if (!question || sending) return;
    if (!baseUrl) {
      setError("The assistant service is not configured on this website.");
      return;
    }

    const userMessage: Message = { role: "user", content: question };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setReferences([]);
    setWebSources([]);
    setSending(true);

    try {
      const response = await fetch(`${baseUrl}/assistant/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-12) }),
      });
      const payload = await response.json() as ApiResponse;
      if (!response.ok) {
        throw new Error(payload.message || "The assistant could not answer right now. Please try again.");
      }
      if (
        typeof payload.answer !== "string" ||
        !Array.isArray(payload.references) ||
        !Array.isArray(payload.webSources)
      ) {
        throw new Error("The assistant returned an invalid response. Please try again.");
      }
      setMessages((current) => [...current, { role: "assistant", content: payload.answer }]);
      setReferences(payload.references);
      setWebSources(payload.webSources.filter(
        (source): source is WebSource =>
          typeof source?.url === "string" &&
          /^https?:\/\//i.test(source.url) &&
          typeof source.title === "string",
      ));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The assistant could not answer right now. Please try again.");
      setMessages((current) => current.filter((message) => message !== userMessage));
      setInput(question);
    } finally {
      setSending(false);
    }
  };

  const showWelcome = messages.length === 0;

  return (
    <>
      {!open && (
        <div className="fixed bottom-24 right-5 z-95 flex items-end gap-2 sm:bottom-28 sm:right-7">
          {notificationVisible && (
            <div className="relative max-w-57.5 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs leading-5 text-foreground shadow-lg">
              {/* Hi, I am <strong>The Doer AI</strong> how can I help you? */}
              Hi, I am <strong>The Doer AI</strong> you can ask me questions about BBYDI.
              <button
                type="button"
                onClick={() => setNotificationVisible(false)}
                aria-label="Dismiss assistant greeting"
                className="ml-1 inline-flex size-5 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
              >
                <X size={12} aria-hidden="true" />
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open The Doer AI assistant"
            aria-haspopup="dialog"
            title="The Doer AI (⌘/Ctrl+B)"
            className="flex size-16 shrink-0 items-center justify-center rounded-full border-4 border-white bg-white p-1 shadow-xl transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-4 focus-visible:outline-primary"
          >
            <Image src="/images/logo.png" alt="" width={56} height={30} className="h-auto w-full object-contain" />
          </button>
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="doer-ai-title"
            className="flex h-[min(760px,94dvh)] w-full max-w-2xl flex-col overflow-hidden rounded-t-xl border border-black/10 bg-background text-foreground shadow-2xl sm:h-[min(760px,90dvh)] sm:rounded-xl"
          >
            <header className="flex items-center justify-between gap-4 border-b border-black/10 bg-white px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <Image src="/images/logo.png" alt="" width={96} height={42} className="h-8 w-20 object-contain" />
                <div className="min-w-0">
                  <h2 id="doer-ai-title" className="font-bold">The Doer AI</h2>
                  <p className="text-xs text-muted-foreground">BBYDI website assistant</p>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close The Doer AI"
                className="rounded-sm p-2 hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-[#faf9f8] p-4 sm:p-5">
              {showWelcome ? (
                <div className="max-w-[90%] rounded-lg border border-black/10 bg-white p-4 shadow-sm">
                  <FormattedAnswer content={welcomeMessage.content} />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["What does BBYDI do?", "Find a publication", "Show me the thematic areas"].map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setInput(suggestion)}
                        className="rounded-full border border-black/15 bg-white px-3 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`max-w-[92%] rounded-lg p-3.5 shadow-sm ${message.role === "user" ? "ml-auto bg-primary text-white" : "border border-black/10 bg-white"}`}
                  >
                    {message.role === "assistant" ? (
                      <FormattedAnswer content={message.content} />
                    ) : (
                      <p className="whitespace-pre-wrap text-sm leading-6">{message.content}</p>
                    )}
                    {message.role === "assistant" &&
                      index === messages.length - 1 &&
                      (references.length > 0 || webSources.length > 0) && (
                        <>
                          {references.length > 0 && (
                            <div className="mt-4 space-y-2 border-t border-black/10 pt-3">
                              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                                Related on this website
                              </p>
                              {references.map((reference) => (
                                <ReferenceCard
                                  key={reference.id}
                                  reference={reference}
                                  onNavigate={close}
                                />
                              ))}
                            </div>
                          )}
                          <WebSources sources={webSources} />
                        </>
                      )}
                  </div>
                ))
              )}
              {sending && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground" role="status">
                  <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                  The Doer AI is finding an answer…
                </div>
              )}
              {error && (
                <p role="alert" className="rounded-sm border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
                  {error}
                </p>
              )}
            </div>

            <form onSubmit={submit} className="border-t border-black/10 bg-white p-3 sm:p-4">
              <label htmlFor="doer-ai-question" className="sr-only">
                Ask The Doer AI a question
              </label>
              <div className="flex items-end gap-2 rounded-lg border border-black/15 p-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                <textarea
                  ref={inputRef}
                  id="doer-ai-question"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void submit();
                    }
                  }}
                  placeholder="Ask about BBYDI, our work, publications…"
                  rows={1}
                  maxLength={4000}
                  className="max-h-32 min-h-10 flex-1 resize-y bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || sending}
                  aria-label="Send question"
                  className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {sending ? <LoaderCircle size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted-foreground">
                Uses public BBYDI website content. Press Shift+Enter for a new line. Ctrl/⌘+B to toggle.
              </p>
            </form>
          </section>
        </div>
      )}

      {!open && <span className="sr-only"><Bot aria-hidden="true" /> The Doer AI assistant is available with Ctrl or Command+B.</span>}
    </>
  );
}
