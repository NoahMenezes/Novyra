import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Novyra",
  description:
    "Know it then all. Pioneering ideas for minds that create, build, and inspire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  );
}
