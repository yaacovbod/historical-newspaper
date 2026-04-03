import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 gap-4">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: '#8b4513',
            colorBackground: '#fffdf7',
            colorInputBackground: '#faf7f2',
            colorText: '#2c1810',
            colorTextSecondary: '#5c3d1e',
            colorInputText: '#2c1810',
            colorNeutral: '#8a6a50',
            borderRadius: '0.75rem',
            fontFamily: 'inherit',
            fontSize: '1rem',
          },
          elements: {
            card: {
              border: '1px solid #c9b99a',
              boxShadow: '0 4px 24px rgba(44,24,16,0.14)',
            },
            formButtonPrimary: {
              backgroundColor: '#8b4513',
            },
            footerActionLink: {
              color: '#8b4513',
              fontWeight: '700',
            },
          },
        }}
      />
      <p style={{ fontSize: '0.8rem', color: '#8a6a50', textAlign: 'center', maxWidth: '320px' }}>
        בהרשמה אתה מסכים ל
        <Link href="/terms" style={{ color: '#8b4513', fontWeight: 700, marginRight: '2px', marginLeft: '2px' }}>
          תנאי השימוש
        </Link>
        ומאשר שהאחריות על שימוש בתוכן המיוצר חלה עליך בלבד.
      </p>
    </div>
  )
}
