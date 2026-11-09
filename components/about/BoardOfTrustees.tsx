"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "../Container";
import SectionTitle from "../ui/SectionTitle";
import { StaffProfile } from "@/lib/content";
import { apiRequest } from "@/lib/api";
import { toast } from "sonner";

const BoardOfTrustees = () => {
  const [trustees, setTrustees] = useState<StaffProfile[]>([]);

  useEffect(() => {
    let active = true;
    const loadTrustees = async () => {
      try {
        const profiles = await apiRequest<StaffProfile[]>("/staff/profiles");
        if (active) {
          setTrustees(profiles.filter((profile) => profile.category === "trustee"));
        }
      } catch (error) {
        if (active) {
          toast.error(error instanceof Error ? error.message : "Could not load trustees");
        }
      }
    };

    void loadTrustees();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="board" className="scroll-mt-24 bg-white">
      <Container className="flex flex-col gap-5 py-12 md:py-14">
        <SectionTitle title="Our board" />
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Board of Trustees
          </h2>
          <p className="mt-2 text-base leading-7 text-foreground/75">
            Seven trustees hold legal responsibility for BBYDI. Select anyone to
            open their profile.
          </p>
        </div>

        {trustees.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {trustees.map((trustee) => {
              const initials = trustee.name
                .trim()
                .split(/\s+/)
                .slice(0, 2)
                .map((part) => part.charAt(0))
                .join("")
                .toUpperCase();

              return (
                <Link
                  key={trustee._id}
                  href={`/about/team/${encodeURIComponent(trustee._id)}`}
                  aria-label={`Read more about ${trustee.name}`}
                  className="group min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-gradient-to-br from-[#303030] to-[#191919] text-lg font-extrabold text-white transition-opacity group-hover:opacity-90">
                    {trustee.image ? (
                      <Image
                        src={trustee.image}
                        alt={trustee.name}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
                        className="object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <h3 className="mt-2 text-sm font-bold leading-5 group-hover:text-primary">
                    {trustee.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">Trustee</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground" role="status">
            Trustee profiles are being loaded.
          </p>
        )}
      </Container>
    </section>
  );
};

export default BoardOfTrustees;
