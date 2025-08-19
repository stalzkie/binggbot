"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ReviewItem = {
  quote: string;
  name: string;
  title: string;
  image?: string;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  cardClassName, // 👈 NEW: allows parent to control card styling
}: {
  items: ReviewItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  cardClassName?: string; // 👈 NEW
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = React.useState(false);

  const animationDuration = React.useMemo(() => {
    switch (speed) {
      case "fast":
        return "20s";
      case "normal":
        return "40s";
      case "slow":
        return "80s";
      default:
        return "40s";
    }
  }, [speed]);

  const animationDirection = React.useMemo(
    () => (direction === "left" ? "forwards" : "reverse"),
    [direction]
  );

  const setupAnimation = React.useCallback(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const container = containerRef.current;
    const scroller = scrollerRef.current;

    container.style.setProperty("--animation-duration", animationDuration);
    container.style.setProperty("--animation-direction", animationDirection);

    if (scroller.children.length === items.length) {
      const scrollerContent = Array.from(scroller.children);
      const fragment = document.createDocumentFragment();
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        fragment.appendChild(duplicatedItem);
      });
      scroller.appendChild(fragment);
    }

    setStart(true);
  }, [animationDuration, animationDirection, items.length]);

  React.useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setupAnimation();
    });
    return () => cancelAnimationFrame(rafId);
  }, [setupAnimation]);

  const renderedItems = React.useMemo(() => {
    return items.map((item, index) => (
      <li
        key={`${item.name}-${index}`}
        className={cn(
          // layout & shape
          "w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] max-w-full relative rounded-2xl border flex-shrink-0 px-6 sm:px-8 py-6",
          // THEME DEFAULTS (can be overridden via cardClassName)
          "light:bg-card light:border-border light:shadow-sm",
          "dark:bg-muted/20 dark:border-border/30",
          // optional glass look can still be added from parent
          cardClassName
        )}
      >
        <blockquote>
          <div
            aria-hidden="true"
            className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
          />
          <span className="relative z-20 text-sm sm:text-base leading-[1.6] text-foreground/90 font-normal">
            &ldquo;{item.quote}&rdquo;
          </span>
          <div className="relative z-20 mt-6 flex flex-row items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mr-3">
              <span className="text-xs sm:text-sm font-semibold text-primary">
                {item.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <span className="flex flex-col gap-1 min-w-0">
              <span className="text-sm leading-[1.6] text-foreground font-semibold truncate">
                {item.name}
              </span>
              <span className="text-xs leading-[1.6] text-muted-foreground font-normal truncate">
                {item.title}
              </span>
            </span>
          </div>
        </blockquote>
      </li>
    ));
  }, [items, cardClassName]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] transform-gpu",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{ transform: "translateZ(0)" }}
      >
        {renderedItems}
      </ul>
    </div>
  );
};
