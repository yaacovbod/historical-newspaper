'use client'

import { useState } from 'react'
import { HISTORICAL_CONCEPTS } from '@/lib/concepts'
import type { NewsFormData } from '@/lib/types'
import SourcesList from './SourcesList'

interface Props {
  onSubmit: (data: NewsFormData) => void
  loading: boolean
}

const inputClass = 'w-full px-3 py-2 rounded-xl text-sm'
const inputStyle = { background: '#0f0f23', border: '1px solid #2a2a4a', color: '#e8e8f0' }
const labelClass = 'block text-sm font-medium mb-1'
const labelStyle = { color: '#c0c0d8' }

export default function NewsForm({ onSubmit, loading }: Props) {
  const [cluster, setCluster] = useState('')
  const [topic, setTopic] = useState('')
  const [teamSize, setTeamSize] = useState(1)
  const [authorGender, setAuthorGender] = useState<NewsFormData['authorGender']>('male')
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([])
  const [sources, setSources] = useState<string[]>([''])

  function toggleConcept(concept: string) {
    setSelectedConcepts(prev =>
      prev.includes(concept) ? prev.filter(c => c !== concept) : [...prev, concept]
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({
      articleType: 'news',
      cluster,
      topic,
      teamSize,
      authorGender,
      selectedConcepts,
      sources: sources.filter(Boolean).join('\n\n---\n\n'),
    })
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
          className={inputClass}
          style={inputStyle}
          placeholder="לדוגמה: תקופת המנדט הבריטי"
        />
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>נושא / סוגיה</label>
        <input
          type="text"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          required
          className={inputClass}
          style={inputStyle}
          placeholder="לדוגמה: הגירת יהודים לארץ ישראל"
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
        <label className={labelClass} style={labelStyle}>מושגים לשילוב</label>
        <div className="grid grid-cols-4 gap-2">
          {HISTORICAL_CONCEPTS.map(concept => (
            <label key={concept} className="flex items-center gap-1 cursor-pointer text-sm" style={{ color: '#c0c0d8' }}>
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
        <label className={labelClass} style={labelStyle}>מקורות</label>
        <SourcesList sources={sources} onChange={setSources} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 rounded-xl font-medium transition-opacity hover:opacity-80 disabled:opacity-40"
        style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff' }}
      >
        {loading ? 'מייצר...' : 'צור כתבה'}
      </button>
    </form>
  )
}
