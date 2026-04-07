'use client'

import { useState } from 'react'

export default function TermsAcceptForm() {
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleAccept() {
    if (!agreed) return
    setLoading(true)

    const res = await fetch('/api/accept-terms', { method: 'POST' })

    if (res.ok) {
      window.location.href = '/'
    } else {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFDF7',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          background: '#fff',
          border: '1px solid #c9b99a',
          borderRadius: '1rem',
          boxShadow: '0 4px 24px rgba(44,24,16,0.14)',
          padding: '2.5rem 2rem',
          maxWidth: '460px',
          width: '100%',
          direction: 'rtl',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🗞️</div>
          <h1 style={{ color: '#2c1810', fontSize: '1.4rem', marginBottom: '0.4rem' }}>
            תנאי שימוש
          </h1>
          <p style={{ color: '#5c3d1e', fontSize: '0.9rem' }}>
            לפני שמתחילים, נא לאשר את תנאי השימוש
          </p>
        </div>

        <div
          style={{
            background: '#faf7f2',
            border: '1px solid #e0d5c5',
            borderRadius: '0.75rem',
            padding: '1rem 1.2rem',
            marginBottom: '1.5rem',
            fontSize: '0.88rem',
            color: '#3d2510',
            lineHeight: '1.8',
          }}
        >
          <p style={{ marginBottom: '0.6rem' }}>
            <strong>התוכן המיוצר</strong> נוצר באמצעות בינה מלאכותית ועשוי להכיל אי-דיוקים.
            האחריות לבחינת התוכן ולשימוש בו חלה על המשתמש בלבד.
          </p>
          <p style={{ marginBottom: '0.6rem' }}>
            <strong>הכתבות שלך</strong> נשמרות בשרת מאובטח ומקושרות לחשבונך. מנהל האתר עשוי לגשת לנתונים לצורכי תחזוקה.
          </p>
          <p style={{ margin: 0 }}>
            <strong>שימוש מסחרי</strong> בכלי זה אסור ללא אישור בכתב מראש.
          </p>
        </div>

        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.6rem',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            color: '#2c1810',
          }}
        >
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            style={{ marginTop: '2px', accentColor: '#8b4513', width: '16px', height: '16px', flexShrink: 0 }}
          />
          <span>
            קראתי ואני מסכים/ה ל
            <a href="/terms" target="_blank" style={{ color: '#8b4513', fontWeight: 700 }}>
              תנאי השימוש
            </a>
          </span>
        </label>

        <button
          onClick={handleAccept}
          disabled={!agreed || loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: !agreed || loading ? '#c9b99a' : '#8b4513',
            color: '#fff',
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            cursor: !agreed || loading ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {loading ? 'שומר...' : 'אני מסכים/ה, המשך'}
        </button>
      </div>
    </div>
  )
}
