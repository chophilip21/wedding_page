import { Inter } from "next/font/google";
import "../styles/globals.css";
import LanguageDetector from "@/components/LanguageDetector/LanguageDetector";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Karolina & Emanuele",
  description:
    "You are invited to our Wedding | Sei invitato al nostro Matrimonio |  Jesteś zaproszony na nasz Ślub",
  openGraph: {
    title: "A Home Away From Home | Hazeltree Lodge B&B",
    description:
      "You are invited to our Wedding | Sei invitato al nostro Matrimonio |  Jesteś zaproszony na nasz Ślub",
    url: "https://emanuelekarolina.vercel.app/",
    siteName: "Karolina & Emanuele",
    images: [
      {
        url: "https://emanuelekarolina.vercel.app/images/og-image.jpg",
        width: 1200,
        height: 600,
        alt: "Karolina & Emanuele Wedding Website",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" translate="no">
      <body className={inter.className}>
        <LanguageDetector />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
