"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/lib/data";
import { ArrowIcon, EllipsisIcon } from "@/components/icons";
import { AddToCartButton } from "@/components/AddToCartButton";

const PACKS = [
  { key: "3", label: "3 pack", price: "$32.00", img: (p: (typeof PRODUCTS)[number]) => p.pack3 },
  { key: "6", label: "6 pack", price: "$60.00", img: (p: (typeof PRODUCTS)[number]) => p.pack6 },
] as const;

export function BuyPack() {
  const [pack, setPack] = useState(0);
  const [i, setI] = useState(0);
  const product = PRODUCTS[i];
  const go = (dir: number) => setI((p) => (p + dir + PRODUCTS.length) % PRODUCTS.length);
  const activePack = PACKS[pack];

  return (
    <section className="p-container mt-24 grid w-full gap-2.5 lg:mt-40 lg:grid-cols-2">
      {/* Left: wings hero image */}
      <div className="relative min-h-[55vh] overflow-hidden rounded-3xl lg:min-h-[80vh]">
        <Image src="/images/wings.png" alt="Saucy BBQ wings" fill className="object-cover" />
      </div>

      {/* Right: pack picker */}
      <div className="flex flex-col rounded-3xl pt-8 lg:pt-4">
        <div className="text-center">
          <h2 className="font-serif text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.85] tracking-tight text-cream">
            Buy a Pack
          </h2>
          <p className="mt-1 font-serif text-2xl uppercase tracking-tight text-cream lg:text-3xl">
            Save some Bucks
          </p>
        </div>

        {/* 3 / 6 pack toggle */}
        <div className="mt-8 flex items-center justify-center gap-10">
          {PACKS.map((pk, idx) => (
            <button
              key={pk.key}
              type="button"
              onClick={() => setPack(idx)}
              className={cn(
                "relative px-4 py-2 font-serif text-xl uppercase tracking-tight transition-colors lg:text-2xl",
                pack === idx ? "text-cream" : "text-cream/45 hover:text-cream/70",
              )}
            >
              {pack === idx && (
                <EllipsisIcon className="pointer-events-none absolute inset-0 -inset-x-3 h-full w-[calc(100%+1.5rem)] text-cream" />
              )}
              {pk.label}
            </button>
          ))}
        </div>

        {/* Carousel card */}
        <div
          className="relative mt-auto flex items-center gap-2 overflow-hidden rounded-3xl px-4 py-8 transition-colors duration-500 lg:mt-10 lg:px-6"
          style={{ backgroundColor: product.color }}
        >
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1)}
            className="z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-cream text-ink transition-transform hover:scale-95 lg:size-16"
          >
            <ArrowIcon className="size-5 rotate-180" />
          </button>

          <div key={`${product.key}-${activePack.key}`} className="animate-[fadein_.4s_ease] flex flex-1 flex-col items-center">
            <h3 className="text-center font-serif text-2xl uppercase leading-[0.95] tracking-tight text-cream lg:text-4xl">
              {product.name}
            </h3>
            <div className="relative my-4 flex h-48 w-full items-center justify-center lg:h-64">
              <Image
                src={activePack.img(product)}
                alt={`${product.name} ${activePack.label}`}
                width={420}
                height={360}
                className="h-full w-auto object-contain drop-shadow-2xl"
              />
            </div>
            <div className="flex w-full items-center justify-between gap-3 px-2">
              <span className="font-serif text-2xl text-cream">{activePack.price}</span>
              <div className="flex gap-2">
                <AddToCartButton className="bg-cream text-ink" />
                <button
                  type="button"
                  className="rounded-xl border border-cream/60 px-6 py-3 font-serif text-lg uppercase tracking-tight text-cream transition-transform hover:scale-[0.97]"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Next"
            onClick={() => go(1)}
            className="z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-cream text-ink transition-transform hover:scale-95 lg:size-16"
          >
            <ArrowIcon className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
