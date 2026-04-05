'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth, SignInButton, UserButton } from '@clerk/nextjs'
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
  const { isSignedIn } = useAuth()
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
      // שמירה ב-KV בצורה שקטה
      fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: json.result, articleType: data.articleType, clusterTitle: cluster?.title }),
      }).catch(() => {})
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
      {/* Auth bar */}
      <div className="flex justify-between items-center px-6 py-3" style={{ background: '#F8EDD4', borderBottom: '1px solid #D4A843' }}>
        <div className="flex items-center gap-4">
          <span style={{ color: '#9B7230', fontSize: '0.85rem', fontFamily: 'inherit' }}>מחולל העיתון ההיסטורי</span>
          <Link href="/guide" style={{ color: '#9B7230', fontSize: '0.85rem', fontFamily: 'inherit', textDecoration: 'none' }}>
            מדריך
          </Link>
          {isSignedIn && (
            <Link href="/my-articles" style={{ color: '#C8860A', fontSize: '0.85rem', fontFamily: 'inherit', textDecoration: 'none', fontWeight: 700 }}>
              הכתבות שלי
            </Link>
          )}
        </div>
        {!isSignedIn ? (
          <SignInButton mode="modal">
            <button
              style={{ background: '#C8860A', color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 16px', fontFamily: 'inherit', fontSize: '0.9rem', cursor: 'pointer' }}
            >
              התחבר
            </button>
          </SignInButton>
        ) : (
          <UserButton />
        )}
      </div>

      <main className="max-w-3xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-2 text-xs tracking-widest uppercase" style={{ color: '#9B7230', fontFamily: 'inherit', letterSpacing: '0.2em' }}>
            תוכנית הבגרויות הגמישה
          </div>
          <h1 style={{ fontFamily: 'inherit', fontSize: '2.4rem', fontWeight: 800, color: '#2C1A00', lineHeight: 1.2 }}>
            מחולל העיתון ההיסטורי
          </h1>
          <div style={{ width: '60px', height: '2px', background: '#D4A017', margin: '0.75rem auto' }} />
          <p style={{ color: '#6B4510', fontFamily: 'inherit', fontSize: '1.05rem' }}>
            כלי לתלמידי בגרות ליצירת כתבות עיתון היסטוריות
          </p>
        </div>

        {/* Content card */}
        <div className="rounded-xl p-8" style={{ background: '#FFFAEE', border: '1px solid #D4A843', boxShadow: '0 2px 12px rgba(44,26,0,0.10)' }}>

          {/* בחירת אשכול */}
          {stage === 'cluster' && (
            <div className="space-y-6">
              <h2 style={{ fontFamily: 'inherit', fontSize: '1.4rem', color: '#2C1A00' }}>בחר אשכול</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CLUSTERS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCluster(c)}
                    className="rounded-xl p-6 text-right transition-all hover:brightness-95 active:scale-95"
                    style={{ background: '#C8860A', border: 'none', boxShadow: '0 2px 8px rgba(200,134,10,0.35)' }}
                  >
                    <div style={{ fontFamily: 'inherit', fontWeight: 700, color: '#fff', fontSize: '1.1rem', marginBottom: '0.4rem' }}>{c.title}</div>
                    <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', fontFamily: 'inherit' }}>{c.subtitle}</div>
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
                style={{ color: '#C8860A', fontFamily: 'inherit' }}
              >
                ← חזור לבחירת אשכול
              </button>
              <div className="mb-6 px-3 py-2 rounded-lg text-sm" style={{ background: '#F8EDD4', border: '1px solid #D4A843', color: '#6B4510' }}>
                אשכול: <span style={{ fontWeight: 700, color: '#2C1A00', fontFamily: 'inherit' }}>{cluster.title}</span>
              </div>
              <ArticleTypeSelector onSelect={handleSelectType} />
            </div>
          )}

          {stage === 'form' && articleType && cluster && (
            <div>
              <button
                onClick={() => setStage('select')}
                className="text-sm mb-6 block hover:underline"
                style={{ color: '#C8860A', fontFamily: 'inherit' }}
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
                style={{ border: '3px solid #D4A843', borderTopColor: '#C8860A' }}
              />
              <p style={{ color: '#6B4510', fontFamily: 'inherit', fontSize: '1.1rem' }}>מייצר כתבה...</p>
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
