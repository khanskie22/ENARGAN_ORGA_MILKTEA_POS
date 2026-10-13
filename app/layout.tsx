import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Cup POS",
  description: "A simple point-of-sale system for a campus milk tea stall.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

