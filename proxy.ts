import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const isProtectedPath = ['/', '/tasks', '/projects', '/calendar'].some((path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`))
  const hasSession = request.cookies.has('studysync_session')
  if (isProtectedPath && !hasSession) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && hasSession) return NextResponse.redirect(new URL('/', request.url))
  return NextResponse.next()
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] }
