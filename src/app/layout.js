import { Inter } from "next/font/google";
import "../styles/globals.css";
import LanguageDetector from "@/components/LanguageDetector/LanguageDetector";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Emanuele & Karolina",
  description:
    "Join us for our special day | Unisciti a noi per il nostro giorno speciale | Dołącz do nas w tym wyjątkowym dniu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" translate="no">
      <body className={inter.className}>
        <LanguageDetector />
        {children}
      </body>
    </html>
  );
}
