'use client'

import { useState } from 'react'
import type { NewsFormData } from '@/lib/types'
import SourcesList from './SourcesList'
import ConceptsSelector from './ConceptsSelector'

interface Props {
  onSubmit: (data: NewsFormData) => void
  loading: boolean
  concepts?: string[]
  clusterTitle: string
}

const inputClass = 'w-full px-3 py-2 rounded-xl text-sm'
const inputStyle = { background: '#faf7f2', border: '1px solid #c9b99a', color: '#2c1810' }
const labelClass = 'block text-sm font-medium mb-1'
const labelStyle = { color: '#5c3d1e' }

export default function NewsForm({ onSubmit, loading, concepts, clusterTitle }: Props) {
  const [topic, setTopic] = useState('')
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([])
  const [sources, setSources] = useState<string[]>([''])
  const [notes, setNotes] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({
      articleType: 'news',
      cluster: clusterTitle,
      topic,
      selectedConcepts,
      sources: sources.filter(Boolean).join('\n\n---\n\n'),
      notes: notes || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        <label className={labelClass} style={labelStyle}>מושגים לשילוב</label>
        <ConceptsSelector selected={selectedConcepts} onChange={setSelectedConcepts} concepts={concepts} />
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>מקורות</label>
        <SourcesList sources={sources} onChange={setSources} />
      </div>

      <div>
        <label className={labelClass} style={labelStyle}>הערות נוספות <span style={{ fontWeight: 400, color: '#8a6a50' }}>(אופציונלי)</span></label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 rounded-xl text-sm resize-y"
          style={inputStyle}
          placeholder="הוראות מיוחדות, הדגשות, בקשות ספציפיות..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 rounded-xl font-medium transition-opacity hover:opacity-80 disabled:opacity-40"
        style={{ background: '#8b4513', color: '#fff' }}
      >
        {loading ? 'מייצר...' : 'צור כתבה'}
      </button>
    </form>
  )
}
