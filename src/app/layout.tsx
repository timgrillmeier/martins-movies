import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../styles/_globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Martin's Movies",
  description: "Marvelous movie review madness by Martin himself.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/theme/bootstrap.min.css" />
        <link rel="stylesheet" href="/theme/style.css" />
        <link rel="stylesheet" href="/theme/responsive.css" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
