import type { Metadata } from "next";
import { Roboto, Nanum_Pen_Script } from "next/font/google";

import cn from "@/front-end/utils/cn";
import Providers from "@/front-end/context/providers";

import Auth from "@/front-end/features/auth/components/Auth";

import "./globals.css";

const nanumPenScript = Nanum_Pen_Script({
  weight: ["400"],
  variable: "--font-nanum-pen-script",
  subsets: ["latin"],
  fallback: ["cursive"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "900"],
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Pawsitive Play | PawTime",
  description:
    "A pet play café and activity center where people can come to play, cuddle, train, or even participate in games with dogs and cats — without owning one. Perfect for those who love animals but can't keep pets due to lifestyle, allergies, housing rules, or time constraints.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(nanumPenScript.variable, roboto.variable, "antialiased")}
      >
        <Providers>
          {children}
          <Auth />
        </Providers>
      </body>
    </html>
  );
}
