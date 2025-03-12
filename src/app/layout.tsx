import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import '../styles/globals.scss';

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
  weight: ["100", "400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Загальний заголовок для сайту",
  description: "Це загальний опис для всього сайту.",
  keywords: "React, Next.js, сайт"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${roboto.variable}`}>
        {children}
      </body>
    </html>
  );
}
