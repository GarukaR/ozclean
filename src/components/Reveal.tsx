"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** "up" (default) for content, "none" to just fade without a slide — use for large images. */
  direction?: "up" | "none";
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Reveal({ children, delay = 0, className, direction = "up" }: RevealProps) {
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: direction === "up" ? 20 : 0 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      transition={{ duration: 0.6, delay: reduceMotion ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
