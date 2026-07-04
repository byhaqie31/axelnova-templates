import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/data";
import { AntlerIcon } from "@/components/icons";
import { AddToCartButton } from "@/components/AddToCartButton";
import { Reveal } from "@/components/Reveal";

export function ChooseWeapon() {
  return (
    <section className="p-container relative mt-24 flex flex-col items-center lg:mt-36">
      {/* Heading: filled "CHOOSE YOUR" over outlined "WEAPON" */}
      <div className="relative mb-6 w-full text-center lg:mb-10">
        <h2 className="relative z-10 font-serif text-[clamp(2.5rem,9vw,7rem)] uppercase leading-[0.85] tracking-tight text-cream">
          Choose your
        </h2>
        <div className="text-outline pointer-events-none -mt-4 font-serif text-[clamp(4rem,17vw,13rem)] uppercase leading-[0.8] tracking-tight lg:-mt-10">
          Weapon
        </div>
      </div>

      <div className="grid w-full max-w-6xl gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p, idx) => (
          <Reveal key={p.key} y={40} delay={idx * 0.08}>
            <article
              className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl px-6 pt-9 pb-7"
              style={{ backgroundColor: p.color }}
            >
              <div className="flex items-center gap-3 text-cream">
                <AntlerIcon className="h-6 w-14 -scale-x-100 opacity-90" />
                <h3 className="text-center font-serif text-3xl uppercase leading-[0.9] tracking-tight text-cream lg:text-4xl">
                  {p.prefix}
                  <br />
                  {p.lines[0]}
                  <br />
                  {p.lines[1]}
                </h3>
                <AntlerIcon className="h-6 w-14 opacity-90" />
              </div>

              <p className="mt-3 max-w-[16rem] text-center text-sm text-cream/85">{p.tagline}</p>

              <div className="relative my-6 flex h-64 w-full items-end justify-center lg:h-80">
                <Image
                  src={p.bottle}
                  alt={p.name}
                  width={300}
                  height={640}
                  className="h-full w-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                />
              </div>

              <div className="mt-auto flex w-full items-center justify-between gap-3">
                <span className="font-serif text-2xl text-cream">{p.price}</span>
                <AddToCartButton className="bg-cream text-ink" />
              </div>
              <Link
                href="/shop"
                className="mt-4 text-sm uppercase tracking-wide text-cream/80 underline-offset-4 hover:underline"
              >
                View product
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
