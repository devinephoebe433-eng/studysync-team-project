import { NextResponse } from 'next/server'
import { createTask, listTasks, type Priority } from '@/lib/data'
import { getSession } from '@/lib/auth'

export async function GET() {
  if (!(await getSession())) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  return NextResponse.json({ tasks: listTasks() })
}

export async function POST(request: Request) {
  if (!(await getSession())) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  const body = await request.json() as { title?: string; course?: string; dueDate?: string; priority?: Priority; done?: boolean; projectId?: string }
  if (!body.title?.trim() || !body.course || !body.dueDate || !body.priority) return NextResponse.json({ error: 'Title, course, due date, and priority are required.' }, { status: 400 })
  const task = createTask({ title: body.title.trim(), course: body.course, dueDate: body.dueDate, priority: body.priority, done: Boolean(body.done), projectId: body.projectId })
  return NextResponse.json({ task }, { status: 201 })
}
