import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

/**
 * The story, rendered on the server into plain HTML.
 *
 * It is written in the admin's visual editor, which stores a small Markdown
 * subset (bold, italic, links, lists, ## subheadings). In that editor Enter
 * starts a new line, so remark-breaks keeps a single line break a line break
 * here instead of Markdown's usual habit of joining the two lines. Raw HTML in the source is
 * not rendered (react-markdown's default), so a pasted <script> is text.
 * Headings inside a story start at h3: "The Story" is already the h2.
 */
export default function Markdown({ source }: { source: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkBreaks]}
      components={{
        h1: ({ children }) => <h3 className={H}>{children}</h3>,
        h2: ({ children }) => <h3 className={H}>{children}</h3>,
        h3: ({ children }) => <h3 className={H}>{children}</h3>,
        p: ({ children }) => <p className="mt-5 first:mt-0">{children}</p>,
        ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6">{children}</ul>,
        ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6">{children}</ol>,
        strong: ({ children }) => (
          <strong className="font-semibold text-lightText dark:text-darkText">{children}</strong>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target={href?.startsWith("/") ? undefined : "_blank"}
            rel={href?.startsWith("/") ? undefined : "noopener"}
            className="text-lightAccent underline underline-offset-4 dark:text-darkAccent"
          >
            {children}
          </a>
        ),
        img: () => null,
      }}
    >
      {source}
    </ReactMarkdown>
  );
}

const H = "mt-10 text-2xl font-semibold tracking-tight text-lightText dark:text-darkText";
