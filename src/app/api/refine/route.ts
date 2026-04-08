import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'GEMINI_API_KEY לא מוגדר' }, { status: 500 })
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

  const geminiPayload = {
    system_instruction: { parts: [{ text: system }] },
    contents: [{ role: 'user', parts: [{ text: user }] }],
  }

  let geminiResponse: Response
  try {
    geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`,
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

  return NextResponse.json({ result })
}
