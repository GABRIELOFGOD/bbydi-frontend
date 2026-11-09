import Container from "../Container";
import { Button } from "../ui/button";
import SectionTitle from "../ui/SectionTitle";
import Link from "next/link";

const TheProblem = () => {
  const data = [
    {
      value: "71%",
      text: "of girls in Kwara State undergo FGM before turning 15",
    },
    {
      value: "100+",
      text: "traditional rulers mobilised against gender-based violence, with 33 public pledges signed",
    },
    {
      value: "5",
      text: "Kwara communities now running their own GBV prevention systems",
    },
  ];

  return (
    <section className="w-full bg-[#191919] py-16 text-white md:py-24">
      <Container className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-14">
        <div className="flex flex-col items-start gap-5">
          <SectionTitle
            showLine={false}
            title="The problem we exist for"
            className="text-secondary"
          />
          <h2 className="max-w-3xl text-3xl font-extrabold leading-[1.14] tracking-tight">
            71% of girls in Kwara State undergo female genital mutilation before
            they turn 15.
          </h2>
          <p className="max-w-3xl text-lg leading-[1.65] text-white/85">
            In Moro Local Government Area the practice is woven into
            traditional rites. Changing that means changing what a community
            accepts — which is why the work starts with the traditional
            rulers, religious leaders and women’s chiefs whose word settles
            the matter.
          </p>
          <Link href="/projects?theme=gender">
            <Button className="w-fit rounded bg-white p-5 font-bold text-primary hover:bg-white/90">
              How our gender justice work answers it
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {data.map((item) => (
            <article
              key={item.value}
              className="flex flex-col gap-2 border-l-[3px] border-secondary px-5 py-2"
            >
              <p className="text-3xl font-extrabold leading-none">
                {item.value}
              </p>
              <p className="text-sm leading-6 text-white/60">{item.text}</p>
            </article>
          ))}
          <p className="pt-1 text-xs leading-6 text-white/55">
            Sources: Nigerian Demographic and Health Survey, cited in BBYDI’s
            2024 Annual Report; BBYDI 2024 and 2025 Annual Reports.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default TheProblem;