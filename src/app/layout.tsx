import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "./providers";
import MyNav from "@/components/MyNav";

export const metadata: Metadata = {
  title: "Math Sandbox",
  description: "Interactive math sandbox for learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MyNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
