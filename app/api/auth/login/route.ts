import { NextResponse } from 'next/server'
import { findUser, publicUser, SESSION_COOKIE } from '@/lib/auth'

export async function POST(request: Request) {
  const body = await request.json() as { email?: string; password?: string }
  const user = findUser(body.email?.trim() || '', body.password || '')
  if (!user) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  const response = NextResponse.json({ user: publicUser(user) })
  response.cookies.set(SESSION_COOKIE, user.id, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 7 })
  return response
}
