import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import Anthropic from '@anthropic-ai/sdk'
import type { FormData } from '@/lib/types'
import { buildNewsPrompt, buildSecondaryPrompt, buildEditorialPrompt } from '@/lib/prompts'
import { redis } from '@/lib/redis'

const MAX_ARTICLES = 5
const ADMIN_EMAIL = 'yaacovbod@gmail.com'

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY לא מוגדר' }, { status: 500 })
  }

  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'לא מחובר' }, { status: 401 })

  const clerkUser = await currentUser()
  const isAdmin = clerkUser?.emailAddresses.some(e => e.emailAddress === ADMIN_EMAIL)

  if (!isAdmin) {
    const countRaw = await redis.get(`articles_count:${userId}`)
    const count = countRaw ? parseInt(String(countRaw), 10) : 0
    if (count >= MAX_ARTICLES) {
      return NextResponse.json(
        { error: 'הגעת למכסת הכתבות המקסימלית (5 כתבות). פנה למורה.' },
        { status: 403 }
      )
    }
  }

  let body: FormData
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'בקשה לא תקינה' }, { status: 400 })
  }

  let system: string
  let user: string

  try {
    if (body.articleType === 'news') {
      ;({ system, user } = buildNewsPrompt(body))
    } else if (body.articleType === 'secondary') {
      ;({ system, user } = buildSecondaryPrompt(body))
    } else if (body.articleType === 'editorial') {
      ;({ system, user } = buildEditorialPrompt(body))
    } else {
      return NextResponse.json({ error: 'סוג כתבה לא מוכר' }, { status: 400 })
    }
  } catch {
    return NextResponse.json({ error: 'שגיאה בבניית הפרומפט' }, { status: 500 })
  }

  const client = new Anthropic({ apiKey })

  let result: string
  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 4096,
      system,
      messages: [{ role: 'user', content: user }],
    })
    result = (message.content[0] as { type: string; text: string }).text
  } catch {
    return NextResponse.json({ error: 'שגיאה בפנייה ל-Claude' }, { status: 502 })
  }

  if (!result) {
    return NextResponse.json({ error: 'לא התקבל תוכן מ-Claude' }, { status: 502 })
  }

  if (!isAdmin) {
    await redis.incr(`articles_count:${userId}`)
  }

  return NextResponse.json({ result })
}
