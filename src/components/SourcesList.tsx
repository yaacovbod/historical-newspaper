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
          <div className="flex-1">
            <textarea
              value={src}
              onChange={e => update(i, e.target.value)}
              rows={3}
              maxLength={2500}
              className="w-full px-3 py-2 resize-y text-sm rounded-xl"
              style={{ background: '#faf7f2', border: '1px solid #c9b99a', color: '#2c1810' }}
              placeholder={`מקור ${i + 1} — שם מחבר, שנה, ציטוט...`}
            />
            <div className="text-left text-xs mt-0.5" style={{ color: src.length > 2200 ? '#c0392b' : '#8a6a50' }}>
              {src.length}/2500
            </div>
          </div>
          {sources.length > 1 && (
            <button
              type="button"
              onClick={() => remove(i)}
              className="mt-1 text-lg leading-none hover:opacity-70"
              style={{ color: '#8b4513' }}
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
        style={{ background: '#f5f0e8', color: '#8b4513', border: '1px solid #c9b99a' }}
      >
        + הוסף מקור
      </button>
    </div>
  )
}
