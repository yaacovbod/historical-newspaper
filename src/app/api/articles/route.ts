import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { kv } from '@vercel/kv'

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

  await kv.set(key, article)
  await kv.lpush(`user:${userId}:articles`, String(timestamp))

  return NextResponse.json({ id: timestamp })
}

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const timestamps = await kv.lrange(`user:${userId}:articles`, 0, -1)
  if (!timestamps.length) return NextResponse.json({ articles: [] })

  const keys = (timestamps as string[]).map(ts => `article:${userId}:${ts}`)
  const articles = await kv.mget(...keys) as (Record<string, string> | null)[]

  const result = (timestamps as string[])
    .map((ts, i) => ({ id: ts, ...(articles[i] ?? {}) }))
    .filter((a): a is { id: string } & Record<string, string> => 'title' in a && !!a.title)

  return NextResponse.json({ articles: result })
}
