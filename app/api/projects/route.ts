import { NextResponse } from 'next/server'
import { createProject, listProjects, type ProjectStatus } from '@/lib/data'
import { getSession } from '@/lib/auth'

export async function GET() {
  if (!(await getSession())) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  return NextResponse.json({ projects: listProjects() })
}

export async function POST(request: Request) {
  if (!(await getSession())) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })
  const body = await request.json() as { name?: string; course?: string; description?: string; progress?: number; members?: number; status?: ProjectStatus }
  if (!body.name?.trim() || !body.course || !body.description) return NextResponse.json({ error: 'Name, course, and description are required.' }, { status: 400 })
  const project = createProject({ name: body.name.trim(), course: body.course, description: body.description, progress: body.progress ?? 0, members: body.members ?? 1, status: body.status ?? 'Planning' })
  return NextResponse.json({ project }, { status: 201 })
}
