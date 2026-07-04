import Link from "next/link";
import { SOCIALS } from "@/lib/data";
import {
  Logo,
  PlayIcon,
  ArrowIcon,
  InstagramIcon,
  FacebookIcon,
  BuzzworthyStudioLogo,
} from "@/components/icons";

const FOOTER_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "About", href: "/about" },
  { label: "Faq", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="p-container relative flex flex-col gap-5 pt-8 pb-5">
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-[15fr_35fr_35fr_15fr]">
        {/* Logo */}
        <div className="col-span-1 flex items-center justify-center rounded-2xl border border-dashed border-cream/30 p-8">
          <Logo className="h-auto w-28 text-cream lg:w-32" />
        </div>

        {/* Nav */}
        <nav className="order-3 col-span-2 flex flex-col justify-center lg:order-none lg:col-span-1">
          {FOOTER_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-3 border-b border-dashed border-cream/20 py-3 font-serif text-2xl uppercase tracking-tight text-cream transition-opacity hover:opacity-60 lg:text-3xl"
            >
              <PlayIcon className="size-4 text-cream" />
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Bucks Club */}
        <div className="order-2 col-span-1 flex flex-col justify-center lg:order-none">
          <h3 className="font-serif text-2xl uppercase tracking-tight text-cream lg:text-3xl">
            Join the Bucks Club
          </h3>
          <p className="mt-3 text-sm text-cream/70">
            New flavors. Restocks. Fire recipes. Merch drops.
          </p>
          <form className="mt-6 flex items-center gap-2 rounded-2xl border border-cream/20 py-2 pl-6 pr-2">
            <input
              type="email"
              placeholder="Your email..."
              className="w-full bg-transparent py-2 text-cream placeholder:text-cream/40 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:bg-cream/10"
            >
              <ArrowIcon className="size-5" />
            </button>
          </form>
        </div>

        {/* Socials */}
        <div className="order-4 col-span-1 flex flex-col gap-2.5 lg:order-none">
          <a
            href={SOCIALS.instagram}
            aria-label="Instagram"
            className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-cream/30 py-8 text-cream transition-colors hover:bg-cream/5"
          >
            <InstagramIcon className="size-6" />
          </a>
          <a
            href={SOCIALS.facebook}
            aria-label="Facebook"
            className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-cream/30 py-8 text-cream transition-colors hover:bg-cream/5"
          >
            <FacebookIcon className="size-6" />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between border-t border-cream/15 pt-5 text-sm text-cream/70">
        <span>© 2026. Bucks Sauce Co. All rights reserved.</span>
        <a
          href="https://buzzworthystudio.com"
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
        >
          Website by Buzzworthy
          <BuzzworthyStudioLogo className="size-5 text-cream" />
        </a>
      </div>
    </footer>
  );
}
