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
  const [refining, setRefining] = useState(false)

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
      const enrichedData = { ...data, curriculumCluster: cluster?.title }
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enrichedData),
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

  async function handleRefine(note: string) {
    setRefining(true)
    try {
      const res = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalText: result, refinement: note }),
      })
      const json = await res.json()
      if (res.ok) setResult(json.result)
    } finally {
      setRefining(false)
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
    <div className="min-h-screen">
      <main className="max-w-3xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-2 text-xs tracking-widest uppercase" style={{ color: '#8a6a50', fontFamily: 'Heebo, sans-serif', letterSpacing: '0.2em' }}>
            תוכנית הבגרויות הגמישה
          </div>
          <h1 style={{ fontFamily: 'Heebo, sans-serif', fontSize: '2.4rem', fontWeight: 800, color: '#2c1810', lineHeight: 1.2 }}>
            מחולל העיתון ההיסטורי
          </h1>
          <div style={{ width: '60px', height: '2px', background: '#8b4513', margin: '0.75rem auto' }} />
          <p style={{ color: '#5c3d1e', fontFamily: 'Heebo, sans-serif', fontSize: '1.05rem' }}>
            כלי לתלמידי בגרות ליצירת כתבות עיתון היסטוריות
          </p>
        </div>

        {/* Content card */}
        <div className="rounded-xl p-8" style={{ background: '#fffdf7', border: '1px solid #c9b99a', boxShadow: '0 2px 12px rgba(44,24,16,0.07)' }}>

          {/* בחירת אשכול */}
          {stage === 'cluster' && (
            <div className="space-y-6">
              <h2 style={{ fontFamily: 'Heebo, sans-serif', fontSize: '1.4rem', color: '#2c1810' }}>בחר אשכול</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CLUSTERS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCluster(c)}
                    className="rounded-xl p-6 text-right transition-all hover:brightness-95 active:scale-95"
                    style={{ background: '#8b4513', border: 'none', boxShadow: '0 2px 8px rgba(139,69,19,0.3)' }}
                  >
                    <div style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 700, color: '#fff', fontSize: '1.1rem', marginBottom: '0.4rem' }}>{c.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', fontFamily: 'Heebo, sans-serif' }}>{c.subtitle}</div>
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
                style={{ color: '#8b4513', fontFamily: 'Heebo, sans-serif' }}
              >
                ← חזור לבחירת אשכול
              </button>
              <div className="mb-6 px-3 py-2 rounded-lg text-sm" style={{ background: '#f5f0e8', border: '1px solid #c9b99a', color: '#5c3d1e' }}>
                אשכול: <span style={{ fontWeight: 700, color: '#2c1810', fontFamily: 'Heebo, sans-serif' }}>{cluster.title}</span>
              </div>
              <ArticleTypeSelector onSelect={handleSelectType} />
            </div>
          )}

          {stage === 'form' && articleType && cluster && (
            <div>
              <button
                onClick={() => setStage('select')}
                className="text-sm mb-6 block hover:underline"
                style={{ color: '#8b4513', fontFamily: 'Heebo, sans-serif' }}
              >
                ← חזור לבחירת סוג
              </button>
              {error && (
                <div className="rounded-lg px-4 py-3 mb-4 text-sm" style={{ background: '#fdf0ec', border: '1px solid #c9806a', color: '#7a2e1a' }}>
                  {error}
                </div>
              )}
              {articleType === 'news' && (
                <NewsForm onSubmit={handleSubmit} loading={false} concepts={cluster.concepts} clusterTitle={cluster.title} />
              )}
              {articleType === 'secondary' && (
                <SecondaryForm onSubmit={handleSubmit} loading={false} concepts={cluster.concepts} clusterTitle={cluster.title} />
              )}
              {articleType === 'editorial' && (
                <EditorialForm onSubmit={handleSubmit} loading={false} clusterTitle={cluster.title} />
              )}
            </div>
          )}

          {stage === 'loading' && (
            <div className="text-center py-16">
              <div
                className="inline-block w-10 h-10 rounded-full animate-spin mb-4"
                style={{ border: '3px solid #c9b99a', borderTopColor: '#8b4513' }}
              />
              <p style={{ color: '#5c3d1e', fontFamily: 'Heebo, sans-serif', fontSize: '1.1rem' }}>מייצר כתבה...</p>
            </div>
          )}

          {stage === 'result' && (
            <OutputDisplay text={result} onReset={handleReset} onRefine={handleRefine} refining={refining} />
          )}
        </div>
      </main>
    </div>
  )
}
