import Link from "next/link";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-lightBG border-t border-gray-100 dark:bg-darkBG shadow-sm text-lightText dark:text-darkText py-6 dark:border-t dark:border-gray-800">
      <div className="container mx-auto px-4 flex flex-col items-center gap-3 text-sm">
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/quesoventures"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:opacity-70 transition-opacity"
          >
            <AiOutlineInstagram size={22} />
          </a>
          <a
            href="https://youtube.com/@quesoventures"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:opacity-70 transition-opacity"
          >
            <AiOutlineYoutube size={22} />
          </a>
        </div>
        <div className="flex items-center gap-4 text-lightTextMuted dark:text-darkTextMuted">
          <Link href="/privacy" className="hover:opacity-70 transition-opacity">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:opacity-70 transition-opacity">
            Terms &amp; Conditions
          </Link>
        </div>
        <p>&copy; {currentYear} Queso Ventures LLC</p>
      </div>
    </footer>
  );
};

export default Footer;