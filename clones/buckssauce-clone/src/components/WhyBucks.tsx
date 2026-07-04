import Image from "next/image";
import { FEATURES } from "@/lib/data";
import { LabelTab } from "@/components/LabelTab";
import { Reveal } from "@/components/Reveal";

const MASCOTS = ["/images/Frame14.png", "/images/lottie-grinning-garlic.webp", "/images/Frame16.png"];

export function WhyBucks() {
  return (
    <section className="relative mt-28 flex w-screen flex-col items-center overflow-hidden lg:mt-40">
      {/* Arched wordmark (approximated as an oversized display line) */}
      <h2 className="p-container w-full text-center font-serif text-[clamp(2.8rem,11vw,9rem)] uppercase leading-[0.85] tracking-tight text-cream">
        Why Bucks Sauce
      </h2>

      <Reveal className="mt-8 max-w-md px-6 text-center font-serif text-lg uppercase leading-snug tracking-tight lg:mt-10">
        <span className="text-pineapple">
          We make small-batch BBQ sauce because big-batch tastes like sadness.{" "}
        </span>
        <span className="text-cream">We&rsquo;re ending boring BBQ.</span>
      </Reveal>

      {/* Horizontal feature reel */}
      <div className="no-scrollbar relative mt-16 flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-10 lg:mt-24 lg:gap-0">
        {/* dotted connector */}
        <div className="pointer-events-none absolute left-0 top-[3.5rem] w-[300%] border-t border-dashed border-cream/25 lg:top-[4.5rem]" />
        {FEATURES.map((f, idx) => (
          <div
            key={f.number}
            className="relative w-[82vw] shrink-0 snap-center px-2 lg:w-[38vw] lg:px-16"
          >
            <div className="relative flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <Image
                  src={MASCOTS[idx]}
                  alt=""
                  width={160}
                  height={160}
                  className="absolute -left-6 top-2 z-0 w-24 -rotate-6 opacity-95 drop-shadow-xl"
                />
                <span className="text-outline relative z-10 font-serif text-[6.5rem] leading-none tracking-tight lg:text-[8.5rem]">
                  {f.number}
                </span>
              </div>
              <LabelTab className="-mt-2">{f.title}</LabelTab>
              <p className="mt-6 max-w-sm text-center text-[0.95rem] leading-relaxed text-cream/85">
                {f.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
