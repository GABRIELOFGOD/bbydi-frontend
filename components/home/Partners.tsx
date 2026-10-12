"use client";

import Container from "../Container";
import SectionTitle from "../ui/SectionTitle";
import { usePublicContent } from "@/lib/usePublicContent";
import { ContentItem } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";

const mapPartner = (item: ContentItem) => item;

const Partners = () => {
  const { items: partners } = usePublicContent("partner", [], mapPartner);

  return (
    <div className="w-full bg-muted flex py-20 gap-5">
      <Container className="flex flex-col gap-10">
        <SectionTitle title="Partners & supporters" className="text-center w-full" showLine={false}  />
        {partners.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">Partner information will be added soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {partners.map((partner) => (
              <div key={partner._id} className="flex h-24 w-full items-center justify-center border bg-white p-4">
                {partner.link ? (
                  <Link href={partner.link} target="_blank" rel="noreferrer" aria-label={partner.title}>
                    {partner.image ? <Image src={partner.image} alt={partner.title} width={180} height={72} className="max-h-full max-w-full object-contain" /> : <p className="font-semibold">{partner.title}</p>}
                  </Link>
                ) : partner.image ? (
                  <Image src={partner.image} alt={partner.title} width={180} height={72} className="max-h-full max-w-full object-contain" />
                ) : <p className="font-semibold">{partner.title}</p>}
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default Partners;