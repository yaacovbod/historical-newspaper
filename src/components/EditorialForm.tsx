'use client'

import { useState } from 'react'
import type { EditorialFormData } from '@/lib/types'

interface Props {
  onSubmit: (data: EditorialFormData) => void
  loading: boolean
  clusterTitle: string
}

const inputStyle = { background: '#0f0f23', border: '1px solid #2a2a4a', color: '#e8e8f0' }
const labelClass = 'block text-sm font-medium mb-1'
const labelStyle = { color: '#c0c0d8' }

export default function EditorialForm({ onSubmit, loading, clusterTitle }: Props) {
  const [teamSize, setTeamSize] = useState(1)
  const [authorGender, setAuthorGender] = useState<EditorialFormData['authorGender']>('male')
  const [mainArticleText, setMainArticleText] = useState('')
  const [secondaryArticleTexts, setSecondaryArticleTexts] = useState<string[]>([''])

  function handleTeamSizeChange(val: number) {
    const size = Math.max(1, val)
    setTeamSize(size)
    setSecondaryArticleTexts(prev => {
      const next = [...prev]
      while (next.length < size) next.push('')
      return next.slice(0, size)
    })
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
    onSubmit({ articleType: 'editorial', cluster: clusterTitle, teamSize, authorGender, mainArticleText, secondaryArticleTexts })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClass} style={labelStyle}>גודל הצוות</label>
        <input
          type="number"
          min={1}
          value={teamSize}
          onChange={e => handleTeamSizeChange(Number(e.target.value))}
          required
          className="w-24 px-3 py-2 rounded-xl text-sm"
          style={inputStyle}
        />
        <p className="text-xs mt-1" style={{ color: '#6060a0' }}>מספר כתבות המשנה יתאים לגודל הצוות</p>
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>מין הכותב</label>
        <div className="flex gap-4">
          {(['male', 'female', 'plural'] as const).map(g => (
            <label key={g} className="flex items-center gap-1 cursor-pointer text-sm" style={{ color: '#c0c0d8' }}>
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
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>הדבק את הכתבה הראשית שנוצרה</label>
        <textarea
          value={mainArticleText}
          onChange={e => setMainArticleText(e.target.value)}
          rows={8}
          required
          className="w-full px-3 py-2 rounded-xl resize-y font-mono text-sm"
          style={inputStyle}
          placeholder="הדבק כאן את הכתבה הראשית שנוצרה בשלב הקודם..."
        />
      </div>

      <div className="space-y-4">
        <label className={labelClass} style={labelStyle}>
          כתבות משנה ({secondaryArticleTexts.length})
        </label>
        {secondaryArticleTexts.map((text, i) => (
          <div key={i}>
            <p className="text-xs mb-1" style={{ color: '#6060a0' }}>כתבת משנה {i + 1}</p>
            <textarea
              value={text}
              onChange={e => updateSecondary(i, e.target.value)}
              rows={8}
              required
              className="w-full px-3 py-2 rounded-xl resize-y font-mono text-sm"
              style={inputStyle}
              placeholder={`הדבק כאן את כתבת המשנה ${i + 1}...`}
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 rounded-xl font-medium transition-opacity hover:opacity-80 disabled:opacity-40"
        style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)', color: '#0f0f23' }}
      >
        {loading ? 'מייצר...' : 'צור דבר עורכים'}
      </button>
    </form>
  )
}
