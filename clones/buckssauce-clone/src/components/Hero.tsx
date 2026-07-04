"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/lib/data";
import type { FlavorKey } from "@/types";
import { ArrowIcon } from "@/components/icons";

const DECOR: Record<FlavorKey, { produce: string[]; mascot: string }> = {
  pineapple: { produce: ["/images/pineapple.webp", "/images/pineapple-2.webp"], mascot: "/images/lottie-cool-pineapple.png" },
  habanero: { produce: ["/images/habanero.webp", "/images/habanero-2.webp"], mascot: "/images/lottie-fire_breathing-habanero.png" },
  cherry: { produce: ["/images/cherry.webp", "/images/cherry-2.webp"], mascot: "/images/lottie-sassy-cherry.png" },
};

export function Hero() {
  const [i, setI] = useState(0);
  const product = PRODUCTS[i];
  const decor = DECOR[product.key];
  const go = (dir: number) => setI((p) => (p + dir + PRODUCTS.length) % PRODUCTS.length);

  return (
    <section className="p-container mt-24 flex flex-col items-center lg:mt-28">
      <div className="relative z-10 text-center lg:w-2/3">
        <h1 className="font-serif text-[clamp(2.6rem,8.2vw,6.25rem)] uppercase leading-[0.88] tracking-[-0.02em] text-cream">
          <span className="text-outline">The BBQ Sauce </span>
          that makes other sauces insecure
        </h1>
      </div>

      {/* Product stage */}
      <div className="relative mt-4 flex min-h-[62vh] w-full items-center justify-center lg:-mt-6">
        {/* dotted label rule */}
        <div className="pointer-events-none absolute top-[18%] left-0 flex w-full items-center justify-between">
          <span className="z-10 bg-background pr-4 font-serif text-sm uppercase tracking-wide text-cream lg:text-base">
            Product N0.0{i + 1}
          </span>
          <div className="absolute left-0 top-1/2 -z-0 w-full border-t border-dashed border-cream/25" />
          <span className="z-10 bg-background pl-4 font-serif text-sm uppercase tracking-wide text-cream lg:text-base">
            {product.name}
          </span>
        </div>

        {/* gold circle + bottle + floating produce */}
        <div key={product.key} className="animate-[fadein_.5s_ease] relative flex items-center justify-center">
          <div
            className="absolute h-[38vh] w-[38vh] max-h-[420px] max-w-[420px] rounded-full opacity-90 blur-[1px]"
            style={{ backgroundColor: product.color }}
          />
          <div className="relative z-10 h-[62vh] max-h-[680px] w-auto">
            <Image
              src={product.bottle}
              alt={product.name}
              width={420}
              height={900}
              priority
              className="h-full w-auto object-contain drop-shadow-2xl"
            />
          </div>
          <Image
            src={decor.produce[0]}
            alt=""
            width={220}
            height={220}
            className="absolute -right-4 top-[18%] z-20 w-[16vw] max-w-[150px] -rotate-6 drop-shadow-xl lg:-right-16"
          />
          <Image
            src={decor.mascot}
            alt=""
            width={220}
            height={240}
            className="absolute -left-2 bottom-[8%] z-20 w-[18vw] max-w-[190px] drop-shadow-xl lg:-left-14"
          />
        </div>

        {/* arrows */}
        <button
          type="button"
          aria-label="Previous flavor"
          onClick={() => go(-1)}
          className="absolute left-0 top-1/2 z-30 flex size-14 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink transition-transform hover:scale-95 lg:size-20"
        >
          <ArrowIcon className="size-6 rotate-180 lg:size-7" />
        </button>
        <button
          type="button"
          aria-label="Next flavor"
          onClick={() => go(1)}
          className="absolute right-0 top-1/2 z-30 flex size-14 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-ink transition-transform hover:scale-95 lg:size-20"
        >
          <ArrowIcon className="size-6 lg:size-7" />
        </button>
      </div>

      <Link
        href="/shop"
        className={cn(
          "mt-4 rounded-xl bg-cream px-10 py-4 font-serif text-xl uppercase tracking-tight text-ink",
          "transition-transform hover:scale-[0.97]",
        )}
      >
        Shop Now
      </Link>
    </section>
  );
}
