import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
    >
      <SignIn
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
            headerTitle: {
              color: '#2c1810',
              fontSize: '1.4rem',
            },
            formButtonPrimary: {
              backgroundColor: '#8b4513',
              '&:hover': { backgroundColor: '#7a3b10' },
            },
            footerActionLink: {
              color: '#8b4513',
              fontWeight: '700',
            },
          },
        }}
      />
    </div>
  )
}
