import type { Metadata } from "next";
import { Suez_One } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { heIL } from "@clerk/localizations";
import "./globals.css";

const suezOne = Suez_One({ subsets: ["hebrew"], weight: "400" });

export const metadata: Metadata = {
  title: "מחולל העיתון ההיסטורי",
  description: "כלי לתלמידי בגרות ליצירת כתבות עיתון היסטוריות",
};

const localization = {
  ...heIL,
  signIn: {
    ...heIL.signIn,
    start: {
      ...heIL.signIn?.start,
      title: "כניסה למחולל העיתון ההיסטורי",
      subtitle: undefined,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={localization}>
      <html lang="he" dir="rtl">
        <body className={`${suezOne.className} min-h-screen`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
