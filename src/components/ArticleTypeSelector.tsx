'use client'

import type { FormData } from '@/lib/types'

type ArticleType = FormData['articleType']

interface Props {
  onSelect: (type: ArticleType) => void
}

const OPTIONS: { type: ArticleType; title: string; description: string }[] = [
  {
    type: 'news',
    title: 'כתבה חדשותית',
    description: 'כתבה היסטורית עם כותרת, ליד ופסקאות — הליבה של הגיליון',
  },
  {
    type: 'secondary',
    title: 'כתבת משנה',
    description: 'ראיון, מאמר דעה או מכתב למערכת — זווית נוספת על הנושא',
  },
  {
    type: 'editorial',
    title: 'דבר העורכים',
    description: 'טור עריכה המחבר בין הכתבות — הדביקו את הכתבות שיצרתם בשלבים הקודמים',
  },
]

export default function ArticleTypeSelector({ onSelect }: Props) {
  return (
    <div className="space-y-6">
      <h2 style={{ fontFamily: 'inherit', fontSize: '1.4rem', color: '#2C1A00' }}>בחר סוג כתבה</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {OPTIONS.map(opt => (
          <button
            key={opt.type}
            onClick={() => onSelect(opt.type)}
            className="rounded-xl p-5 text-right transition-all hover:brightness-95 active:scale-95"
            style={{ background: '#FFFAEE', border: '2px solid #D4A843', boxShadow: '0 1px 6px rgba(44,26,0,0.09)' }}
          >
            <div style={{ fontFamily: 'inherit', fontWeight: 700, color: '#2C1A00', fontSize: '1rem', marginBottom: '0.4rem' }}>{opt.title}</div>
            <div style={{ color: '#6B4510', fontSize: '0.85rem', fontFamily: 'inherit' }}>{opt.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
