import { auth } from '@clerk/nextjs/server'
import { redis } from '@/lib/redis'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const ARTICLE_TYPE_LABELS: Record<string, string> = {
  news: 'כתבת חדשות',
  secondary: 'כתבה משנית',
  editorial: 'מאמר דעה',
}

interface Article {
  id: string
  title: string
  articleType: string
  clusterTitle: string
  createdAt: string
}

export default async function MyArticlesPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  let articles: Article[] = []
  let kvError = false
  let usedCount = 0

  try {
    const countRaw = await redis.get(`articles_count:${userId}`)
    usedCount = countRaw ? parseInt(String(countRaw), 10) : 0

    const timestamps = await redis.lrange(`user:${userId}:articles`, 0, -1)
    if (timestamps.length) {
      const keys = timestamps.map(ts => `article:${userId}:${ts}`)
      const raws = await redis.mget(...keys)
      articles = timestamps
        .map((ts, i) => {
          const parsed = raws[i] ? JSON.parse(raws[i]!) : null
          return parsed ? { id: ts, ...parsed } as Article : null
        })
        .filter((a): a is Article => a !== null && !!a.title)
    }
  } catch {
    kvError = true
  }

  return (
    <div className="min-h-screen" style={{ background: '#fffdf7' }}>
      <div className="flex justify-between items-center px-6 py-3" style={{ background: '#f5f0e8', borderBottom: '1px solid #c9b99a' }}>
        <Link href="/" style={{ color: '#8a6a50', fontSize: '0.85rem', fontFamily: 'inherit', textDecoration: 'none' }}>
          ← חזור לדף הראשי
        </Link>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <h1 style={{ fontFamily: 'inherit', fontSize: '2rem', fontWeight: 800, color: '#2c1810' }}>הכתבות שלי</h1>
          <div style={{ width: '60px', height: '2px', background: '#8b4513', margin: '0.75rem auto' }} />
          {!kvError && (
            <p style={{ fontSize: '0.9rem', color: usedCount >= 5 ? '#c0392b' : '#8a6a50' }}>
              {usedCount >= 5
                ? 'הגעת למכסה המקסימלית — לא ניתן ליצור כתבות נוספות'
                : `נותרו ${5 - usedCount} כתבות מתוך 5`}
            </p>
          )}
        </div>

        {kvError ? (
          <div className="text-center py-16" style={{ color: '#8a6a50' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>שגיאה בטעינת הכתבות</p>
            <p style={{ fontSize: '0.85rem', color: '#b0956e' }}>ודא ש-REDIS_URL מוגדר ב-Vercel</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16" style={{ color: '#8a6a50' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>עוד לא שמרת כתבות</p>
            <Link href="/" style={{ color: '#8b4513', fontFamily: 'inherit', fontWeight: 700 }}>
              צור כתבה ראשונה
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {articles.map(article => (
              <Link key={article.id} href={`/my-articles/${article.id}`} style={{ textDecoration: 'none' }}>
                <div
                  className="rounded-xl p-5 transition-all hover:brightness-95"
                  style={{ background: '#fff', border: '1px solid #c9b99a', boxShadow: '0 2px 8px rgba(44,24,16,0.06)', cursor: 'pointer' }}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ background: '#f5f0e8', color: '#8b4513', border: '1px solid #c9b99a', whiteSpace: 'nowrap' }}
                    >
                      {ARTICLE_TYPE_LABELS[article.articleType] ?? article.articleType}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: 'inherit', fontSize: '1rem', fontWeight: 700, color: '#2c1810', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                    {article.title}
                  </h2>
                  {article.clusterTitle && (
                    <p style={{ fontSize: '0.8rem', color: '#8a6a50', marginBottom: '0.4rem' }}>{article.clusterTitle}</p>
                  )}
                  <p style={{ fontSize: '0.78rem', color: '#b0956e' }}>
                    {new Date(article.createdAt).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
