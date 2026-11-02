import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectAreaLabels, Projects } from "@/lib/constants";
import { fetchPublicApi, plainText, PublicContentItem } from "@/lib/publicContent";
import { slugify } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

const fallbackProjects: PublicContentItem[] = Projects.map((project) => ({
  _id: project.id,
  slug: `${slugify(project.title)}-${project.id}`,
  kind: "project",
  title: project.title,
  description: project.context,
  context: project.context,
  summary: project.desc,
  category: project.category,
  status: project.status,
  image: project.image,
  period: project.period,
  funder: project.funder,
  location: project.location,
  thematicAreas: project.thematicAreas,
  on2026Register: project.on2026Register,
  approved: true,
}));

const getProject = async (slug: string) => {
  const project = await fetchPublicApi<PublicContentItem>(
    `/content/project/${encodeURIComponent(slug)}`,
  );
  return project ?? fallbackProjects.find((item) => item.slug === slug || item._id === slug) ?? null;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false, follow: false } };

  const description = plainText(project.context || project.description || "").slice(0, 300);
  const canonical = `/projects/${encodeURIComponent(project.slug || slug)}`;
  return {
    title: project.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: project.title,
      description,
      url: canonical,
      ...(project.image ? { images: [{ url: project.image, alt: project.imageAlt || project.title }] } : {}),
    },
  };
}

function ProjectMetadata({ project }: { project: PublicContentItem }) {
  const entries: [string, string][] = [
    ["Status", project.status || "Not recorded"],
    ["Period", project.period || "Not recorded"],
    ["Funder", project.funder || "Not recorded"],
    ["Where", project.location || "Not recorded"],
    ["Thematic areas", project.thematicAreas?.join(" · ") || getProjectAreaLabels(project.category, project.thematicAreas).join(" · ") || "Not recorded"],
    ["On the 2026 register", project.on2026Register === undefined ? "Not recorded" : project.on2026Register ? "Yes" : "No"],
  ];

  return (
    <dl className="mt-6 divide-y border-y">
      {entries.map(([label, value]) => (
        <div key={label} className="grid gap-1 py-2.5 sm:grid-cols-[10rem_minmax(0,1fr)]">
          <dt className="text-xs font-bold uppercase tracking-wider text-black/55">{label}</dt>
          <dd className="text-sm leading-6 text-black/75">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function PublicationTile({ publication }: { publication: PublicContentItem }) {
  const year = publication.date
    ? new Date(publication.date).getUTCFullYear()
    : undefined;

  return (
    <article className="w-full max-w-64">
      <div className="relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-sm border-t-4 border-white/40 bg-gradient-to-br from-slate-700 to-slate-950 p-4 text-white">
        <div>
          <p className="text-[9px] font-extrabold uppercase tracking-[0.2em]">BBYDI</p>
          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/65">
            {publication.category || publication.type || "Publication"}
          </p>
        </div>
        <div>
          <p className="line-clamp-5 text-sm font-bold leading-tight">{publication.title}</p>
          {year && <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/65">{year}</p>}
        </div>
      </div>
      <h3 className="mt-3 text-sm font-bold leading-snug">{publication.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {[publication.category || publication.type, year].filter(Boolean).join(" · ")}
      </p>
      {publication.document && (
        <a
          href={publication.document}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-xs font-bold text-primary hover:underline"
        >
          Download PDF ↓
        </a>
      )}
    </article>
  );
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const [allProjects, publications] = await Promise.all([
    fetchPublicApi<PublicContentItem[]>("/content/project"),
    fetchPublicApi<PublicContentItem[]>("/content/publication"),
  ]);
  const candidates = allProjects?.length ? allProjects : fallbackProjects;
  const projectAreas = project.thematicAreas ?? [];
  const relatedProjects = candidates
    .filter((item) => item._id !== project._id)
    .filter((item) => {
      const areas = item.thematicAreas ?? [];
      return projectAreas.length > 0
        ? areas.some((area) => projectAreas.includes(area))
        : Boolean(project.category && item.category === project.category);
    })
    .slice(0, 3);
  const projectPublications = (publications ?? []).filter((item) =>
    item.relatedProjectIds?.includes(project._id),
  );
  const areas = getProjectAreaLabels(project.category, project.thematicAreas);

  return (
    <>
      <header className="border-b border-black/10 bg-muted px-5 py-7 sm:py-9">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-primary">Projects</Link>
            <span>/</span>
            <span>{project.title}</span>
          </nav>
          <div className="flex flex-wrap gap-1.5">
            {areas.map((area) => (
              <span key={area} className="rounded-full border border-black/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black/60">
                {area}
              </span>
            ))}
            {project.status && (
              <span className="rounded-full border border-green-700/25 bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-green-800">
                {project.status}
              </span>
            )}
          </div>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">{project.title}</h1>
          {project.on2026Register && (
            <p className="mt-3 text-base text-muted-foreground">On BBYDI’s 2026 project register.</p>
          )}
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-[minmax(16rem,0.65fr)_minmax(0,1.35fr)] sm:py-16">
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-sm bg-[repeating-linear-gradient(135deg,#f0efed_0px,#f0efed_10px,#e6e4e1_10px,#e6e4e1_20px)]">
            {project.image ? (
              <Image src={project.image} alt={project.imageAlt || project.title} fill className="object-cover" />
            ) : (
              <span className="px-4 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                Photo slot — {project.title}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">About this project</h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              {plainText(project.context || project.description || "Project details have not been added yet.")}
            </p>
            <ProjectMetadata project={project} />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/projects" className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary/90">
                All projects <span aria-hidden="true">→</span>
              </Link>
              <Link href="/partner-with-us" className="inline-flex items-center rounded-sm border border-primary px-5 py-3 text-sm font-bold text-primary hover:bg-primary/5">
                Work with us on this
              </Link>
            </div>
          </div>
        </section>

        {projectPublications.length > 0 && (
          <section className="bg-muted px-5 py-12 sm:py-14">
            <div className="mx-auto max-w-6xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">From this project</p>
              <div className="mt-3 h-1 w-13 bg-primary" />
              <h2 className="mt-6 text-3xl font-extrabold">Publications</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {projectPublications.map((publication) => (
                  <PublicationTile key={publication._id} publication={publication} />
                ))}
              </div>
            </div>
          </section>
        )}

        {relatedProjects.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 py-12 sm:py-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Related</p>
            <div className="mt-3 h-1 w-13 bg-primary" />
            <h2 className="mt-6 text-3xl font-extrabold">Other work in the same areas</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {relatedProjects.map((related) => (
                <Link
                  key={related._id}
                  href={`/projects/${encodeURIComponent(related.slug || related._id)}`}
                  className="border-t-4 border-[#1d1d1d] bg-white p-5 shadow-sm hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <div className="flex flex-wrap gap-1.5">
                    {getProjectAreaLabels(related.category, related.thematicAreas).map((area) => (
                      <span key={area} className="rounded-full border border-black/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black/60">{area}</span>
                    ))}
                    {related.status && <span className="rounded-full border border-green-700/25 bg-green-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-green-800">{related.status}</span>}
                  </div>
                  <h3 className="mt-3 font-bold leading-snug">{related.title}</h3>
                  {related.context || related.description ? (
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{plainText(related.context || related.description || "")}</p>
                  ) : null}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
