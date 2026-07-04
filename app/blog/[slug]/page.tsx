import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import NicheCtaButton from "components/NicheCtaButton";

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  niche: string;
  ctaHeading?: string;
  ctaText?: string;
  ctaPrefill?: string;
  ctaLabel?: string;
}

function getPost(slug: string): { data: Frontmatter; content: string } {
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { data: data as Frontmatter, content };
}

export function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files.map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { data } = getPost(params.slug);
  return {
    title: `${data.title} | Queso Ventures`,
    description: data.description,
    alternates: { canonical: `https://www.quesoventures.com/blog/${params.slug}` },
    openGraph: {
      title: `${data.title} | Queso Ventures`,
      description: data.description,
      url: `https://www.quesoventures.com/blog/${params.slug}`,
      siteName: "Queso Ventures",
      images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
      locale: "en_US",
      type: "article",
      publishedTime: data.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title} | Queso Ventures`,
      description: data.description,
      images: ["/logo.png"],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { data, content } = getPost(params.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://www.quesoventures.com/blog/${params.slug}`,
    headline: data.title,
    description: data.description,
    datePublished: data.date,
    url: `https://www.quesoventures.com/blog/${params.slug}`,
    image: "https://www.quesoventures.com/logo.png",
    author: {
      "@type": "Organization",
      name: "Queso Ventures",
      url: "https://www.quesoventures.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Queso Ventures",
      url: "https://www.quesoventures.com",
      logo: { "@type": "ImageObject", url: "https://www.quesoventures.com/logo.png" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.quesoventures.com/blog/${params.slug}`,
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="container mx-auto px-4 py-16">
        <article className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-lightTextMuted dark:text-darkTextMuted mb-4">
            {data.niche}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-lightText dark:text-darkText mb-8 leading-tight">
            {data.title}
          </h1>

          <div className="space-y-5 text-base sm:text-lg text-lightTextMuted dark:text-darkTextMuted font-light leading-relaxed [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-semibold [&_h2]:text-lightText [&_h2]:dark:text-darkText [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-lightText [&_h3]:dark:text-darkText [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_strong]:font-semibold [&_strong]:text-lightText [&_strong]:dark:text-darkText [&_a]:text-lightButton [&_a]:dark:text-darkButton [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:border-l-4 [&_blockquote]:border-lightBorder [&_blockquote]:dark:border-darkBorder [&_blockquote]:pl-4 [&_blockquote]:italic">
            <MDXRemote source={content} />
          </div>

          {data.ctaHeading && data.ctaPrefill && (
            <div className="mt-14 rounded-2xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-lightText dark:text-darkText mb-3">
                {data.ctaHeading}
              </h2>
              {data.ctaText && (
                <p className="text-base text-lightTextMuted dark:text-darkTextMuted font-light mb-6">
                  {data.ctaText}
                </p>
              )}
              <NicheCtaButton
                message={data.ctaPrefill}
                label={data.ctaLabel ?? "Get a Free Visibility Check"}
              />
              <p className="mt-4 text-sm text-lightTextMuted dark:text-darkTextMuted font-light">
                No pressure. If we&apos;re a fit, I&apos;ll tell you the next steps.
              </p>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
