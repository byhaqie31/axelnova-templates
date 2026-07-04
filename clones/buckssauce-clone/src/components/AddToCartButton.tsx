"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "@/components/icons";

type State = "idle" | "adding" | "added";

export function AddToCartButton({
  className,
  label = "Add to cart",
}: {
  className?: string;
  label?: string;
}) {
  const [state, setState] = useState<State>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const onClick = () => {
    if (state !== "idle") return;
    setState("adding");
    timers.current.push(
      setTimeout(() => setState("added"), 700),
      setTimeout(() => setState("idle"), 2200),
    );
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-serif text-lg uppercase tracking-tight transition-transform hover:scale-[0.97]",
        className,
      )}
    >
      {state === "idle" && label}
      {state === "adding" && "Adding"}
      {state === "added" && (
        <>
          Added <CheckIcon className="size-5" />
        </>
      )}
    </button>
  );
}
