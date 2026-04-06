'use client'

import { useState } from 'react'
import { useSession } from '@clerk/nextjs'

export default function AccessForm() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { session } = useSession()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/verify-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })

    if (res.ok) {
      await session?.reload()
      window.location.href = '/'
    } else {
      const data = await res.json()
      setError(data.error || 'שגיאה')
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
          maxWidth: '360px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🗞️</div>
        <h1 style={{ color: '#2c1810', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
          כניסה לאתר
        </h1>
        <p style={{ color: '#5c3d1e', fontSize: '0.9rem', marginBottom: '1.8rem' }}>
          הכנס את קוד הגישה שקיבלת מהמורה
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="קוד גישה"
            required
            style={{
              padding: '0.75rem 1rem',
              border: error ? '1px solid #c0392b' : '1px solid #c9b99a',
              borderRadius: '0.75rem',
              background: '#faf7f2',
              color: '#2c1810',
              fontSize: '1rem',
              textAlign: 'center',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />

          {error && (
            <p style={{ color: '#c0392b', fontSize: '0.85rem', margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !code}
            style={{
              padding: '0.75rem',
              background: loading || !code ? '#c9b99a' : '#8b4513',
              color: '#fff',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              cursor: loading || !code ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {loading ? 'בודק...' : 'כניסה'}
          </button>
        </form>
      </div>
    </div>
  )
}
