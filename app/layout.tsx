import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Novyra — Premium Web Design & Development Services",
  description:
    "We craft stunning, high-performance websites and digital experiences that elevate your brand. Custom design, development, and strategy for businesses that demand excellence.",
  keywords: "web design, web development, digital agency, custom websites, brand strategy, UI/UX design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: "#ffffff",
              colorBackground: "#0a0a0a",
              colorText: "#ffffff",
              colorTextSecondary: "#a1a1aa",
              borderRadius: "0.75rem",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
