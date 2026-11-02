import { ProjectCardTypes } from "@/lib/types";
import { getProjectAreaLabels } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps extends ProjectCardTypes {
  className?: string;
}

const ProjectCard = ({
  category,
  context,
  desc,
  funder,
  image,
  location,
  period,
  slug,
  status,
  thematicAreas,
  title,
  id,
  className,
}: ProjectCardProps) => {
  const areas = getProjectAreaLabels(category, thematicAreas);
  const projectUrl = `/projects/${encodeURIComponent(slug || id)}`;
  const normalizedStatus = status.toLowerCase();
  const statusLabel =
    normalizedStatus === "completed"
      ? "Completed"
      : normalizedStatus === "recurring"
        ? "Active · Recurring"
        : "Active";
  const hasMetadata = Boolean(period || funder || location);

  return (
    <article className={`h-full w-full ${className ?? ""}`}>
      <Link
        href={projectUrl}
        className="group flex h-full flex-col overflow-hidden border border-black/10 bg-white transition hover:border-black/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        {image ? (
          <div className="relative h-45 w-full shrink-0">
            <Image
              src={image}
              alt={`Project image - ${title}`}
              fill
              className="object-cover"
              quality={90}
            />
          </div>
        ) : (
          <div className="h-1 w-full shrink-0 bg-[#1d1d1d]" />
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap gap-1.5">
            {areas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-black/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-black/60"
              >
                {area}
              </span>
            ))}
            {status && (
              <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
                normalizedStatus === "completed"
                  ? "border-black/10 bg-white text-black/60"
                  : "border-green-700/25 bg-green-50 text-green-800"
              }`}>
                {statusLabel}
              </span>
            )}
          </div>
          <h3 className="mt-3 text-lg font-bold leading-tight group-hover:text-primary">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-[1.6] text-black/70">{context}</p>
          {hasMetadata ? (
            <dl className="mt-4 space-y-2 border-t border-black/10 pt-3 text-sm text-black/70">
              {[
                ["Period", period],
                ["Funder", funder],
                ["Where", location],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3">
                  <dt className="w-12 shrink-0 text-[10px] font-bold uppercase tracking-wider text-black/55">
                    {label}
                  </dt>
                  <dd>{value || "Not recorded"}</dd>
                </div>
              ))}
            </dl>
          ) : desc ? (
            <p className="mt-4 border-t border-black/10 pt-3 text-sm leading-6 text-black/70">
              {desc}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
};

export default ProjectCard;
