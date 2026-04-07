import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/terms', '/accessibility'])
const isAccessRoute = createRouteMatcher(['/access', '/api/verify-access'])
const isTermsRoute = createRouteMatcher(['/terms-accept', '/api/accept-terms'])

export default clerkMiddleware(async (auth, request) => {
  if (isPublicRoute(request)) return

  await auth.protect()

  if (isTermsRoute(request)) return

  const { userId } = await auth()

  const termsValue = request.cookies.get('terms_accepted')?.value
  if (termsValue !== userId) {
    return NextResponse.redirect(new URL('/terms-accept', request.url))
  }

  if (isAccessRoute(request)) return

  const cookieValue = request.cookies.get('access_verified')?.value
  if (cookieValue !== userId) {
    return NextResponse.redirect(new URL('/access', request.url))
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
