"use client";

import Link from "next/link";
import { Accessibility, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ReadingSize = "standard" | "large" | "largest";
type Preferences = {
  textSize: ReadingSize;
  highContrast: boolean;
  reduceMotion: boolean;
};

const STORAGE_KEY = "bbydi-reading-preferences";
const defaults: Preferences = { textSize: "standard", highContrast: false, reduceMotion: false };

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(defaults);
  const [preferencesReady, setPreferencesReady] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<Preferences>;
          setPreferences({
            textSize: parsed.textSize === "large" || parsed.textSize === "largest" ? parsed.textSize : "standard",
            highContrast: parsed.highContrast === true,
            reduceMotion: parsed.reduceMotion === true,
          });
        }
      } catch {
        // Keep accessible defaults when browser storage is unavailable.
      }
      setPreferencesReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.readingSize = preferences.textSize;
    root.classList.toggle("high-contrast", preferences.highContrast);
    root.classList.toggle("reduce-motion", preferences.reduceMotion);
    if (preferencesReady) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      } catch {
        // Preferences remain active for the current page even when storage is unavailable.
      }
    }
  }, [preferences, preferencesReady]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled])',
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
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  const update = (changes: Partial<Preferences>) => setPreferences((current) => ({ ...current, ...changes }));

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-3 sm:items-center sm:p-6" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}>
          <section
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reading-preferences-title"
            className="max-h-[calc(100dvh-1.5rem)] w-full max-w-xl overflow-y-auto rounded-lg border bg-background p-5 text-foreground shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="reading-preferences-title" className="text-2xl font-bold sm:text-3xl">Reading preferences</h2>
                <p className="mt-2 text-base text-muted-foreground sm:text-lg">These apply across the whole site.</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close reading preferences" className="rounded border p-2 hover:bg-muted">
                <X size={20} />
              </button>
            </div>

            <fieldset className="mt-6">
              <legend className="mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground">Text size</legend>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {(["standard", "large", "largest"] as const).map((size) => (
                  <button
                    key={size}
                    type="button"
                    aria-pressed={preferences.textSize === size}
                    onClick={() => update({ textSize: size })}
                    className={`min-h-12 rounded border-2 px-3 py-2 text-base font-semibold ${preferences.textSize === size ? "border-foreground bg-foreground text-background" : "hover:bg-muted"}`}
                  >
                    {size === "standard" ? "Standard" : size === "large" ? "Large" : "Largest"}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6 space-y-2">
              <legend className="mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground">Display</legend>
              <label className="flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded border-2 px-4 py-3 text-base font-semibold">
                <span>High contrast</span>
                <input type="checkbox" checked={preferences.highContrast} onChange={(event) => update({ highContrast: event.target.checked })} className="size-5 accent-primary" />
              </label>
              <label className="flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded border-2 px-4 py-3 text-base font-semibold">
                <span>Reduce motion</span>
                <input type="checkbox" checked={preferences.reduceMotion} onChange={(event) => update({ reduceMotion: event.target.checked })} className="size-5 accent-primary" />
              </label>
            </fieldset>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button type="button" onClick={() => setPreferences(defaults)} className="min-h-11 rounded border-2 px-4 py-2 text-left font-semibold hover:bg-muted">Reset</button>
              <Link href="/accessibility" onClick={() => setOpen(false)} className="min-h-11 rounded border-2 px-4 py-2 font-semibold hover:bg-muted">Accessibility statement</Link>
              <button type="button" onClick={() => setOpen(false)} className="min-h-11 rounded border-2 px-4 py-2 text-left font-semibold hover:bg-muted sm:ml-auto">Close</button>
            </div>
          </section>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open accessibility and reading preferences"
        aria-haspopup="dialog"
        className="fixed bottom-5 right-5 z-[90] flex size-16 items-center justify-center rounded-full border-4 border-white bg-[#171717] text-white shadow-xl transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-4 focus-visible:outline-primary sm:bottom-7 sm:right-7"
      >
        <Accessibility size={30} aria-hidden="true" />
      </button>
    </>
  );
}
