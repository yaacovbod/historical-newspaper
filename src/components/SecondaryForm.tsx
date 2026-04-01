'use client'

import { useState } from 'react'
import { HISTORICAL_CONCEPTS } from '@/lib/concepts'
import type { SecondaryFormData } from '@/lib/types'

interface Props {
  onSubmit: (data: SecondaryFormData) => void
  loading: boolean
}

export default function SecondaryForm({ onSubmit, loading }: Props) {
  const [cluster, setCluster] = useState('')
  const [topic, setTopic] = useState('')
  const [subTopic, setSubTopic] = useState('')
  const [subGenre, setSubGenre] = useState<SecondaryFormData['subGenre']>('interview')
  const [teamSize, setTeamSize] = useState(1)
  const [authorGender, setAuthorGender] = useState<SecondaryFormData['authorGender']>('male')
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([])
  const [sources, setSources] = useState('')

  function toggleConcept(concept: string) {
    setSelectedConcepts(prev =>
      prev.includes(concept) ? prev.filter(c => c !== concept) : [...prev, concept]
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({
      articleType: 'secondary',
      cluster,
      topic,
      subTopic,
      subGenre,
      teamSize,
      authorGender,
      selectedConcepts,
      sources,
    })
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
        <label className="block text-sm font-medium mb-1">נושא / סוגיה (הכתבה הראשית)</label>
        <input
          type="text"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="לדוגמה: הגירת יהודים לארץ ישראל"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">סוגת כתבת המשנה</label>
        <select
          value={subGenre}
          onChange={e => setSubGenre(e.target.value as SecondaryFormData['subGenre'])}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="interview">ראיון</option>
          <option value="opinion">מאמר דעה / פרשנות</option>
          <option value="letter">מכתב למערכת</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">זווית כתבת המשנה</label>
        <input
          type="text"
          value={subTopic}
          onChange={e => setSubTopic(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="לדוגמה: קולה של המהגרת — ראיון עם עולה חדשה"
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
        <label className="block text-sm font-medium mb-2">מושגים לשילוב</label>
        <div className="grid grid-cols-4 gap-2">
          {HISTORICAL_CONCEPTS.map(concept => (
            <label key={concept} className="flex items-center gap-1 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={selectedConcepts.includes(concept)}
                onChange={() => toggleConcept(concept)}
              />
              {concept}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">מקורות</label>
        <textarea
          value={sources}
          onChange={e => setSources(e.target.value)}
          rows={6}
          className="w-full border border-gray-300 rounded px-3 py-2 resize-y"
          placeholder="הדבק כאן את תוכן המקורות שלך (שם מחבר, שנה, ציטוט...)"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'מייצר...' : 'צור כתבת משנה'}
      </button>
    </form>
  )
}
