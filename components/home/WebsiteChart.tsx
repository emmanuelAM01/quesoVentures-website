"use client";

import { useState } from "react";
import { formatGrowth } from "components/formatGrowth";
import type { ReportFigure, ReportMetric } from "lib/reportCard";
import { SERIES } from "components/home/series";

/**
 * The Website's year, small: the average client's three lines off the Report
 * Card, so the numbers above it have a shape. Same colours and labels as the
 * Report Card itself, so a metric is one colour everywhere on the site.
 *
 * Measured months are solid; projected or hand-set months are dashed, the
 * same honesty rule as the full page. Hover (or touch) shows the month.
 */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const W = 600;
const H = 260;
const PAD = { top: 16, right: 12, bottom: 28, left: 12 };

export default function WebsiteChart({ figures }: { figures: Partial<Record<ReportMetric, ReportFigure>> }) {
  const [hover, setHover] = useState<number | null>(null);
  const lines = SERIES.filter((s) => figures[s.key]?.line?.length).map((s) => ({ ...s, line: figures[s.key]!.line }));
  if (!lines.length) return null;

  const periods = Array.from(new Set(lines.flatMap((l) => l.line.map((p) => p.period)))).sort((a, b) => a - b);
  const first = periods[0];
  const last = periods[periods.length - 1];
  const values = lines.flatMap((l) => l.line.map((p) => p.index));
  const lo = Math.min(100, ...values);
  const hi = Math.max(...values);

  const x = (period: number) => PAD.left + ((period - first) / Math.max(1, last - first)) * (W - PAD.left - PAD.right);
  const y = (index: number) => PAD.top + (1 - (index - lo) / Math.max(1, hi - lo)) * (H - PAD.top - PAD.bottom);
  const path = (pts: { period: number; index: number }[]) =>
    pts.map((p, i) => `${i ? "L" : "M"}${x(p.period).toFixed(1)},${y(p.index).toFixed(1)}`).join(" ");

  const onMove = (clientX: number, rect: DOMRect) => {
    const px = ((clientX - rect.left) / rect.width) * W;
    let best = periods[0];
    for (const p of periods) if (Math.abs(x(p) - px) < Math.abs(x(best) - px)) best = p;
    setHover(best);
  };

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full touch-none select-none"
        role="img"
        aria-label="The average website client's growth by month, found online, website visits, and calls or directions"
        onMouseMove={(e) => onMove(e.clientX, e.currentTarget.getBoundingClientRect())}
        onTouchMove={(e) => onMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())}
        onTouchStart={(e) => onMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())}
        onMouseLeave={() => setHover(null)}
      >
        {/* Where they started: the line everything is measured against. */}
        <line x1={PAD.left} x2={W - PAD.right} y1={y(100)} y2={y(100)} stroke="rgba(255,255,255,0.14)" strokeDasharray="2 4" />

        {lines.map((l) => {
          const measured = l.line.filter((p) => !p.projected);
          const joinAt = measured.length ? [measured[measured.length - 1]] : [];
          const projected = [...joinAt, ...l.line.filter((p) => p.projected)];
          return (
            <g key={l.key}>
              {measured.length > 1 && <path d={path(measured)} fill="none" stroke={l.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />}
              {projected.length > 1 && (
                <path d={path(projected)} fill="none" stroke={l.color} strokeWidth={2} strokeDasharray="5 5" strokeLinecap="round" opacity={0.7} />
              )}
            </g>
          );
        })}

        {hover != null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={H - PAD.bottom} stroke="rgba(255,255,255,0.35)" />
            {lines.map((l) => {
              const p = l.line.find((q) => q.period === hover);
              return p ? <circle key={l.key} cx={x(p.period)} cy={y(p.index)} r={4.5} fill={l.color} stroke="#0B0D12" strokeWidth={2} /> : null;
            })}
          </g>
        )}

        {periods.map((p) => (
          <text key={p} x={x(p)} y={H - 8} textAnchor="middle" fontSize={11} fill="rgba(255,255,255,0.45)">
            {MONTHS[p - 1]}
          </text>
        ))}
      </svg>

      {hover != null && (
        <div
          className="pointer-events-none absolute top-0 z-10 w-max -translate-x-1/2 rounded-xl bg-white px-3 py-2 text-[13px] text-[#0F1A2A] shadow-lg"
          style={{ left: `clamp(5rem, ${(x(hover) / W) * 100}%, calc(100% - 5rem))` }}
        >
          <p className="font-semibold">{MONTHS[hover - 1]}</p>
          {lines.map((l) => {
            const p = l.line.find((q) => q.period === hover);
            if (!p) return null;
            return (
              <p key={l.key} className="mt-0.5 flex items-center gap-2 tabular-nums">
                <span aria-hidden className="h-[3px] w-3 rounded-full" style={{ backgroundColor: l.color }} />
                {l.label} {formatGrowth(p.index / 100)}
                {p.projected ? " projected" : ""}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
