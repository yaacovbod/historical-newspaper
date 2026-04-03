import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { redis } from '@/lib/redis'

function extractTitle(content: string): string {
  const match = content.match(/^#{1,3}\s+(.+)/m)
  if (match) return match[1].trim()
  const firstLine = content.split('\n').find(l => l.trim())
  return firstLine?.slice(0, 80).trim() ?? 'כתבה ללא כותרת'
}

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { content, articleType, clusterTitle } = await request.json()
  const timestamp = Date.now()
  const key = `article:${userId}:${timestamp}`

  const article = {
    title: extractTitle(content),
    content,
    articleType,
    clusterTitle: clusterTitle ?? '',
    createdAt: new Date().toISOString(),
  }

  await redis.set(key, JSON.stringify(article))
  await redis.lpush(`user:${userId}:articles`, String(timestamp))

  return NextResponse.json({ id: timestamp })
}

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const timestamps = await redis.lrange(`user:${userId}:articles`, 0, -1)
  if (!timestamps.length) return NextResponse.json({ articles: [] })

  const keys = timestamps.map(ts => `article:${userId}:${ts}`)
  const raws = await redis.mget(...keys)

  const result = timestamps
    .map((ts, i) => {
      const parsed = raws[i] ? JSON.parse(raws[i]!) : null
      return parsed ? { id: ts, ...parsed } : null
    })
    .filter(Boolean)

  return NextResponse.json({ articles: result })
}
