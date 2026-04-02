'use client'

import { useState } from 'react'
import ArticleTypeSelector from '@/components/ArticleTypeSelector'
import NewsForm from '@/components/NewsForm'
import SecondaryForm from '@/components/SecondaryForm'
import EditorialForm from '@/components/EditorialForm'
import OutputDisplay from '@/components/OutputDisplay'
import { CLUSTERS, type Cluster } from '@/lib/clusters'
import type { FormData } from '@/lib/types'

type Stage = 'cluster' | 'select' | 'form' | 'loading' | 'result'
type ArticleType = FormData['articleType']

export default function Home() {
  const [stage, setStage] = useState<Stage>('cluster')
  const [cluster, setCluster] = useState<Cluster | null>(null)
  const [articleType, setArticleType] = useState<ArticleType | null>(null)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  function handleSelectCluster(c: Cluster) {
    setCluster(c)
    setStage('select')
  }

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
    setStage('cluster')
    setCluster(null)
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

          {/* בחירת אשכול */}
          {stage === 'cluster' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold" style={{ color: '#e0c3fc' }}>בחר אשכול</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CLUSTERS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCluster(c)}
                    className="rounded-xl p-6 text-right transition-transform hover:scale-105 hover:brightness-110 active:scale-95"
                    style={{ background: c.gradient, border: 'none' }}
                  >
                    <div className="font-bold text-white text-lg mb-2">{c.title}</div>
                    <div className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{c.subtitle}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {stage === 'select' && cluster && (
            <div>
              <button
                onClick={() => setStage('cluster')}
                className="text-sm mb-4 block hover:underline"
                style={{ color: '#8ec5fc' }}
              >
                ← חזור לבחירת אשכול
              </button>
              <div className="mb-6 px-3 py-2 rounded-lg text-sm" style={{ background: '#1e1e3a', border: '1px solid #3a3a6a', color: '#c0c0d8' }}>
                אשכול: <span className="font-semibold" style={{ color: '#e0c3fc' }}>{cluster.title}</span>
              </div>
              <ArticleTypeSelector onSelect={handleSelectType} />
            </div>
          )}

          {stage === 'form' && articleType && cluster && (
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
                <NewsForm onSubmit={handleSubmit} loading={false} concepts={cluster.concepts} />
              )}
              {articleType === 'secondary' && (
                <SecondaryForm onSubmit={handleSubmit} loading={false} concepts={cluster.concepts} />
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
