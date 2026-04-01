import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}
