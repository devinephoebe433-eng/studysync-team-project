export type Priority = 'High' | 'Medium' | 'Low'
export type ProjectStatus = 'Planning' | 'In progress' | 'Complete'

export type Task = {
  id: string
  title: string
  course: string
  dueDate: string
  priority: Priority
  done: boolean
  projectId?: string
}

export type Project = {
  id: string
  name: string
  course: string
  description: string
  progress: number
  members: number
  status: ProjectStatus
}

const tasks: Task[] = [
  { id: 'task-1', title: 'Read chapter 4 and write notes', course: 'Human Biology', dueDate: '2026-11-24', priority: 'High', done: false },
  { id: 'task-2', title: 'Submit wireframes for review', course: 'Web Design', dueDate: '2026-11-25', priority: 'Medium', done: false, projectId: 'project-2' },
  { id: 'task-3', title: 'Problem set 06', course: 'Calculus II', dueDate: '2026-11-27', priority: 'Low', done: true },
  { id: 'task-4', title: 'Draft research methods proposal', course: 'Social Science 204', dueDate: '2026-11-28', priority: 'High', done: false, projectId: 'project-1' },
  { id: 'task-5', title: 'Prepare group presentation outline', course: 'WDD 430', dueDate: '2026-11-30', priority: 'Medium', done: false, projectId: 'project-2' },
]

const projects: Project[] = [
  { id: 'project-1', name: 'Campus food access study', course: 'Social Science 204', description: 'Research access to affordable meals for students.', progress: 72, members: 4, status: 'In progress' },
  { id: 'project-2', name: 'Web design critique', course: 'WDD 430', description: 'Prepare a responsive critique and presentation.', progress: 48, members: 3, status: 'Planning' },
]

export function listTasks() { return [...tasks] }
export function getTask(id: string) { return tasks.find((task) => task.id === id) }
export function createTask(input: Omit<Task, 'id'>) {
  const task = { ...input, id: `task-${Date.now()}` }
  tasks.push(task)
  return task
}
export function updateTask(id: string, input: Partial<Omit<Task, 'id'>>) {
  const index = tasks.findIndex((task) => task.id === id)
  if (index < 0) return undefined
  tasks[index] = { ...tasks[index], ...input }
  return tasks[index]
}
export function deleteTask(id: string) {
  const index = tasks.findIndex((task) => task.id === id)
  if (index < 0) return false
  tasks.splice(index, 1)
  return true
}
export function listProjects() { return [...projects] }
export function getProject(id: string) { return projects.find((project) => project.id === id) }
export function createProject(input: Omit<Project, 'id'>) {
  const project = { ...input, id: `project-${Date.now()}` }
  projects.push(project)
  return project
}
export function updateProject(id: string, input: Partial<Omit<Project, 'id'>>) {
  const index = projects.findIndex((project) => project.id === id)
  if (index < 0) return undefined
  projects[index] = { ...projects[index], ...input }
  return projects[index]
}
export function deleteProject(id: string) {
  const index = projects.findIndex((project) => project.id === id)
  if (index < 0) return false
  projects.splice(index, 1)
  return true
}
