"use client";

import { useEffect, useRef, useState } from "react";

const CODE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

interface Piece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotate: number;
  size: number;
}

export default function KonamiEasterEgg() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const progress = useRef(0);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const expected = CODE[progress.current];

      if (key === expected) {
        progress.current += 1;
        if (progress.current === CODE.length) {
          progress.current = 0;
          triggerRain();
        }
      } else {
        progress.current = key === CODE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    return () => {
      if (clearTimer.current) clearTimeout(clearTimer.current);
    };
  }, []);

  const triggerRain = () => {
    const count = 45;
    const newPieces: Piece[] = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 2.4 + Math.random() * 1.8,
      rotate: Math.random() * 360,
      size: 22 + Math.random() * 20,
    }));
    setPieces(newPieces);
    if (clearTimer.current) clearTimeout(clearTimer.current);
    clearTimer.current = setTimeout(() => setPieces([]), 5000);
  };

  if (pieces.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200] overflow-hidden"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute -top-[10%] select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animation: `cheeseFall ${p.duration}s ease-in ${p.delay}s forwards`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          🧀
        </span>
      ))}
      <style>{`
        @keyframes cheeseFall {
          to {
            transform: translateY(115vh) rotate(360deg);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}
