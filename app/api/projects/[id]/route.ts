import { NextResponse } from 'next/server'
import { deleteProject, getProject, updateProject, type ProjectStatus } from '@/lib/data'
import { getSession } from '@/lib/auth'

type Context = { params: Promise<{ id: string }> }

export async function GET(_: Request, context: Context) {
  if (!(await getSession())) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  const project = getProject((await context.params).id)
  return project ? NextResponse.json({ project }) : NextResponse.json({ error: 'Project not found.' }, { status: 404 })
}

export async function PATCH(request: Request, context: Context) {
  if (!(await getSession())) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  const body = await request.json() as { name?: string; course?: string; description?: string; progress?: number; members?: number; status?: ProjectStatus }
  const project = updateProject((await context.params).id, body)
  return project ? NextResponse.json({ project }) : NextResponse.json({ error: 'Project not found.' }, { status: 404 })
}

export async function DELETE(_: Request, context: Context) {
  if (!(await getSession())) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  const deleted = deleteProject((await context.params).id)
  return deleted ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Project not found.' }, { status: 404 })
}
