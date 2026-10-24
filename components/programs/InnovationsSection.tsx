"use client";

import { ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { ContentItem } from "@/lib/content";
import { usePublicContent } from "@/lib/usePublicContent";

const mapInnovation = (item: ContentItem) => item;

const externalUrl = (value?: string): string | undefined => {
  if (!value) return undefined;

  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
};

const linkLabel = (value: string): string => {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
};

export default function InnovationsSection() {
  const { items } = usePublicContent("innovation", [], mapInnovation);

  return (
    <section className="w-full bg-muted py-10 md:py-14">
      <Container className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <SectionTitle title="Innovation & Technology for Good" />
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold leading-tight md:text-3xl">
              The eleven tools we have built
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Civic technology BBYDI designed, built and runs — not campaigns
              for someone else to build them.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const href = externalUrl(item.link);
            return (
              <article
                key={item._id}
                className="flex min-h-24 flex-col items-start gap-2 border bg-white p-3"
              >
                <h3 className="text-sm font-bold leading-5">{item.title}</h3>
                <p className="text-xs leading-[1.55] text-muted-foreground">
                  {item.description}
                </p>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1 pt-1 text-xs font-semibold text-primary hover:underline"
                    aria-label={`Visit ${item.title} website (opens in a new tab)`}
                  >
                    {linkLabel(href)}
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                ) : item.type ? (
                  <span className="mt-auto pt-1 text-xs font-semibold text-primary">
                    {item.type}
                  </span>
                ) : null}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
