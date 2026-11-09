import Image from "next/image";
import Container from "../Container";
import { cn } from "@/lib/utils";
import CountUpCard from "../ui/CountUpCard";
import Link from "next/link";

const heroMetrics = [
  {
    value: 2018,
    text: "Officially registered as a non-profit organisation in Nigeria",
    format: false,
  },
  {
    value: 2200,
    text: "People reached across Nigeria, West and Central Africa",
    scale: 1000,
    decimalPlaces: 1,
    suffix: "M+",
  },
  {
    value: 110000,
    text: "People trained in AI, digital, civic and climate skills",
    suffix: "+",
  },
  {
    value: 137,
    text: "Knowledge products published, all years",
  },
];

const Hero = () => {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#171717] text-white">
      <Image
        src="/images/hero.jpg"
        alt="Traditional and religious leaders at BBYDI's high-level statewide event against gender-based violence in Kwara State"
        fill
        sizes="100vw"
        quality={75}
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/75 to-black/65" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-36 -top-32 hidden size-136 rounded-full border-[4.5rem] border-[#9f3f36]/20 sm:-right-28 sm:-top-32 sm:block sm:size-144" aria-hidden="true" />
      <div className="relative z-10 w-full py-16 sm:py-[4.6rem]">
        <Container className="flex flex-col gap-10">
          <div className="flex w-full max-w-180 flex-col gap-6">
            <div className="w-fit rounded-full border border-secondary/60 bg-primary/25">
              <p className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#edb9b4] sm:text-xs sm:tracking-[0.16em]">
                Women-led · Non-partisan · Tech for Good
              </p>
            </div>
            <h1
              className="text-[clamp(1.9rem,5vw,3.25rem)] font-extrabold leading-[1.15] tracking-[-0.035em]"
            >
              Advancing women’s rights, expanding opportunities through technology and{" "}
              <span className="text-secondary">strengthening communities and democracies</span>.
            </h1>

            <p className="max-w-165 text-base leading-[1.65] text-white/75 sm:text-[18px]">
              BBYDI is a women-led, non-partisan civic organisation working with young people, women, girls, persons with disabilities and communities across West and Central Africa. Through research, education, policy intervention, technology and advocacy; we advance inclusive governance, democracy, gender justice, digital rights and sustainable development goals.
            </p>

            <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:gap-3">
              <Link
                href="/programs"
                className={cn("inline-flex h-11 w-full items-center justify-center rounded-sm border border-white bg-white px-6 text-sm font-bold text-primary transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto")}
              >
                Explore our work
              </Link>
              <Link
                href="#impact"
                className={cn("inline-flex h-11 w-full items-center justify-center rounded-sm border border-white/40 bg-white/10 px-6 text-sm font-bold text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto")}
              >
                See our impact
              </Link>
            </div>
          </div>
          <div id="impact" className="w-full scroll-mt-24 border-t border-white/25 pt-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
              {heroMetrics.map((metric) => (
                <CountUpCard
                  key={metric.value}
                  {...metric}
                  textClassName="text-sm text-white/65"
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default Hero;