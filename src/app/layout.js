// src/app/layout.js

import { Inter } from "next/font/google";
import "../styles/globals.css";
import ClientProviders from "./ClientProviders"; // adjust the path if needed

const inter = Inter({ subsets: ["latin"] });

// Metadata configuration (for server components)
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
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
