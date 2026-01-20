import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
//If mobile, render contact page, if not show contact popup


export default function Header() {
  return (
    <header className="bg-white dark:bg-[#462E00] shadow-sm dark:border-b dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl dark:text-gray-100 hover:text-darkMain dark:hover:text-lightBG">
            <Link 
              href="/"
            >
              Queso Ventures
            </Link>
          </span>
        </div>
        <nav className="flex items-center">
          <ul className="flex space-x-2 mr-2">
            <li>
              <Link
                href="#about-popup"
                className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#contact-popup"
                className="text-sm text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
          <ThemeSwitch />
        </nav>
      </div>
    </header>
  );
}
