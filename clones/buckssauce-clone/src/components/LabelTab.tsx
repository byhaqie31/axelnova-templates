import { cn } from "@/lib/utils";

/** Cream pin-dot tag used on ingredient cards, feature reel, and review cards. */
export function LabelTab({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl bg-cream px-10 py-3 font-serif text-lg uppercase tracking-tight text-ink lg:text-xl",
        className,
      )}
    >
      <span className="absolute left-3 size-1.5 rounded-full bg-ink" />
      <span className="whitespace-nowrap">{children}</span>
      <span className="absolute right-3 size-1.5 rounded-full bg-ink" />
    </div>
  );
}
