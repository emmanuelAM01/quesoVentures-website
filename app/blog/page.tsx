import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";

export const metadata: Metadata = {
  title: "Local Business Growth Blog | Queso Ventures",
  description:
    "Practical guides for Houston business owners on getting more customers. Food trucks, shops, contractors, and more.",
  alternates: { canonical: "https://quesoventures.com/blog" },
  openGraph: {
    title: "Local Business Growth Blog | Queso Ventures",
    description:
      "Practical guides for Houston business owners on getting more customers. Food trucks, shops, contractors, and more.",
    url: "https://quesoventures.com/blog",
    siteName: "Queso Ventures",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Queso Ventures" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Local Business Growth Blog | Queso Ventures",
    description:
      "Practical guides for Houston business owners on getting more customers. Food trucks, shops, contractors, and more.",
    images: ["/logo.png"],
  },
};

interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  niche: string;
}

function getPosts(): PostMeta[] {
  const dir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf8");
      const { data } = matter(raw);
      return { slug: filename.replace(/\.mdx$/, ""), ...data } as PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const posts = getPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://quesoventures.com/blog",
    name: "Local Business Growth Blog | Queso Ventures",
    description:
      "Practical guides for Houston business owners on getting more customers from Google and AI search.",
    url: "https://quesoventures.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Queso Ventures",
      url: "https://quesoventures.com",
      logo: { "@type": "ImageObject", url: "https://quesoventures.com/logo.png" },
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `https://quesoventures.com/blog/${post.slug}`,
      datePublished: post.date,
    })),
  };

  return (
    <div className="flex flex-col min-h-screen bg-lightBG dark:bg-darkBG">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-lightText dark:text-darkText mb-4">
            For Houston Business Owners
          </h1>
          <p className="text-lg sm:text-xl text-lightTextMuted dark:text-darkTextMuted font-light mb-12">
            Practical guides on getting more customers.
          </p>

          <div className="space-y-5">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <article className="rounded-2xl border border-lightBorder dark:border-darkBorder bg-white dark:bg-[#151618] p-6 transition-colors group-hover:border-lightButton dark:group-hover:border-darkButton">
                  <p className="text-xs font-semibold uppercase tracking-widest text-lightTextMuted dark:text-darkTextMuted mb-2">
                    {post.niche}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-semibold text-lightText dark:text-darkText mb-2 group-hover:text-lightButton dark:group-hover:text-darkButton transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-base text-lightTextMuted dark:text-darkTextMuted font-light">
                    {post.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
