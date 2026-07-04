"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { INGREDIENTS } from "@/lib/data";
import { LabelTab } from "@/components/LabelTab";
import { Reveal } from "@/components/Reveal";

const FLOATERS = [
  { src: "/images/cherry.webp", className: "left-[4%] top-[3%] w-[9vw] max-w-[130px] rotate-6" },
  { src: "/images/habanero.webp", className: "right-[5%] top-[2%] w-[11vw] max-w-[170px] -rotate-12" },
  { src: "/images/tomato.webp", className: "left-[14%] top-[26%] w-[10vw] max-w-[150px] rotate-3" },
  { src: "/images/chilli.webp", className: "right-[8%] top-[24%] w-[7vw] max-w-[110px] rotate-12" },
  { src: "/images/onion.webp", className: "left-[2%] top-[46%] w-[9vw] max-w-[130px] -rotate-6" },
  { src: "/images/garlic.webp", className: "right-[16%] top-[52%] w-[8vw] max-w-[120px] rotate-6" },
];

const OFFSETS = [
  "lg:translate-x-0 rotate-[-1.5deg]",
  "lg:-translate-x-40 rotate-[1.5deg]",
  "lg:translate-x-40 rotate-[-1deg]",
  "lg:-translate-x-24 rotate-[1.5deg]",
];

export function Ingredients() {
  return (
    <section className="p-container relative mt-24 w-full overflow-hidden lg:mt-36">
      {/* floating produce */}
      {FLOATERS.map((f, idx) => (
        <Image
          key={idx}
          src={f.src}
          alt=""
          width={180}
          height={180}
          className={cn("pointer-events-none absolute z-0 drop-shadow-xl", f.className)}
        />
      ))}

      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center">
        {INGREDIENTS.map((ing, idx) => (
          <Reveal
            key={ing.title}
            y={50}
            className={cn(
              "w-full",
              idx > 0 && "-mt-8",
              OFFSETS[idx],
            )}
          >
            <div style={{ zIndex: idx + 1 }} className="relative flex flex-col items-center">
              <LabelTab className="relative z-10 -mb-5">{ing.title}</LabelTab>
              <div className="w-full rounded-3xl border border-cream/15 bg-panel px-8 pb-10 pt-14 text-center shadow-2xl">
                <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full border border-cream/25">
                  <Image src={ing.icon} alt="" width={52} height={52} className="size-13 opacity-90" />
                </div>
                <p className="mx-auto max-w-xs text-[0.95rem] leading-relaxed text-cream/85">
                  {ing.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
