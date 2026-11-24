import { NextResponse } from 'next/server'
import { createUser, publicUser, SESSION_COOKIE } from '@/lib/auth'

export async function POST(request: Request) {
  const body = await request.json() as { name?: string; email?: string; password?: string }
  if (!body.name?.trim() || !body.email?.trim() || !body.password || body.password.length < 8) {
    return NextResponse.json({ error: 'Name, email, and a password of at least 8 characters are required.' }, { status: 400 })
  }
  const user = createUser(body.name.trim(), body.email.trim(), body.password)
  if (!user) return NextResponse.json({ error: 'An account with that email already exists.' }, { status: 409 })
  const response = NextResponse.json({ user: publicUser(user) }, { status: 201 })
  response.cookies.set(SESSION_COOKIE, user.id, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 7 })
  return response
}
