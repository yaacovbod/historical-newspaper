'use client'

import { useState } from 'react'
import type { EditorialFormData } from '@/lib/types'

interface Props {
  onSubmit: (data: EditorialFormData) => void
  loading: boolean
}

const inputStyle = { background: '#0f0f23', border: '1px solid #2a2a4a', color: '#e8e8f0' }
const labelClass = 'block text-sm font-medium mb-1'
const labelStyle = { color: '#c0c0d8' }

export default function EditorialForm({ onSubmit, loading }: Props) {
  const [cluster, setCluster] = useState('')
  const [teamSize, setTeamSize] = useState(1)
  const [authorGender, setAuthorGender] = useState<EditorialFormData['authorGender']>('male')
  const [mainArticleText, setMainArticleText] = useState('')
  const [secondaryArticleText, setSecondaryArticleText] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ articleType: 'editorial', cluster, teamSize, authorGender, mainArticleText, secondaryArticleText })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClass} style={labelStyle}>אשכול</label>
        <input
          type="text"
          value={cluster}
          onChange={e => setCluster(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-xl text-sm"
          style={inputStyle}
          placeholder="לדוגמה: תקופת המנדט הבריטי"
        />
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>גודל הצוות</label>
        <input
          type="number"
          min={1}
          value={teamSize}
          onChange={e => setTeamSize(Number(e.target.value))}
          required
          className="w-24 px-3 py-2 rounded-xl text-sm"
          style={inputStyle}
        />
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

      <div>
        <label className={labelClass} style={labelStyle}>הדבק את כתבת המשנה שנוצרה</label>
        <textarea
          value={secondaryArticleText}
          onChange={e => setSecondaryArticleText(e.target.value)}
          rows={8}
          required
          className="w-full px-3 py-2 rounded-xl resize-y font-mono text-sm"
          style={inputStyle}
          placeholder="הדבק כאן את כתבת המשנה שנוצרה בשלב הקודם..."
        />
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
