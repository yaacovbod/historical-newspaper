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

export default function ArticleTypeSelector({ onSelect }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">בחר סוג כתבה</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {OPTIONS.map(opt => (
          <button
            key={opt.type}
            onClick={() => onSelect(opt.type)}
            className="border border-gray-300 rounded p-4 text-right hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="font-medium mb-1">{opt.title}</div>
            <div className="text-sm text-gray-600">{opt.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
