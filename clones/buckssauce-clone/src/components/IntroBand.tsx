import { SplashIcon, HatIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

export function IntroBand() {
  return (
    <section className="p-container mt-24 w-full lg:mt-32">
      <Reveal className="mx-auto max-w-5xl text-center">
        <p className="font-serif text-[clamp(1.6rem,4.2vw,3.15rem)] uppercase leading-[1.05] tracking-tight text-cream">
          Our BBQ sauces use real, natural stuff like it&rsquo;s the 1800s.{" "}
          <SplashIcon className="inline-block h-[0.8em] w-[0.8em] translate-y-[0.08em]" />{" "}
          Slap it on anything you grill and act surprised when people think you can{" "}
          <HatIcon className="inline-block h-[0.8em] w-[0.8em] translate-y-[0.08em] text-cream" />{" "}
          cook.
        </p>
      </Reveal>
    </section>
  );
}
