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
    description: 'טור עריכה המחבר בין הכתבות — דורש הדבקת שתי הכתבות שנוצרו',
  },
]

const GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
]

export default function ArticleTypeSelector({ onSelect }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold" style={{ color: '#e0c3fc' }}>בחר סוג כתבה</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {OPTIONS.map((opt, i) => (
          <button
            key={opt.type}
            onClick={() => onSelect(opt.type)}
            className="rounded-xl p-5 text-right transition-transform hover:scale-105 hover:brightness-110 active:scale-95"
            style={{ background: GRADIENTS[i], border: 'none' }}
          >
            <div className="font-bold text-white text-base mb-2">{opt.title}</div>
            <div className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{opt.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
