import { auth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import AccessForm from './_form'

export default async function AccessPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const accessCode = process.env.STUDENT_ACCESS_CODE

  if (!accessCode) {
    const client = await clerkClient()
    await client.users.updateUser(userId, {
      publicMetadata: { accessVerified: true },
    })
    redirect('/')
  }

  return <AccessForm />
}
