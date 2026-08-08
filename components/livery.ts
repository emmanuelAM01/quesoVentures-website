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
  gialloOrion: { name: "Giallo Orion", hex: "#FEA700", ink: "#9C6700" },
  // ink darkened past the obvious value: #8A7F00 only hit 3.9:1 on cream,
  // which fails for the small monospace labels. #7E7300 clears 4.5:1.
  gialloModena: { name: "Giallo Modena", hex: "#FCE903", ink: "#7E7300" },
  arancioXanto: { name: "Arancio Xanto", hex: "#E64A37", ink: "#B33526" },
  verdeMantis: { name: "Verde Mantis", hex: "#7DC23B", ink: "#4C7A22" },
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
