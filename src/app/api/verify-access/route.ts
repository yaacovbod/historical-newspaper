import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'לא מחובר' }, { status: 401 })

  const { code } = await request.json()
  const accessCode = process.env.STUDENT_ACCESS_CODE

  if (!accessCode || code === accessCode) {
    const client = await clerkClient()
    await client.users.updateUser(userId, {
      publicMetadata: { accessVerified: true },
    })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'קוד גישה שגוי' }, { status: 403 })
}
