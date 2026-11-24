import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'studysync_session'

type User = { id: string; name: string; email: string; password: string }

const users: User[] = [{ id: 'user-1', name: 'Jordan Davis', email: 'jordan@studysync.app', password: 'studysync2026' }]

export function findUser(email: string, password: string) {
  return users.find((user) => user.email === email.toLowerCase() && user.password === password)
}

export function createUser(name: string, email: string, password: string) {
  const normalizedEmail = email.toLowerCase()
  if (users.some((user) => user.email === normalizedEmail)) return undefined
  const user = { id: `user-${Date.now()}`, name, email: normalizedEmail, password }
  users.push(user)
  return user
}

export async function getSession() {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value || null
}

export function publicUser(user: User) {
  return { id: user.id, name: user.name, email: user.email }
}
