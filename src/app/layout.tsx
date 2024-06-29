import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@aws-amplify/ui-react/styles.css";

export const metadata: Metadata = {
  title: "ほけん塾 営業成績管理",
  description: "Hoken juku Sales Performance management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
