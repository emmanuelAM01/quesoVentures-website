import Footer from "components/Footer";
import Clarity from "components/guide/Clarity";

/**
 * Every guide page shares the site header (root layout), this ground, and the
 * site footer. Clarity is loaded here and not site wide: the guide is what its
 * heatmaps are for, and the rest of the site should not pay for a script it
 * has no use for.
 */
export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-lightBG dark:bg-darkBG">
      <main className="flex-1">{children}</main>
      <Footer />
      <Clarity />
    </div>
  );
}
