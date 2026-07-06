export interface ServiceArea {
  city: string;
  slug: string;
  tagline: string;
}

export const SERVICE_AREAS: ServiceArea[] = [
  {
    city: "Humble",
    slug: "/web-design-humble-tx",
    tagline: "Get found by customers searching along FM 1960 and beyond.",
  },
  {
    city: "Atascocita",
    slug: "/web-design-atascocita-tx",
    tagline: "Show up first when Atascocita neighbors search for what you do.",
  },
  {
    city: "Kingwood",
    slug: "/web-design-kingwood-tx",
    tagline: "Be the business Kingwood finds when word of mouth isn't enough.",
  },
];
