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
        <body className={`${suezOne.className} min-h-screen flex flex-col`}>
          <div className="flex-1">{children}</div>
          <footer style={{ background: '#f5f0e8', borderTop: '1px solid #c9b99a', padding: '1.2rem 1.5rem', textAlign: 'center' }}>
            <p style={{ color: '#8a6a50', fontSize: '0.8rem', fontFamily: 'inherit' }}>
              © {new Date().getFullYear()} כל הזכויות שמורות ליעקב קדם &nbsp;·&nbsp;{' '}
              <a href="mailto:yaacovbod@gmail.com" style={{ color: '#8b4513', textDecoration: 'none' }}>
                yaacovbod@gmail.com
              </a>
              &nbsp;·&nbsp;{' '}
              <a href="/terms" style={{ color: '#8b4513', textDecoration: 'none' }}>
                תנאי שימוש
              </a>
            </p>
            <p style={{ color: '#b0956e', fontSize: '0.72rem', marginTop: '0.3rem', fontFamily: 'inherit' }}>
              התוכן המיוצר נוצר בבינה מלאכותית — האחריות על השימוש בו חלה על המשתמש בלבד
            </p>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
