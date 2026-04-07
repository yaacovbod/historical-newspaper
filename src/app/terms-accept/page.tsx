import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import TermsAcceptForm from './_form'

export default async function TermsAcceptPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  return <TermsAcceptForm />
}
