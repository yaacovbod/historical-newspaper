'use client'

import { useState } from 'react'
import type { EditorialFormData } from '@/lib/types'

interface Props {
  onSubmit: (data: EditorialFormData) => void
  loading: boolean
  clusterTitle: string
}

const inputStyle = { background: '#faf7f2', border: '1px solid #c9b99a', color: '#2c1810' }
const labelClass = 'block text-sm font-medium mb-1'
const labelStyle = { color: '#5c3d1e' }

export default function EditorialForm({ onSubmit, loading, clusterTitle }: Props) {
  const [authorGender, setAuthorGender] = useState<EditorialFormData['authorGender']>('male')
  const [pluralGender, setPluralGender] = useState<'male' | 'female'>('male')
  const [mainArticleText, setMainArticleText] = useState('')
  const [secondaryArticleTexts, setSecondaryArticleTexts] = useState<string[]>([''])
  const [notes, setNotes] = useState('')

  function addSecondary() {
    setSecondaryArticleTexts(prev => [...prev, ''])
  }

  function removeSecondary(index: number) {
    setSecondaryArticleTexts(prev => prev.filter((_, i) => i !== index))
  }

  function updateSecondary(index: number, value: string) {
    setSecondaryArticleTexts(prev => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ articleType: 'editorial', cluster: clusterTitle, authorGender, pluralGender: authorGender === 'plural' ? pluralGender : undefined, mainArticleText, secondaryArticleTexts, notes: notes || undefined })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClass} style={labelStyle}>מין הכותב</label>
        <div className="flex gap-4">
          {(['male', 'female', 'plural'] as const).map(g => (
            <label key={g} className="flex items-center gap-1 cursor-pointer text-sm" style={{ color: '#5c3d1e' }}>
              <input
                type="radio"
                name="authorGender"
                value={g}
                checked={authorGender === g}
                onChange={() => setAuthorGender(g)}
              />
              {g === 'male' ? 'זכר' : g === 'female' ? 'נקבה' : 'צוות'}
            </label>
          ))}
        </div>
        {authorGender === 'plural' && (
          <div className="flex gap-4 mt-2">
            {(['male', 'female'] as const).map(pg => (
              <label key={pg} className="flex items-center gap-1 cursor-pointer text-sm" style={{ color: '#5c3d1e' }}>
                <input
                  type="radio"
                  name="pluralGender"
                  value={pg}
                  checked={pluralGender === pg}
                  onChange={() => setPluralGender(pg)}
                />
                {pg === 'male' ? 'רבים' : 'רבות'}
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>כתבה ראשית</label>
        <p className="text-xs mb-2" style={{ color: '#8a6a50' }}>הדביקו את הכתבה הראשית שיצרת בשלב הקודם בכלי זה</p>
        <textarea
          value={mainArticleText}
          onChange={e => setMainArticleText(e.target.value)}
          rows={8}
          required
          className="w-full px-3 py-2 rounded-xl resize-y font-mono text-sm"
          style={inputStyle}
          placeholder="הדביקו כאן את הכתבה הראשית שנוצרה..."
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className={labelClass} style={{ ...labelStyle, marginBottom: 0 }}>
              כתבות משנה {secondaryArticleTexts.length > 0 && `(${secondaryArticleTexts.length})`}
            </label>
            <p className="text-xs mt-0.5" style={{ color: '#8a6a50' }}>הדביקו את הכתבות המשניות שיצרת בשלבים הקודמים</p>
          </div>
          <button
            type="button"
            onClick={addSecondary}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
            style={{ background: '#8b4513', color: '#fff' }}
          >
            + הוסף כתבת משנה
          </button>
        </div>
        {secondaryArticleTexts.length === 0 && (
          <p className="text-sm" style={{ color: '#8a6a50' }}>לחץ על הכפתור להוספת כתבת משנה</p>
        )}
        {secondaryArticleTexts.map((text, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs" style={{ color: '#6060a0' }}>כתבת משנה {i + 1}</p>
              <button
                type="button"
                onClick={() => removeSecondary(i)}
                className="text-xs hover:underline"
                style={{ color: '#c0392b' }}
              >
                הסר
              </button>
            </div>
            <textarea
              value={text}
              onChange={e => updateSecondary(i, e.target.value)}
              rows={8}
              required
              className="w-full px-3 py-2 rounded-xl resize-y font-mono text-sm"
              style={inputStyle}
              placeholder={`הדביקו כאן את כתבת המשנה ${i + 1} שנוצרה...`}
            />
          </div>
        ))}
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>הערות נוספות <span style={{ fontWeight: 400, color: '#8a6a50' }}>(אופציונלי)</span></label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={3}
          maxLength={500}
          className="w-full px-3 py-2 rounded-xl text-sm resize-y"
          style={inputStyle}
          placeholder="הוראות מיוחדות, הדגשות, בקשות ספציפיות..."
        />
        <div className="text-left text-xs mt-0.5" style={{ color: notes.length > 400 ? '#c0392b' : '#8a6a50' }}>
          {notes.length}/500
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 rounded-xl font-medium transition-opacity hover:opacity-80 disabled:opacity-40"
        style={{ background: '#8b4513', color: '#fff' }}
      >
        {loading ? 'מייצר...' : 'צור דבר עורכים'}
      </button>
    </form>
  )
}
