'use client'

import { useState } from 'react'
import { HISTORICAL_CONCEPTS } from '@/lib/concepts'

interface Props {
  selected: string[]
  onChange: (concepts: string[]) => void
  concepts?: string[]
}

const inputStyle = { background: '#0f0f23', border: '1px solid #2a2a4a', color: '#e8e8f0' }
const labelStyle = { color: '#c0c0d8' }

export default function ConceptsSelector({ selected, onChange, concepts: conceptsProp }: Props) {
  const allConcepts = conceptsProp ?? HISTORICAL_CONCEPTS
  const [customInput, setCustomInput] = useState('')
  const [customConcepts, setCustomConcepts] = useState<string[]>([])

  function toggle(concept: string) {
    onChange(
      selected.includes(concept)
        ? selected.filter(c => c !== concept)
        : [...selected, concept]
    )
  }

  function addCustom() {
    const trimmed = customInput.trim()
    if (!trimmed || customConcepts.includes(trimmed) || allConcepts.includes(trimmed)) return
    setCustomConcepts(prev => [...prev, trimmed])
    onChange([...selected, trimmed])
    setCustomInput('')
  }

  function removeCustom(concept: string) {
    setCustomConcepts(prev => prev.filter(c => c !== concept))
    onChange(selected.filter(c => c !== concept))
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {allConcepts.map(concept => (
          <label key={concept} className="flex items-center gap-1 cursor-pointer text-sm" style={labelStyle}>
            <input
              type="checkbox"
              checked={selected.includes(concept)}
              onChange={() => toggle(concept)}
            />
            {concept}
          </label>
        ))}
      </div>

      {customConcepts.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {customConcepts.map(concept => (
            <span
              key={concept}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs"
              style={{ background: '#1e1e3a', border: '1px solid #4a4a8a', color: '#c0c0d8' }}
            >
              <input
                type="checkbox"
                checked={selected.includes(concept)}
                onChange={() => toggle(concept)}
                className="cursor-pointer"
              />
              {concept}
              <button
                type="button"
                onClick={() => removeCustom(concept)}
                className="mr-1 hover:opacity-60"
                style={{ color: '#9090b0' }}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={customInput}
          onChange={e => setCustomInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCustom())}
          placeholder="הוסף מושג נוסף..."
          className="flex-1 px-3 py-1.5 rounded-xl text-sm"
          style={inputStyle}
        />
        <button
          type="button"
          onClick={addCustom}
          disabled={!customInput.trim()}
          className="px-3 py-1.5 rounded-xl text-sm transition-opacity hover:opacity-80 disabled:opacity-30"
          style={{ background: '#2a2a6a', color: '#c0c0f8', border: '1px solid #4a4a8a' }}
        >
          הוסף
        </button>
      </div>
    </div>
  )
}
