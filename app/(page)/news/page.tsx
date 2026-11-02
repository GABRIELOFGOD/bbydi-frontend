import NewsRoom from "@/components/home/NewsRoom";
import Container from "@/components/Container";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "Announcements, launches and media coverage of BBYDI's work. Browse newsroom updates from BBYDI and external publications.",
  alternates: { canonical: "/news" },
};

const News = () => {
  return (
    <div>
      <header className="w-full border-b border-black/10 bg-[#f7f6f5]">
        <Container className="flex flex-col gap-5 py-5 md:py-5">
          <nav
            aria-label="Breadcrumb"
            className="flex gap-1.5 text-xs text-muted-foreground"
          >
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <span>Newsroom</span>
          </nav>
          <div className="max-w-3xl pb-3">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Newsroom
            </h1>
            <p className="mt-3 text-base leading-7 text-foreground/75 md:text-lg">
              Announcements and launches from BBYDI, and every media mention of
              our work from 2016 onwards. Looking for our research?{" "}
              <Link
                href="/publications"
                className="font-bold text-primary hover:underline"
              >
                Go to Publications.
              </Link>
            </p>
          </div>
        </Container>
      </header>
      <NewsRoom variant="archive" />
    </div>
  );
}

export default News;