/**
 * @file layout.js
 * @description Defines the global layout structure for the website, including providers and components like LanguageDetector and Toaster.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import { Inter } from "next/font/google";
import "../styles/globals.css";
import LanguageDetector from "@/components/LanguageDetector/LanguageDetector";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

// Metadata configuration (nice for social sharing)
export const metadata = {
  title: "Tamako & Philip",
  description:
    "You are invited to our Wedding | Sei invitato al nostro Matrimonio |  Jesteś zaproszony na nasz Ślub",
  openGraph: {
    title: "Tamako & Philip",
    description:
      "You are invited to our Wedding | Sei invitato al nostro Matrimonio |  Jesteś zaproszony na nasz Ślub",
    url: "https://emanuelekarolina.vercel.app/",
    siteName: "Tamako & Philip",
    images: [
      {
        url: "https://emanuelekarolina.vercel.app/images/og-image.jpg",
        width: 1200,
        height: 600,
        alt: "Tamako & Philip Wedding Website",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" translate="no">
      <body className={inter.className}>
        {/* Component to auto-detect and manage language */}
        <LanguageDetector />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
