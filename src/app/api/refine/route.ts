import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY לא מוגדר' }, { status: 500 })
  }

  let body: { originalText: string; refinement: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'בקשה לא תקינה' }, { status: 400 })
  }

  const system = `אתה עורך טקסטים אקדמיים-היסטוריים. קיבלת כתבה שנוצרה עבור תלמיד בגרות והערה לשיפור.
עליך להחזיר את הכתבה המשופרת בלבד, תוך שמירה על אותו פורמט Markdown, סגנון ומבנה.
אל תוסיף הסברים — רק את הכתבה המעודכנת.`

  const user = `===הכתבה הנוכחית===
${body.originalText}

===הערת שיפור===
${body.refinement}`

  const client = new Anthropic({ apiKey })

  let result: string
  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
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

  return NextResponse.json({ result })
}
