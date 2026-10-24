import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPublicApi, plainText, publicPageUrl, PublicStaffProfileResponse } from "@/lib/publicContent";

const kindPaths: Record<string, string> = {
  program: "/programs",
  project: "/projects",
  news: "/news",
  blog: "/blog",
  opportunity: "/opportunities",
  report: "/publications",
  publication: "/publications",
  partner: "/partner-with-us",
};

async function getStaffProfile(id: string) {
  return fetchPublicApi<PublicStaffProfileResponse>(`/staff/profiles/${encodeURIComponent(id)}`);
}

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getStaffProfile(id);
  if (!result) return { title: "Team member not found", robots: { index: false, follow: false } };
  const { profile } = result;
  const description = profile.bio?.trim()
    ? plainText(profile.bio).slice(0, 300)
    : `${profile.name} is ${profile.position} at Brain Builders Youth Development Initiative.`;
  const canonical = `/about/team/${encodeURIComponent(id)}`;
  return {
    title: `${profile.name} — ${profile.position}`,
    description,
    alternates: { canonical },
    openGraph: {
      type: "profile",
      title: `${profile.name} — ${profile.position}`,
      description,
      url: canonical,
      ...(profile.image ? { images: [{ url: profile.image, alt: profile.name }] } : {}),
    },
    twitter: {
      card: profile.image ? "summary_large_image" : "summary",
      title: `${profile.name} — ${profile.position}`,
      description,
      ...(profile.image ? { images: [profile.image] } : {}),
    },
    robots: { index: true, follow: true },
  };
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getStaffProfile(id);
  if (!result) notFound();
  const { profile, posts } = result;
  const firstName = profile.name.trim().split(/\s+/)[0] || profile.name;
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.position,
    description: plainText(profile.bio || ""),
    image: profile.image,
    worksFor: {
      "@type": "NGO",
      name: "Brain Builders Youth Development Initiative",
      alternateName: "BBYDI",
    },
    url: publicPageUrl(`/about/team/${encodeURIComponent(id)}`),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }} />
      <header className="bg-[#191919] px-5 py-8 text-white sm:py-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
          <nav aria-label="Breadcrumb" className="text-xs text-white/50 sm:hidden">
            <Link href="/">Home</Link> / <Link href="/about#team">About</Link> / {profile.name}
          </nav>
          <div className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white/20 bg-primary text-3xl font-bold text-white sm:size-32">
            {profile.image
              ? <Image src={profile.image} alt={profile.name} width={128} height={128} className="size-full object-cover" />
              : profile.name.split(/\s+/).map((part) => part.charAt(0)).join("").slice(0, 2)}
          </div>
          <div>
            <nav aria-label="Breadcrumb" className="mb-3 hidden text-xs text-white/50 sm:block">
              <Link href="/">Home</Link> / <Link href="/about#team">About</Link> / {profile.name}
            </nav>
            <span className="inline-block rounded-sm bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
              {profile.category === "leadership" ? "Leadership" : profile.category === "volunteer" ? "Volunteer" : "Staff"}
            </span>
            <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">{profile.name}</h1>
            <p className="mt-1 font-semibold text-[#f3c1bc]">{profile.position}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="max-w-3xl">
          {profile.bio?.trim() ? (
            <div className="whitespace-pre-line text-base leading-8 text-foreground sm:text-lg">{profile.bio}</div>
          ) : (
            <div className="border border-dashed border-primary/50 bg-primary/5 p-5 text-sm leading-6 text-primary sm:p-7">
              <p className="font-bold">Biography to come</p>
              <p className="mt-2">A biography for {profile.name} has not been added yet.</p>
            </div>
          )}
          <div className="mt-7 flex flex-wrap gap-3 border-t pt-5">
            <Link href="/about#team" className="rounded-sm border border-primary px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary/5">← All of the team</Link>
            <Link href="/partner-with-us" className="rounded-sm bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary/90">Get in touch</Link>
          </div>
        </div>
      </main>

      {posts.length > 0 && (
        <section className="bg-[#f7f6f5] px-5 py-10 sm:py-14">
          <div className="mx-auto max-w-5xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary">Writing &amp; contributions</p>
            <div className="mb-4 mt-2 h-0.5 w-9 bg-primary" />
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Posts by {firstName}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const href = post.kind === "news"
                  ? `/news/${post.slug || post._id}`
                  : post.kind === "blog"
                    ? `/blog/${post.slug}`
                    : kindPaths[post.kind] ?? "/about";
                const summary = post.summary || post.description || "";
                return (
                  <Link key={post._id} href={href} className="group flex min-h-48 flex-col rounded-sm border bg-white p-5 transition-colors hover:border-primary/60 focus-visible:outline-2 focus-visible:outline-primary">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">{post.category || post.kind}</span>
                      {post.featured && <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">Featured</span>}
                    </div>
                    <h3 className="mt-3 text-base font-bold leading-snug group-hover:text-primary">{post.title}</h3>
                    {summary && <p className="mt-3 line-clamp-4 text-sm leading-6 text-muted-foreground">{plainText(summary)}</p>}
                    <span className="mt-auto pt-4 text-xs font-bold text-primary">View {post.kind} →</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
