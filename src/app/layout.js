// src/app/layout.js

import { Inter } from "next/font/google";
import "../styles/globals.css";
import ClientProviders from "./ClientProviders"; // adjust the path if needed

const inter = Inter({ subsets: ["latin"] });

// Metadata configuration (for server components)
export const metadata = {
  title: "Tamako & Philip",
  description:
    "You are invited to our Wedding | 결혼식에 초대합니다 | 結婚式に招待します",
  openGraph: {
    title: "Tamako & Philip",
    description:
      "You are invited to our Wedding | 결혼식에 초대합니다 | 結婚式に招待します",
    url: "https://wedding-page-sable.vercel.app",
    siteName: "Tamako & Philip",
    images: [
      {
        url: "https://wedding-page-sable.vercel.app/images/welcome_1.jpg",
        width: 1200,
        height: 600,
        alt: "Tamako & Philip Wedding Website",
      },
    ],
    type: "website",
  },
  robots: { index: false, follow: false },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-32x32.png',
    apple: '/favicon/apple-touch-icon.png',
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
