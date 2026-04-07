'use client'

import { useState } from 'react'
import { HISTORICAL_CONCEPTS } from '@/lib/concepts'

interface Props {
  selected: string[]
  onChange: (concepts: string[]) => void
  concepts?: string[]
}

const MAX_CONCEPTS = 4
const inputStyle = { background: '#faf7f2', border: '1px solid #c9b99a', color: '#2c1810' }

export default function ConceptsSelector({ selected, onChange, concepts: conceptsProp }: Props) {
  const allConcepts = conceptsProp ?? HISTORICAL_CONCEPTS
  const [customInput, setCustomInput] = useState('')
  const [customConcepts, setCustomConcepts] = useState<string[]>([])

  const isMaxReached = selected.length >= MAX_CONCEPTS

  function toggle(concept: string) {
    if (selected.includes(concept)) {
      onChange(selected.filter(c => c !== concept))
    } else if (!isMaxReached) {
      onChange([...selected, concept])
    }
  }

  function addCustom() {
    const trimmed = customInput.trim()
    if (!trimmed || customConcepts.includes(trimmed) || allConcepts.includes(trimmed) || isMaxReached) return
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
      <div className="flex items-center justify-between mb-1">
        <span style={{ fontSize: '0.8rem', color: isMaxReached ? '#8b4513' : '#8a6a50', fontWeight: isMaxReached ? 700 : 400 }}>
          {isMaxReached ? 'הגעת למקסימום (4/4)' : `נבחרו ${selected.length} מתוך עד 4 מושגים`}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {allConcepts.map(concept => {
          const isSelected = selected.includes(concept)
          return (
            <button
              key={concept}
              type="button"
              onClick={() => toggle(concept)}
              disabled={!isSelected && isMaxReached}
              className="px-3 py-1 rounded-full text-sm transition-all"
              style={isSelected
                ? { background: '#8b4513', color: '#fff', border: '1px solid #8b4513' }
                : isMaxReached
                  ? { background: '#f0ebe3', color: '#b8a898', border: '1px solid #e0d5c5', cursor: 'not-allowed' }
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
          placeholder={isMaxReached ? 'הגעת למקסימום מושגים' : 'הוסף מושג נוסף...'}
          disabled={isMaxReached}
          className="flex-1 px-3 py-1.5 rounded-xl text-sm"
          style={isMaxReached ? { ...inputStyle, opacity: 0.4, cursor: 'not-allowed' } : inputStyle}
        />
        <button
          type="button"
          onClick={addCustom}
          disabled={!customInput.trim() || isMaxReached}
          className="px-3 py-1.5 rounded-xl text-sm transition-opacity hover:opacity-80 disabled:opacity-30"
          style={{ background: '#8b4513', color: '#fff', border: 'none' }}
        >
          הוסף
        </button>
      </div>
    </div>
  )
}
