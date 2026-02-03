import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import AboutModal from "components/AboutModal";
import ContactModal from "components/ContactModal";


import "styles/globals.css";

export const metadata: Metadata = {
  title: "Queso Ventures",
  description: "The technical business partner you never had.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preload" href="/about.JPEG" as="image" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-lightAccent dark:bg-darkAccent min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <AboutModal />
          <ContactModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
