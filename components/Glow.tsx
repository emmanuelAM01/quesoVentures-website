"use client";

import Link from "next/link";

interface Props {
  /** Hex of the paint that should leak out from under the card. */
  color: string;
  /** Must match the child surface's radius or the spill looks misaligned. */
  radius?: string;
  /** How far the pool spreads from the cursor. */
  spread?: number;
  href?: string;
  className?: string;
  /** Lift the card slightly on hover. Off for large panels. */
  lift?: boolean;
  children: React.ReactNode;
}

/**
 * Wraps any card so a pool of colour tracks the cursor underneath it.
 *
 * The glow sits on a sibling element slightly larger than the card, blurred,
 * with the caller's opaque surface stacked on top — so only the spill past the
 * edges is ever visible. The child surface must be opaque and establish its own
 * stacking context (`relative`), and this wrapper must never get
 * `overflow-hidden` or the spill gets clipped away.
 *
 * Cursor position is written straight to CSS custom properties. A grid of a
 * dozen of these would re-render continuously if it went through React state.
 */
export default function Glow({
  color,
  radius = "rounded-2xl",
  spread = 240,
  href,
  className = "",
  lift = true,
  children,
}: Props) {
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const wrapper = [
    "group relative block h-full transition-transform duration-300",
    radius,
    lift ? "hover:-translate-y-0.5 motion-reduce:hover:translate-y-0" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const glow = (
    <span
      aria-hidden
      className="pointer-events-none absolute -inset-[3px] opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-90 motion-reduce:transition-none"
      style={{
        borderRadius: "inherit",
        background: `radial-gradient(${spread}px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 65%)`,
      }}
    />
  );

  if (href) {
    return (
      <Link href={href} onMouseMove={onMove} className={wrapper}>
        {glow}
        {children}
      </Link>
    );
  }

  return (
    <div onMouseMove={onMove} className={wrapper}>
      {glow}
      {children}
    </div>
  );
}
