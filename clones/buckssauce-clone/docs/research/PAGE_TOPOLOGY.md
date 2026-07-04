# Bucks Sauce — Page Topology & Build Blueprint

Target: https://buckssauce.com/ (Next.js App Router + Turbopack, Shopify commerce, Prismic CMS, Lenis smooth scroll, GSAP ScrollTrigger).

## Design tokens
- **bg / ink**: `#100B06`  •  **cream / foreground**: `#F5E4C7`
- **pineapple / gold**: `#BE8D3F` (also accent text + hero circle)  •  **habanero**: `#F15726`  •  **cherry**: `#DA1F27`
- **panel** (cards): `#272119`
- Fonts: body = **Inter Tight** (`font-sans`); display = **PeperoncinoSans** (`font-serif`, used on all headings + buttons, UPPERCASE, tight tracking ~ -0.02em)
- Page gutter: `p-container` = 10px inline padding. 12-col system (`w-col-N` = N/12).
- Hero H1: 100px / lh 88px / tracking -2px. Outlined text via `-webkit-text-stroke` + transparent fill.

## Global chrome
- **Header** (`components/Header.tsx`): fixed, z-9990, reveals on load (opacity 0 + translateY(-200px) → in).
  - Top state (scroll≈0): centered/right nav links SHOP · WHOLESALE · ABOUT · CONTACT · FAQ · CART(0), buck Logo top-left.
  - Scrolled state: compact — buck antler mark left + **GET SAUCE** cream pill + cart icon button + hamburger (menu) button (right). Transition on scroll past ~ first viewport.
  - **Menu overlay** (`data-menu`): cream (#F5E4C7) full-height rounded panel sliding from right; dark links Shop/Wholesale/About/Contact/FAQ + Instagram/Facebook + "Add some sauce". Close (X) button.
- **Footer** (`components/Footer.tsx`): buck logo; nav column (Shop/Wholesale/About/Faq/Contact each w/ play-icon bullet, dashed dividers); "JOIN THE BUCKS CLUB / New flavors. Restocks. Fire recipes. Merch drops." + email input w/ circular arrow; IG + FB dashed square buttons; bottom bar "© 2026. Bucks Sauce Co. All rights reserved." + "Website by Buzzworthy" → buzzworthystudio.com.

## Sections (main, top → bottom)
1. **Intro overlay** — full-screen logo reveal on load (z-9999). Optional; approximate with a brief logo fade.
2. **Hero** (`Hero.tsx`) — H1 "The BBQ sauce that makes other sauces insecure" ("THE BBQ SAUCE" outlined, rest filled). Product **carousel**: bottle center on gold `CircleIcon` disc, floating pineapple/produce + sunglasses mascot; labels "PRODUCT N0.0{n}" (left) / flavor name (right) on a dotted rule; circular ← → arrow buttons. "Shop Now" CTA. INTERACTION: click arrows to switch flavor (pineapple→habanero→cherry).
3. **Intro band** (`IntroBand.tsx`) — centered display text w/ inline SplashIcon (red) + HatIcon (chef): "Our BBQ sauces use real, natural stuff like it's the 1800s. [splash] Slap it on anything you grill and act surprised when people think you can [hat] cook."
4. **No Corn Syrup** (`Ingredients.tsx`) — GSAP-pinned stacked card deck; 4 cards (no corn syrup / no seed oils / no additives / gluten free), each = cream label-tab (pin dots) + circular line icon + body. Floating produce (cherry, habanero, tomato, garlic, onion, chili) parallax. Approximate stack with offset cards + reveal.
5. **Choose Your Weapon** (`ChooseWeapon.tsx`) — "CHOOSE YOUR" filled + "WEAPON" outlined behind; 3 color product cards (gold/orange/red) w/ name, bottle image, tagline, price $12, antler flourishes, Add to cart.
6. **Why Bucks Sauce** (`WhyBucks.tsx`) — arched "WHY BUCKS SAUCE" wordmark; subtext "We make small-batch BBQ sauce because big-batch tastes like sadness. We're ending boring BBQ." Horizontal numbered reel on dotted line: 01 Small batches · 02 Real Ingredients · 03 Oh, This? (each big outlined number + cream label-tab + body + mascot). GSAP pinned horizontal scroll → approximate as horizontal scroll / marquee row.
7. **Buy a Pack** (`BuyPack.tsx`) — 2-col: left full-bleed wings image (`wings.png`); right "BUY A PACK / Save some Bucks" + 3 PACK / 6 PACK toggle (active = wobbly `EllipsisIcon` ring) + product carousel card (gold bg) w/ 3-bottle pack image, name, ← →, $32, Add to cart / Buy Now.
8. **Reviews** (`Reviews.tsx`) — hand-drawn outlined "REVIEWS" wordmark; horizontal row/marquee of review cards: cream label-tab (name + pin dots) + QuoteIcon + outlined quote headline + body + @handle. 5 reviews. Subtle antler/flame pattern bg on card.

## Recurring motifs
- **Label-tab**: cream (#F5E4C7) rounded rect, dark uppercase display text, tiny filled dot on each side ("• TITLE •"), slightly rotated.
- **Circular icon button**: cream disc, dark hand-drawn arrow/icon (hero + pack carousels).
- Hand-drawn icons everywhere (from `@/components/icons`): Logo, ArrowIcon, CartIcon, MenuIcon, CloseIcon, CheckIcon, PlayIcon, QuoteIcon, AntlerIcon, SplashIcon, HatIcon, EllipsisIcon, CircleIcon, InstagramIcon, FacebookIcon, BuzzworthyStudioLogo.

## Behaviors summary
- Lenis smooth scroll (installed) + GSAP ScrollTrigger.
- Header reveal on load + scroll state swap.
- Reveal-on-scroll (fade+slide-up, stagger) via `components/Reveal.tsx` — used broadly.
- Carousels: hero (flavors), buy-pack (flavors) — click arrows.
- Pinned/horizontal sections (ingredients deck, why-bucks reel) approximated with offset/scroll where full GSAP pin is impractical.
