import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import type { FormData } from '@/lib/types'
import { buildNewsPrompt, buildSecondaryPrompt, buildEditorialPrompt } from '@/lib/prompts'
import { redis } from '@/lib/redis'

const MAX_ARTICLES = 5

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'GEMINI_API_KEY לא מוגדר' }, { status: 500 })
  }

  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'לא מחובר' }, { status: 401 })

  // בדיקת מכסה
  const countRaw = await redis.get(`articles_count:${userId}`)
  const count = countRaw ? parseInt(String(countRaw), 10) : 0
  if (count >= MAX_ARTICLES) {
    return NextResponse.json(
      { error: 'הגעת למכסת הכתבות המקסימלית (5 כתבות)' },
      { status: 403 }
    )
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

  const geminiPayload = {
    system_instruction: { parts: [{ text: system }] },
    contents: [{ role: 'user', parts: [{ text: user }] }],
  }

  let geminiResponse: Response
  try {
    geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiPayload),
      }
    )
  } catch {
    return NextResponse.json({ error: 'שגיאת רשת בפנייה ל-Gemini' }, { status: 502 })
  }

  if (!geminiResponse.ok) {
    const errorText = await geminiResponse.text().catch(() => '')
    return NextResponse.json(
      { error: `Gemini החזיר שגיאה ${geminiResponse.status}: ${errorText}` },
      { status: 502 }
    )
  }

  let geminiData: { candidates?: { content?: { parts?: { text?: string }[] } }[] }
  try {
    geminiData = await geminiResponse.json()
  } catch {
    return NextResponse.json({ error: 'תגובה לא תקינה מ-Gemini' }, { status: 502 })
  }

  const result = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!result) {
    return NextResponse.json({ error: 'לא התקבל תוכן מ-Gemini' }, { status: 502 })
  }

  // העלאת המונה רק אחרי יצירה מוצלחת
  await redis.incr(`articles_count:${userId}`)

  return NextResponse.json({ result })
}
