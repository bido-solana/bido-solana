"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "motion/react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

interface GridConfig {
  numCards: number;
  cols: number;
  xBase: number;
  yBase: number;
  xStep: number;
  yStep: number;
}

export interface AnimatedLoadingSkeletonProps {
  /** Total number of placeholder cards. Default 6. */
  numCards?: number;
  /** Tailwind grid classes controlling responsive columns. */
  gridClassName?: string;
  /** Tailwind classes for each card (override height, padding, etc). */
  cardClassName?: string;
  /** Outer wrapper classes. */
  className?: string;
  /** Show the animated scanning search icon. Default true. */
  showSearchIcon?: boolean;
}

const defaultGridClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";

export function AnimatedLoadingSkeleton({
  numCards = 6,
  gridClassName = defaultGridClassName,
  cardClassName,
  className,
  showSearchIcon = true,
}: AnimatedLoadingSkeletonProps) {
  const [windowWidth, setWindowWidth] = useState(0);
  const controls = useAnimation();

  const getGridConfig = (width: number): GridConfig => {
    const cols = width >= 1024 ? 3 : width >= 640 ? 2 : 1;
    return {
      numCards,
      cols,
      xBase: 40,
      yBase: 60,
      xStep: 210,
      yStep: 230,
    };
  };

  const generateSearchPath = (config: GridConfig) => {
    const { numCards: cards, cols, xBase, yBase, xStep, yStep } = config;
    const rows = Math.ceil(cards / cols);
    const allPositions: Array<{ x: number; y: number }> = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (row * cols + col < cards) {
          allPositions.push({
            x: xBase + col * xStep,
            y: yBase + row * yStep,
          });
        }
      }
    }

    const numRandomCards = Math.min(4, allPositions.length);
    const shuffledPositions = allPositions
      .sort(() => Math.random() - 0.5)
      .slice(0, numRandomCards);

    if (shuffledPositions.length > 0) {
      shuffledPositions.push(shuffledPositions[0]);
    }

    return {
      x: shuffledPositions.map((pos) => pos.x),
      y: shuffledPositions.map((pos) => pos.y),
      scale: Array(shuffledPositions.length).fill(1.2),
      transition: {
        duration: shuffledPositions.length * 2,
        repeat: Infinity,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
        times: shuffledPositions.map(
          (_, i) => i / Math.max(1, shuffledPositions.length - 1),
        ),
      },
    };
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const config = getGridConfig(windowWidth);
    void controls.start(generateSearchPath(config));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth, numCards]);

  const frameVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const cardVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.08, duration: 0.35 },
    }),
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 18px rgba(99, 102, 241, 0.18)",
        "0 0 30px rgba(99, 102, 241, 0.35)",
        "0 0 18px rgba(99, 102, 241, 0.18)",
      ],
      scale: [1, 1.08, 1],
      transition: { duration: 1, repeat: Infinity, ease: "easeInOut" as const },
    },
  };

  return (
    <motion.div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border bg-card",
        className,
      )}
      variants={frameVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative p-4 sm:p-5">
        {showSearchIcon ? (
          <motion.div
            className="pointer-events-none absolute z-10"
            animate={controls}
            style={{ left: 24, top: 24 }}
          >
            <motion.div
              className="rounded-full bg-foreground/10 p-2.5 backdrop-blur-sm"
              variants={glowVariants}
              animate="animate"
            >
              <Search className="size-5 text-foreground/70" />
            </motion.div>
          </motion.div>
        ) : null}

        <div className={gridClassName}>
          {Array.from({ length: numCards }).map((_, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={i}
              className={cn(
                "rounded-xl border border-border bg-background p-4",
                cardClassName,
              )}
            >
              <ShimmerBlock className="mb-3 h-28 rounded-md" />
              <ShimmerBlock className="mb-2 h-3 w-3/4 rounded" />
              <ShimmerBlock className="h-3 w-1/2 rounded" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ShimmerBlock({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("bg-muted", className)}
      animate={{ opacity: [0.55, 1, 0.55] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default AnimatedLoadingSkeleton;
