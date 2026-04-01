'use client'

import { useState } from 'react'
import ArticleTypeSelector from '@/components/ArticleTypeSelector'
import NewsForm from '@/components/NewsForm'
import SecondaryForm from '@/components/SecondaryForm'
import EditorialForm from '@/components/EditorialForm'
import OutputDisplay from '@/components/OutputDisplay'
import type { FormData } from '@/lib/types'

type Stage = 'select' | 'form' | 'loading' | 'result'
type ArticleType = FormData['articleType']

export default function Home() {
  const [stage, setStage] = useState<Stage>('select')
  const [articleType, setArticleType] = useState<ArticleType | null>(null)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  function handleSelectType(type: ArticleType) {
    setArticleType(type)
    setStage('form')
  }

  async function handleSubmit(data: FormData) {
    setError('')
    setStage('loading')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error ?? 'שגיאה לא ידועה')
        setStage('form')
        return
      }
      setResult(json.result)
      setStage('result')
    } catch {
      setError('שגיאת רשת — בדוק את החיבור ונסה שוב')
      setStage('form')
    }
  }

  function handleReset() {
    setStage('select')
    setArticleType(null)
    setResult('')
    setError('')
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">מחולל העיתון ההיסטורי</h1>
      <p className="text-gray-600 mb-8 text-sm">כלי לתלמידי בגרות ליצירת כתבות עיתון היסטוריות</p>

      {stage === 'select' && (
        <ArticleTypeSelector onSelect={handleSelectType} />
      )}

      {stage === 'form' && articleType && (
        <div>
          <button
            onClick={() => setStage('select')}
            className="text-sm text-blue-600 hover:underline mb-6 block"
          >
            ← חזור לבחירת סוג
          </button>
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 rounded px-4 py-3 mb-4 text-sm">
              {error}
            </div>
          )}
          {articleType === 'news' && (
            <NewsForm onSubmit={handleSubmit} loading={false} />
          )}
          {articleType === 'secondary' && (
            <SecondaryForm onSubmit={handleSubmit} loading={false} />
          )}
          {articleType === 'editorial' && (
            <EditorialForm onSubmit={handleSubmit} loading={false} />
          )}
        </div>
      )}

      {stage === 'loading' && (
        <div className="text-center py-16">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600">מייצר כתבה...</p>
        </div>
      )}

      {stage === 'result' && (
        <OutputDisplay text={result} onReset={handleReset} />
      )}
    </main>
  )
}
