'use client'

interface Props {
  sources: string[]
  onChange: (sources: string[]) => void
  maxSources?: number
  maxTotalChars?: number
}

export default function SourcesList({ sources, onChange, maxSources = 4, maxTotalChars = 20000 }: Props) {
  const totalChars = sources.reduce((sum, s) => sum + s.length, 0)
  const remaining = maxTotalChars - totalChars

  function update(index: number, value: string) {
    const otherChars = sources.reduce((sum, s, i) => i === index ? sum : sum + s.length, 0)
    const allowed = maxTotalChars - otherChars
    const next = [...sources]
    next[index] = value.slice(0, allowed)
    onChange(next)
  }

  function add() {
    if (sources.length >= maxSources) return
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
              className="w-full px-3 py-2 resize-y text-sm rounded-xl"
              style={{ background: '#faf7f2', border: '1px solid #c9b99a', color: '#2c1810' }}
              placeholder={`מקור ${i + 1} — שם מחבר, שנה, ציטוט...`}
            />
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
      <div className="flex items-center justify-between">
        {sources.length < maxSources ? (
          <button
            type="button"
            onClick={add}
            disabled={remaining <= 0}
            className="text-sm px-4 py-1.5 rounded-xl transition-opacity hover:opacity-80 disabled:opacity-40"
            style={{ background: '#f5f0e8', color: '#8b4513', border: '1px solid #c9b99a' }}
          >
            + הוסף מקור ({sources.length}/{maxSources})
          </button>
        ) : (
          <p className="text-xs" style={{ color: '#8a6a50' }}>הגעת למקסימום {maxSources} מקורות</p>
        )}
        <span className="text-xs" style={{ color: remaining < 400 ? '#c0392b' : '#8a6a50' }}>
          {totalChars}/{maxTotalChars} תווים
        </span>
      </div>
    </div>
  )
}
