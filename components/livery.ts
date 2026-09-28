/**
 * Paint palette.
 *
 * Every hex below is the factory value from exoticcarcolors.com, read off each
 * paint's own detail page. Do not eyeball these — if a colour is added, look up
 * its page and copy the code.
 *
 * Used as accents, never as surfaces. A 4px livery stripe on a cream card reads
 * premium; a card painted Verde Mantis reads like a toy.
 *
 * `ink` is a darkened variant for text and borders, since several of these
 * paints are far too bright to set type in against cream.
 */

export interface Paint {
  /** Factory name, used in the monospace spec labels. */
  name: string;
  hex: string;
  /** Legible against a cream background for text use. */
  ink: string;
}

export const PAINT = {
  rossoCorsa: { name: "Rosso Corsa", hex: "#D40000", ink: "#A80000" },
  rossoScuderia: { name: "Rosso Scuderia", hex: "#FF2800", ink: "#C21C00" },
  // Inks are checked against the darkest light surface the site uses, the
  // #E4E8ED section band, not just the page. Three had to come down a step
  // when the ground moved from cream to grey; each still clears 4.5:1.
  gialloOrion: { name: "Giallo Orion", hex: "#FEA700", ink: "#8D5D00" },
  gialloModena: { name: "Giallo Modena", hex: "#FCE903", ink: "#716700" },
  arancioXanto: { name: "Arancio Xanto", hex: "#E64A37", ink: "#B33526" },
  verdeMantis: { name: "Verde Mantis", hex: "#7DC23B", ink: "#477220" },
  bluLeMans: { name: "Blu Le Mans", hex: "#0690FF", ink: "#0063B3" },
  bluTourDeFrance: { name: "Blu Tour de France", hex: "#2243AA", ink: "#2243AA" },
  violaPasifae: { name: "Viola Pasifae", hex: "#6B0686", ink: "#6B0686" },
  grigioTelesto: { name: "Grigio Telesto", hex: "#7692A5", ink: "#4F6675" },
  neroDaytona: { name: "Nero Daytona", hex: "#1A1A1A", ink: "#1A1A1A" },
} as const satisfies Record<string, Paint>;

/**
 * Rotation for card grids. Ordered so no two adjacent cards land on
 * neighbouring hues in a 2 or 3 column layout.
 */
export const LIVERY: Paint[] = [
  PAINT.rossoCorsa,
  PAINT.gialloOrion,
  PAINT.bluLeMans,
  PAINT.verdeMantis,
  PAINT.arancioXanto,
  PAINT.violaPasifae,
  PAINT.bluTourDeFrance,
  PAINT.rossoScuderia,
  PAINT.gialloModena,
  PAINT.grigioTelesto,
];

export const liveryAt = (i: number): Paint => LIVERY[i % LIVERY.length];

/** The "and more" card is always Giallo Orion — the house yellow. */
export const OPEN_ENDED = PAINT.gialloOrion;

/**
 * The house colours: the ramp under every hero title, red to yellow. Used
 * whole as a gradient, or spread along a sequence with `houseAt`.
 */
export const HOUSE = [PAINT.rossoCorsa.hex, PAINT.gialloOrion.hex, PAINT.gialloModena.hex];

/** Item `i` of `n`, placed along the house ramp, as a hex. */
export function houseAt(i: number, n: number) {
  const t = n < 2 ? 0 : i / (n - 1);
  const seg = Math.min(HOUSE.length - 2, Math.floor(t * (HOUSE.length - 1)));
  const f = t * (HOUSE.length - 1) - seg;
  const [a, b] = [HOUSE[seg], HOUSE[seg + 1]].map((h) =>
    [1, 3, 5].map((k) => parseInt(h.slice(k, k + 2), 16))
  );
  return `#${a.map((v, k) => Math.round(v + (b[k] - v) * f).toString(16).padStart(2, "0")).join("")}`;
}

/** The house ramp as a CSS gradient, left to right unless told otherwise. */
export const houseGradient = (direction = "to right") =>
  `linear-gradient(${direction}, ${HOUSE.join(", ")})`;
