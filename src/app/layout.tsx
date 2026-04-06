import type { Metadata } from "next";
import { Suez_One } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { heIL } from "@clerk/localizations";
import "./globals.css";

const suezOne = Suez_One({ subsets: ["hebrew"], weight: "400" });

export const metadata: Metadata = {
  title: "מחולל העיתון ההיסטורי",
  description: "כלי לתלמידי הבגרות הגמישה ליצירת עיתון (אישי/שיתופי)",
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
        <head>
          <script src="https://cdn.userway.org/widget.js" data-account="Pbwv4T4to1" async />
        </head>
        <body className={`${suezOne.className} min-h-screen flex flex-col`}>
          <div className="flex-1">{children}</div>
          <footer style={{ background: '#F8EDD4', borderTop: '1px solid #D4A843', padding: '1.2rem 1.5rem', textAlign: 'center' }}>
            <p style={{ color: '#9B7230', fontSize: '0.8rem', fontFamily: 'inherit' }}>
              © {new Date().getFullYear()} כל הזכויות שמורות ליעקב קדם &nbsp;·&nbsp;{' '}
              <a href="mailto:yaacovbod@gmail.com" style={{ color: '#C8860A', textDecoration: 'none' }}>
                yaacovbod@gmail.com
              </a>
              &nbsp;·&nbsp;{' '}
              <a href="/terms" style={{ color: '#C8860A', textDecoration: 'none' }}>
                תנאי שימוש
              </a>
              &nbsp;·&nbsp;{' '}
              <a href="/accessibility" style={{ color: '#C8860A', textDecoration: 'none' }}>
                הצהרת נגישות
              </a>
            </p>
            <p style={{ color: '#B8901A', fontSize: '0.72rem', marginTop: '0.3rem', fontFamily: 'inherit' }}>
              התוכן המיוצר נוצר בבינה מלאכותית — האחריות על השימוש בו חלה על המשתמש בלבד
            </p>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
