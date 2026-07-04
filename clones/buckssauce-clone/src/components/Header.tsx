"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SOCIALS } from "@/lib/data";
import {
  Logo,
  CartIcon,
  MenuIcon,
  CloseIcon,
  ArrowIcon,
  InstagramIcon,
  FacebookIcon,
} from "@/components/icons";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", menuOpen);
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 z-[9990] w-full transition-all duration-700 ease-out",
          mounted ? "translate-y-0 opacity-100" : "-translate-y-[120px] opacity-0",
        )}
      >
        <div className="flex w-full items-start justify-between p-[0.625rem] lg:p-[1.25rem]">
          <Link href="/" aria-label="Bucks Sauce home" className="pointer-events-auto text-cream">
            <Logo className="h-16 w-auto lg:h-auto lg:w-32" />
          </Link>

          {/* Top state: full nav (desktop, not scrolled) */}
          <nav
            className={cn(
              "hidden items-center gap-8 pt-2 font-serif text-[1.35rem] uppercase tracking-tight text-cream transition-opacity duration-300 xl:gap-11",
              !scrolled ? "lg:flex" : "lg:hidden",
            )}
          >
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="transition-opacity hover:opacity-60">
                {l.label}
              </Link>
            ))}
            <Link href="/cart" className="transition-opacity hover:opacity-60">
              Cart(0)
            </Link>
          </nav>

          {/* Compact state: GET SAUCE + cart + menu (mobile always, desktop when scrolled) */}
          <div
            className={cn(
              "flex items-center gap-[0.5rem]",
              !scrolled ? "lg:hidden" : "lg:flex",
            )}
          >
            <Link
              href="/shop"
              className="hidden items-center rounded-xl bg-cream px-6 py-3 font-serif text-lg uppercase tracking-tight text-ink transition-transform hover:scale-[0.97] sm:flex"
            >
              Get Sauce
            </Link>
            <Link
              href="/cart"
              aria-label="Cart"
              className="flex size-12 items-center justify-center rounded-xl border border-cream/30 text-cream transition-colors hover:bg-cream/10"
            >
              <CartIcon className="size-6" />
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="flex size-12 items-center justify-center rounded-xl border border-cream/30 text-cream transition-colors hover:bg-cream/10"
            >
              <MenuIcon className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Cream menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[9995] transition-opacity duration-300",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div
          className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <nav
          data-lenis-prevent
          className={cn(
            "absolute top-[0.625rem] right-[0.625rem] bottom-[0.625rem] flex w-[calc(100vw-1.25rem)] flex-col overflow-hidden rounded-2xl bg-cream text-ink transition-transform duration-500 ease-out lg:top-[1.25rem] lg:right-[1.25rem] lg:bottom-[1.25rem] lg:w-[46vw] lg:max-w-[720px]",
            menuOpen ? "translate-x-0" : "translate-x-[110%]",
          )}
        >
          <div className="flex items-center justify-between p-6 lg:p-8">
            <Logo className="h-14 w-auto text-ink" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="flex size-12 items-center justify-center rounded-xl border border-ink/20 transition-colors hover:bg-ink/5"
            >
              <CloseIcon className="size-6" />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-1 px-6 lg:px-10">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-ink/10 py-4 font-serif text-4xl uppercase tracking-tight transition-opacity hover:opacity-60 lg:text-6xl"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 p-6 lg:p-10">
            <div className="flex gap-3">
              <a
                href={SOCIALS.instagram}
                aria-label="Instagram"
                className="flex size-12 items-center justify-center rounded-xl border border-ink/20 transition-colors hover:bg-ink/5"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href={SOCIALS.facebook}
                aria-label="Facebook"
                className="flex size-12 items-center justify-center rounded-xl border border-ink/20 transition-colors hover:bg-ink/5"
              >
                <FacebookIcon className="size-5" />
              </a>
            </div>
            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl bg-ink px-6 py-4 font-serif text-lg uppercase tracking-tight text-cream transition-transform hover:scale-[0.98]"
            >
              Add some sauce <ArrowIcon className="size-5" />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
