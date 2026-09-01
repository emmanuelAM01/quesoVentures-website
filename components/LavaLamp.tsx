import { PAINT } from "components/livery";

/**
 * The drifting blob field from the Queso Rewards landing page, ported here.
 *
 * Three house-paint blobs on a slow loop under a heavy blur and a dark scrim.
 * The blur is what makes it work: the colour is always moving and never
 * legible, so type sits on it as safely as it would on flat ink. Anything
 * placed over this needs `relative`, and the parent needs `overflow-hidden`.
 *
 * Reserved for the moments that ask for something: the close on every page,
 * and the hero when there is no photograph. Used more often than that it stops
 * being a moment.
 */
export default function LavaLamp({
  /** Higher darkens the scrim. Raise it when type sits directly on the blobs. */
  scrim = 0.55,
  /**
   * Sit on top of a photograph instead of replacing it.
   *
   * Two things change. There is no ink base, so the picture shows through. And
   * the blur moves from `backdrop-blur` onto the blobs themselves — a backdrop
   * blur would smear the photograph behind them, which is the one thing a hero
   * image cannot survive. The blobs then blend rather than cover, so the effect
   * reads as coloured light moving across the scene rather than paint over it.
   */
  overlay = false,
}: {
  scrim?: number;
  overlay?: boolean;
}) {
  const blob = overlay
    ? "queso-blob absolute rounded-full blur-3xl mix-blend-soft-light"
    : "queso-blob absolute rounded-full";

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {!overlay && <div className="absolute inset-0 bg-inkLight" />}
      <div
        className={`${blob} -top-1/4 -left-1/4 h-[70vmax] w-[70vmax] ${
          overlay ? "opacity-70" : "opacity-80"
        }`}
        style={{
          backgroundColor: PAINT.rossoCorsa.hex,
          animation: "queso-drift 16s ease-in-out infinite",
        }}
      />
      <div
        className={`${blob} -bottom-1/3 -right-1/4 h-[62vmax] w-[62vmax] ${
          overlay ? "opacity-70" : "opacity-90"
        }`}
        style={{
          backgroundColor: PAINT.gialloOrion.hex,
          animation: "queso-drift 22s ease-in-out infinite reverse",
        }}
      />
      <div
        className={`${blob} left-1/2 top-1/3 h-[45vmax] w-[45vmax] ${
          overlay ? "opacity-60" : "opacity-70"
        }`}
        style={{
          backgroundColor: PAINT.rossoScuderia.hex,
          animation: "queso-drift 19s ease-in-out infinite",
          animationDelay: "-7s",
        }}
      />
      {overlay ? (
        <>
          {/* Gradient rather than a flat wash: heaviest where the type sits,
              lighter through the middle so the photograph stays a photograph. */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, rgba(11,13,18,${
                scrim + 0.15
              }), rgba(11,13,18,${scrim + 0.02}) 45%, rgba(11,13,18,${
                scrim + 0.2
              }))`,
            }}
          />
          {/* Phones need more. The headline and the sub fill most of a narrow
              frame, so there is no dark band left for them to sit in the way
              there is on a wide one. */}
          <div className="absolute inset-0 bg-black/25 sm:bg-black/10 lg:bg-transparent" />
        </>
      ) : (
        <div
          className="absolute inset-0 backdrop-blur-3xl"
          style={{ backgroundColor: `rgba(11,13,18,${scrim})` }}
        />
      )}
    </div>
  );
}
