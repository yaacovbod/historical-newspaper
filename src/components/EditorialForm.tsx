'use client'

import { useState } from 'react'
import type { EditorialFormData } from '@/lib/types'

interface Props {
  onSubmit: (data: EditorialFormData) => void
  loading: boolean
}

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
        <label className="block text-sm font-medium mb-1">אשכול</label>
        <input
          type="text"
          value={cluster}
          onChange={e => setCluster(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="לדוגמה: תקופת המנדט הבריטי"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">גודל הצוות</label>
        <input
          type="number"
          min={1}
          value={teamSize}
          onChange={e => setTeamSize(Number(e.target.value))}
          required
          className="w-24 border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">מין הכותב</label>
        <div className="flex gap-4">
          {(['male', 'female', 'plural'] as const).map(g => (
            <label key={g} className="flex items-center gap-1 cursor-pointer">
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
        <label className="block text-sm font-medium mb-1">הדבק את הכתבה הראשית שנוצרה</label>
        <textarea
          value={mainArticleText}
          onChange={e => setMainArticleText(e.target.value)}
          rows={8}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 resize-y font-mono text-sm"
          placeholder="הדבק כאן את הכתבה הראשית שנוצרה בשלב הקודם..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">הדבק את כתבת המשנה שנוצרה</label>
        <textarea
          value={secondaryArticleText}
          onChange={e => setSecondaryArticleText(e.target.value)}
          rows={8}
          required
          className="w-full border border-gray-300 rounded px-3 py-2 resize-y font-mono text-sm"
          placeholder="הדבק כאן את כתבת המשנה שנוצרה בשלב הקודם..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'מייצר...' : 'צור דבר עורכים'}
      </button>
    </form>
  )
}
