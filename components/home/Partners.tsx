"use client";

import { useState } from "react";
import Container from "../Container";
import SectionTitle from "../ui/SectionTitle";
import { usePublicContent } from "@/lib/usePublicContent";
import { ContentItem } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";

const mapPartner = (item: ContentItem) => item;

const PartnerCard = ({
  partner,
  duplicate = false,
}: {
  partner: ContentItem;
  duplicate?: boolean;
}) => {
  const content = partner.image ? (
    <Image
      src={partner.image}
      alt={duplicate ? "" : partner.title}
      width={180}
      height={72}
      className="max-h-full max-w-full object-contain"
    />
  ) : (
    <p className="font-semibold">{partner.title}</p>
  );

  return (
    <div className="flex h-22 w-52 flex-none items-center justify-center border bg-white p-4">
      {!duplicate && partner.link ? (
        <Link
          href={partner.link}
          target="_blank"
          rel="noreferrer"
          aria-label={partner.title}
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
};

const Partners = () => {
  const [isPaused, setIsPaused] = useState(false);
  const { items: partners } = usePublicContent("partner", [], mapPartner);

  return (
    <section className="flex w-full gap-5 bg-muted py-12 md:py-16">
      <Container className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <SectionTitle
            title="Partners & supporters"
            className="w-full items-center"
            showLine={false}
          />
          <p className="text-sm text-muted-foreground">
            The funders, implementing partners and coalitions BBYDI has delivered with.
          </p>
        </div>
        {partners.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">Partner information will be added soon.</p>
        ) : (
          <>
            <div
              className="overflow-hidden"
              role="region"
              aria-label="Our partners and supporters"
            >
              <div
                className={`partners-marquee-track${isPaused ? " is-paused" : ""}`}
              >
                <div className="flex flex-none gap-3 pr-3">
                  {partners.map((partner) => (
                    <PartnerCard key={partner._id} partner={partner} />
                  ))}
                </div>
                <div className="flex flex-none gap-3 pr-3" aria-hidden="true">
                  {partners.map((partner) => (
                    <PartnerCard
                      key={`${partner._id}-duplicate`}
                      partner={partner}
                      duplicate
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <button
                type="button"
                className="rounded-full border bg-white px-4 py-1.5 font-semibold text-foreground hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                aria-label={`${isPaused ? "Resume" : "Pause"} partner logos`}
                aria-pressed={isPaused}
                onClick={() => setIsPaused((paused) => !paused)}
              >
                {isPaused ? "Play" : "Pause"}
              </button>
              <span>
                {partners.length} {partners.length === 1 ? "partner" : "partners"} and supporters
              </span>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default Partners;