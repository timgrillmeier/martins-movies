import type { Metadata } from "next"
import "../styles/_globals.css"

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
        <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/theme/bootstrap.min.css" />
        <link rel="stylesheet" href="/theme/style.css" />
        <link rel="stylesheet" href="/theme/responsive.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
