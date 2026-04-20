import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ui } from "@clerk/ui";
import ConvexClientProvider from "./ConvexClientProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Novyra — Premium Web Design & Development Services",
  description:
    "We craft stunning, high-performance websites and digital experiences that elevate your brand. Custom design, development, and strategy for businesses that demand excellence.",
  keywords:
    "web design, web development, digital agency, custom websites, brand strategy, UI/UX design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        <ClerkProvider ui={ui}>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
