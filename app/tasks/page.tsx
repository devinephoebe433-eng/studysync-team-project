import { AppShell } from '@/components/AppShell'
import { TaskManager } from '@/components/TaskManager'

export default function TasksPage() {
  return <AppShell active="tasks"><TaskManager /></AppShell>
}
