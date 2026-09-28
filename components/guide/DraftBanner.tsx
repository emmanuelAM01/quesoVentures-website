/** Across the top of any article rendered in draft mode. Impossible to miss on purpose. */
export default function DraftBanner({ path, status }: { path: string; status: string }) {
  return (
    <div className="sticky top-[76px] z-40 bg-gialloOrion text-[#101216]">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-base font-semibold">
        <span>Draft preview. Status: {status}. Only you can see this.</span>
        <a
          href={`/api/guide/preview?exit=1&to=${encodeURIComponent(path)}`}
          className="underline underline-offset-4"
        >
          Exit preview
        </a>
      </div>
    </div>
  );
}
