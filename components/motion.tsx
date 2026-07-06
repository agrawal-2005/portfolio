"use client";

import { motion, type Variants } from "framer-motion";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease, delay: i * 0.08 },
  }),
};

/** Fades content in and up on mount. `delay` is a stagger index, not seconds. */
export function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

/** Fades content in when it scrolls into view. */
export function FadeInOnScroll({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-64px" }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}
