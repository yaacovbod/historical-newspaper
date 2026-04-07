'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
  text: string
  onReset: () => void
  onRefine: (note: string) => Promise<void>
  onSave: () => Promise<void>
  refining: boolean
}

export default function OutputDisplay({ text, onReset, onRefine, onSave, refining }: Props) {
  const [copied, setCopied] = useState(false)
  const [refinementNote, setRefinementNote] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleRefine() {
    if (!refinementNote.trim()) return
    await onRefine(refinementNote)
    setRefinementNote('')
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    await onSave()
    setSaving(false)
    setSaved(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={handleSave}
          disabled={saving || saved}
          className="px-4 py-2 rounded font-medium transition-opacity hover:opacity-80 disabled:opacity-60"
          style={{ background: saved ? '#5a7a3a' : '#C8860A', color: '#fff' }}
        >
          {saving ? 'שומר...' : saved ? 'נשמר!' : 'שמור כתבה'}
        </button>
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded font-medium transition-opacity hover:opacity-80"
          style={{ background: '#7A6A2A', color: '#fff' }}
        >
          {copied ? 'הועתק!' : 'העתק טקסט'}
        </button>
        <button
          onClick={onReset}
          className="px-4 py-2 rounded font-medium transition-opacity hover:opacity-80"
          style={{ background: '#F8EDD4', color: '#2C1A00', border: '1px solid #D4A843' }}
        >
          התחל מחדש
        </button>
      </div>

      <div
        className="rounded-xl p-6 border"
        style={{
          background: '#F8EDD4',
          border: '1px solid #D4A843',
          color: '#2C1A00',
          lineHeight: '1.9',
          direction: 'rtl',
          textAlign: 'right',
        }}
      >
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <div className="mb-2">
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1A0F00', lineHeight: 1.3 }}>{children}</h1>
              </div>
            ),
            h2: ({ children }) => (
              <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#6B4510', marginTop: '0.25rem', marginBottom: '1rem', fontStyle: 'italic' }}>{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#2C1A00', marginTop: '1.2rem', marginBottom: '0.4rem' }}>{children}</h3>
            ),
            p: ({ children }) => (
              <p style={{ marginBottom: '0.9rem' }}>{children}</p>
            ),
            strong: ({ children }) => (
              <strong style={{ fontWeight: 700, color: '#1A0F00' }}>{children}</strong>
            ),
            hr: () => (
              <hr style={{ border: 'none', borderTop: '1px solid #D4A843', margin: '1.5rem 0' }} />
            ),
          }}
        >
          {text}
        </ReactMarkdown>
      </div>

      {/* אזור שיפור */}
      <div className="rounded-xl p-5" style={{ background: '#FFFAEE', border: '1px solid #D4A843' }}>
        <p className="text-sm font-medium mb-2" style={{ color: '#6B4510' }}>
          רוצה לשפר את הכתבה?
        </p>
        <div className="flex gap-2">
          <textarea
            value={refinementNote}
            onChange={e => setRefinementNote(e.target.value)}
            rows={2}
            disabled={refining}
            className="flex-1 px-3 py-2 rounded-xl text-sm resize-none"
            style={{ background: '#FDF7E4', border: '1px solid #D4A843', color: '#2C1A00' }}
            placeholder='למשל: "קצר את הכתבה", "הוסף ציטוט מהמקור הראשון", "שנה את הטון לרשמי יותר"...'
          />
          <button
            onClick={handleRefine}
            disabled={refining || !refinementNote.trim()}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-40 self-end"
            style={{ background: '#C8860A', color: '#fff' }}
          >
            {refining ? 'משפר...' : 'שפר'}
          </button>
        </div>
      </div>
    </div>
  )
}
