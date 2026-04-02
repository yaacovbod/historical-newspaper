'use client'

import { useState } from 'react'
import { HISTORICAL_CONCEPTS } from '@/lib/concepts'

interface Props {
  selected: string[]
  onChange: (concepts: string[]) => void
  concepts?: string[]
}

const inputStyle = { background: '#faf7f2', border: '1px solid #c9b99a', color: '#2c1810' }
const labelStyle = { color: '#5c3d1e' }

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
      <div className="flex flex-wrap gap-2">
        {allConcepts.map(concept => {
          const isSelected = selected.includes(concept)
          return (
            <button
              key={concept}
              type="button"
              onClick={() => toggle(concept)}
              className="px-3 py-1 rounded-full text-sm transition-all"
              style={isSelected
                ? { background: '#8b4513', color: '#fff', border: '1px solid #8b4513' }
                : { background: '#faf7f2', color: '#2c1810', border: '1px solid #c9b99a' }
              }
            >
              {concept}
            </button>
          )
        })}
        {customConcepts.map(concept => {
          const isSelected = selected.includes(concept)
          return (
            <span key={concept} className="flex items-center rounded-full text-sm overflow-hidden" style={{ border: `1px solid ${isSelected ? '#8b4513' : '#c9b99a'}` }}>
              <button
                type="button"
                onClick={() => toggle(concept)}
                className="px-3 py-1 transition-all"
                style={isSelected
                  ? { background: '#8b4513', color: '#fff' }
                  : { background: '#faf7f2', color: '#2c1810' }
                }
              >
                {concept}
              </button>
              <button
                type="button"
                onClick={() => removeCustom(concept)}
                className="px-2 py-1 hover:opacity-60 transition-opacity"
                style={{ background: isSelected ? '#7a3a10' : '#f0ebe3', color: isSelected ? '#fff' : '#8a6a50' }}
              >
                ✕
              </button>
            </span>
          )
        })}
      </div>

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
          style={{ background: '#8b4513', color: '#fff', border: 'none' }}
        >
          הוסף
        </button>
      </div>
    </div>
  )
}
