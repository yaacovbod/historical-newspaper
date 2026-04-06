import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'לא מחובר' }, { status: 401 })

  const { code } = await request.json()
  const accessCode = process.env.STUDENT_ACCESS_CODE

  if (!accessCode || code === accessCode) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('access_verified', userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })
    return response
  }

  return NextResponse.json({ error: 'קוד גישה שגוי' }, { status: 403 })
}
