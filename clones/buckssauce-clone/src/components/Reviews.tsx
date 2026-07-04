import { REVIEWS } from "@/lib/data";
import { QuoteIcon } from "@/components/icons";

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <article className="w-[300px] shrink-0 lg:w-[360px]">
      {/* label-tab header */}
      <div className="relative flex items-center justify-center rounded-xl bg-cream px-8 py-3 font-serif text-lg uppercase tracking-tight text-ink lg:text-xl">
        <span className="absolute left-4 size-1.5 rounded-full bg-ink" />
        <span className="truncate">{review.name}</span>
        <span className="absolute right-4 size-1.5 rounded-full bg-ink" />
      </div>
      {/* body */}
      <div className="relative -mt-3 flex min-h-[280px] flex-col items-center rounded-2xl border border-cream/10 bg-panel px-7 pb-8 pt-10 text-center lg:min-h-[320px]">
        <QuoteIcon className="mb-5 h-7 w-9 text-cream" />
        <h4 className="text-outline font-serif text-xl uppercase leading-[1.05] tracking-tight lg:text-2xl">
          {review.quote}
        </h4>
        <p className="mt-5 text-sm leading-relaxed text-cream/85">
          {review.body}
          {review.handle ? ` (${review.handle})` : ""}
        </p>
      </div>
    </article>
  );
}

export function Reviews() {
  const loop = [...REVIEWS, ...REVIEWS];
  return (
    <section className="relative mt-28 w-full overflow-hidden lg:mt-40">
      <h2 className="p-container text-outline w-full text-center font-serif text-[clamp(3.5rem,17vw,14rem)] uppercase leading-[0.8] tracking-tight">
        Reviews
      </h2>

      <div className="group mt-10 flex overflow-hidden lg:mt-16">
        <div className="animate-marquee flex w-max gap-5 pl-5 [animation-duration:45s] group-hover:[animation-play-state:paused]">
          {loop.map((r, idx) => (
            <ReviewCard key={idx} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
