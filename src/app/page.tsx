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
    <div className="min-h-screen" style={{ background: '#1a1a2e' }}>
      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1
            className="text-4xl font-extrabold mb-3 tracking-tight"
            style={{ background: 'linear-gradient(90deg, #e0c3fc, #8ec5fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            מחולל העיתון ההיסטורי
          </h1>
          <p className="text-sm" style={{ color: '#9090b0' }}>כלי לתלמידי בגרות ליצירת כתבות עיתון היסטוריות</p>
        </div>

        {/* Content card */}
        <div className="rounded-2xl p-8" style={{ background: '#16213e', border: '1px solid #2a2a4a' }}>
          {stage === 'select' && (
            <ArticleTypeSelector onSelect={handleSelectType} />
          )}

          {stage === 'form' && articleType && (
            <div>
              <button
                onClick={() => setStage('select')}
                className="text-sm mb-6 block hover:underline"
                style={{ color: '#8ec5fc' }}
              >
                ← חזור לבחירת סוג
              </button>
              {error && (
                <div className="rounded-lg px-4 py-3 mb-4 text-sm" style={{ background: '#2d1b1b', border: '1px solid #7f3030', color: '#f08080' }}>
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
              <div
                className="inline-block w-10 h-10 rounded-full animate-spin mb-4"
                style={{ border: '4px solid #2a2a4a', borderTopColor: '#8ec5fc' }}
              />
              <p style={{ color: '#9090b0' }}>מייצר כתבה...</p>
            </div>
          )}

          {stage === 'result' && (
            <OutputDisplay text={result} onReset={handleReset} />
          )}
        </div>
      </main>
    </div>
  )
}
