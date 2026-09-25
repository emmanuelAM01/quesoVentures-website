import { ImageResponse } from "next/og";
import { getEntry } from "lib/guide/queries";
import { guideImageUrl } from "lib/guide/supabase";

export const alt = "The Queso Guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 86400;

/**
 * Inter Tight, fetched as TTF: the Fonts API hands a TTF to a client that does
 * not announce woff2 support, and satori cannot read woff2. If the fetch
 * fails the card still renders in the default face.
 */
async function interTight(weight: 400 | 700): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=Inter+Tight:wght@${weight}`, {
      next: { revalidate: 60 * 60 * 24 * 30 },
    }).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await fetch(url).then((r) => r.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

export default async function OgImage({
  params,
}: {
  params: { city: string; category: string; slug: string };
}) {
  const entry = await getEntry(params.city, params.category, params.slug, false);
  const [regular, bold] = await Promise.all([interTight(400), interTight(700)]);
  // Uploads are converted to JPEG in the admin, which satori can draw. It
  // cannot draw WebP or AVIF, so anything else is left out rather than broken.
  const hero = guideImageUrl(entry?.hero_image_path);
  const drawable = hero && /\.(jpe?g|png)$/i.test(entry?.hero_image_path ?? "") ? hero : null;

  const fonts = [
    regular && { name: "Inter Tight", data: regular, weight: 400 as const, style: "normal" as const },
    bold && { name: "Inter Tight", data: bold, weight: 700 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 700; style: "normal" }[];

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#101216", fontFamily: "Inter Tight" }}>
        {drawable ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={drawable} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, width: 1200, height: 630, objectFit: "cover" }} />
        ) : null}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: drawable
              ? "linear-gradient(to top, rgba(16,18,22,0.95) 0%, rgba(16,18,22,0.55) 55%, rgba(16,18,22,0.15) 100%)"
              : "radial-gradient(circle at 80% 20%, rgba(196,22,28,0.55), rgba(16,18,22,0) 55%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "56px 64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 16, height: 16, borderRadius: 999, background: "#FFD100" }} />
            <div style={{ fontSize: 30, fontWeight: 700, color: "#FFFFFF", letterSpacing: -0.5 }}>The Queso Guide</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {entry ? (
              <div style={{ fontSize: 28, color: "#FFD100", marginBottom: 12 }}>
                {`${entry.category.name} in ${entry.area || entry.city.name}`}
              </div>
            ) : null}
            <div style={{ fontSize: 76, fontWeight: 700, color: "#FFFFFF", letterSpacing: -2, lineHeight: 1.05 }}>
              {entry?.business_name ?? "The Queso Guide"}
            </div>
            <div style={{ display: "flex", marginTop: 28, height: 8, width: 240, background: "linear-gradient(90deg, #C4161C, #FFD100)" }} />
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
