import { auth } from '@clerk/nextjs/server'
import { redis } from '@/lib/redis'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import ArticleMarkdown from '@/components/ArticleMarkdown'

interface Article {
  title: string
  content: string
  articleType: string
  clusterTitle: string
  createdAt: string
}

const ARTICLE_TYPE_LABELS: Record<string, string> = {
  news: 'כתבת חדשות',
  secondary: 'כתבה משנית',
  editorial: 'מאמר דעה',
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const { id } = await params
  const raw = await redis.get(`article:${userId}:${id}`)
  if (!raw) notFound()

  const article: Article = JSON.parse(raw)

  return (
    <div className="min-h-screen" style={{ background: '#fffdf7' }}>
      <div className="flex justify-between items-center px-6 py-3" style={{ background: '#f5f0e8', borderBottom: '1px solid #c9b99a' }}>
        <Link href="/my-articles" style={{ color: '#8a6a50', fontSize: '0.85rem', fontFamily: 'inherit', textDecoration: 'none' }}>
          ← חזור לכתבות שלי
        </Link>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-4 flex gap-2 items-center flex-wrap">
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{ background: '#f5f0e8', color: '#8b4513', border: '1px solid #c9b99a' }}
          >
            {ARTICLE_TYPE_LABELS[article.articleType] ?? article.articleType}
          </span>
          {article.clusterTitle && (
            <span style={{ fontSize: '0.8rem', color: '#8a6a50' }}>{article.clusterTitle}</span>
          )}
          <span style={{ fontSize: '0.78rem', color: '#b0956e', marginRight: 'auto' }}>
            {new Date(article.createdAt).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        <div
          className="rounded-xl p-6"
          style={{ background: '#f5f0e8', border: '1px solid #d4c9b0', color: '#2c1810', lineHeight: '1.9', direction: 'rtl', textAlign: 'right' }}
        >
          <ArticleMarkdown content={article.content} />
        </div>
      </main>
    </div>
  )
}
