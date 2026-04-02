import type { Metadata } from "next";
import { Suez_One } from "next/font/google";
import "./globals.css";

const suezOne = Suez_One({ subsets: ["hebrew"], weight: "400" });

export const metadata: Metadata = {
  title: "מחולל העיתון ההיסטורי",
  description: "כלי לתלמידי בגרות ליצירת כתבות עיתון היסטוריות",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${suezOne.className} min-h-screen`}>{children}</body>
    </html>
  );
}
