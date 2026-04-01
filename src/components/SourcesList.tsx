'use client'

interface Props {
  sources: string[]
  onChange: (sources: string[]) => void
}

export default function SourcesList({ sources, onChange }: Props) {
  function update(index: number, value: string) {
    const next = [...sources]
    next[index] = value
    onChange(next)
  }

  function add() {
    onChange([...sources, ''])
  }

  function remove(index: number) {
    onChange(sources.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      {sources.map((src, i) => (
        <div key={i} className="flex gap-2 items-start">
          <textarea
            value={src}
            onChange={e => update(i, e.target.value)}
            rows={3}
            className="flex-1 px-3 py-2 resize-y text-sm rounded-xl"
            style={{ background: '#0f0f23', border: '1px solid #2a2a4a', color: '#e8e8f0' }}
            placeholder={`מקור ${i + 1} — שם מחבר, שנה, ציטוט...`}
          />
          {sources.length > 1 && (
            <button
              type="button"
              onClick={() => remove(i)}
              className="mt-1 text-lg leading-none hover:opacity-70"
              style={{ color: '#f08080' }}
              aria-label="הסר מקור"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-sm px-4 py-1.5 rounded-xl transition-opacity hover:opacity-80"
        style={{ background: '#2a2a4a', color: '#8ec5fc', border: '1px solid #3a3a6a' }}
      >
        + הוסף מקור
      </button>
    </div>
  )
}
