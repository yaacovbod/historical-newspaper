'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
  text: string
  onReset: () => void
}

export default function OutputDisplay({ text, onReset }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded font-medium transition-opacity hover:opacity-80"
          style={{ background: '#4a7c59', color: '#fff' }}
        >
          {copied ? 'הועתק!' : 'העתק טקסט'}
        </button>
        <button
          onClick={onReset}
          className="px-4 py-2 rounded font-medium transition-opacity hover:opacity-80"
          style={{ background: '#2a2a4a', color: '#c0c0d8', border: '1px solid #3a3a6a' }}
        >
          התחל מחדש
        </button>
      </div>

      <div
        className="rounded-xl p-6 border"
        style={{
          background: '#f5f0e8',
          border: '1px solid #d4c9b0',
          color: '#2c1810',
          lineHeight: '1.9',
          direction: 'rtl',
          textAlign: 'right',
        }}
      >
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <div className="mb-2">
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1a0f08', lineHeight: 1.3 }}>{children}</h1>
              </div>
            ),
            h2: ({ children }) => (
              <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#4a2e1a', marginTop: '0.25rem', marginBottom: '1rem', fontStyle: 'italic' }}>{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#2c1810', marginTop: '1.2rem', marginBottom: '0.4rem' }}>{children}</h3>
            ),
            p: ({ children }) => (
              <p style={{ marginBottom: '0.9rem' }}>{children}</p>
            ),
            strong: ({ children }) => (
              <strong style={{ fontWeight: 700, color: '#1a0f08' }}>{children}</strong>
            ),
            hr: () => (
              <hr style={{ border: 'none', borderTop: '1px solid #c4b99a', margin: '1.5rem 0' }} />
            ),
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  )
}
