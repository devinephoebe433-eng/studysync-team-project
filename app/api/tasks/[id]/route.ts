import { NextResponse } from 'next/server'
import { deleteTask, getTask, updateTask, type Priority } from '@/lib/data'
import { getSession } from '@/lib/auth'

type Context = { params: Promise<{ id: string }> }

export async function GET(_: Request, context: Context) {
  if (!(await getSession())) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  const task = getTask((await context.params).id)
  return task ? NextResponse.json({ task }) : NextResponse.json({ error: 'Task not found.' }, { status: 404 })
}

export async function PATCH(request: Request, context: Context) {
  if (!(await getSession())) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  const body = await request.json() as { title?: string; course?: string; dueDate?: string; priority?: Priority; done?: boolean; projectId?: string }
  const task = updateTask((await context.params).id, body)
  return task ? NextResponse.json({ task }) : NextResponse.json({ error: 'Task not found.' }, { status: 404 })
}

export async function DELETE(_: Request, context: Context) {
  if (!(await getSession())) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  const deleted = deleteTask((await context.params).id)
  return deleted ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Task not found.' }, { status: 404 })
}
