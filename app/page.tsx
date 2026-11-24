'use client'

import { FormEvent, useMemo, useState } from 'react'

type Priority = 'High' | 'Medium' | 'Low'
type StatusFilter = 'all' | 'active' | 'completed'
type SortOption = 'due' | 'priority' | 'title'

type Task = {
  id: number
  title: string
  course: string
  dueDate: string
  priority: Priority
  done: boolean
}

type TaskDraft = {
  title: string
  course: string
  dueDate: string
  priority: Priority
}

const TODAY = '2026-11-24'
const priorityOrder: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 }

const initialTasks: Task[] = [
  { id: 1, title: 'Read chapter 4 and write notes', course: 'Human Biology', dueDate: '2026-11-24', priority: 'High', done: false },
  { id: 2, title: 'Submit wireframes for review', course: 'Web Design', dueDate: '2026-11-25', priority: 'Medium', done: false },
  { id: 3, title: 'Problem set 06', course: 'Calculus II', dueDate: '2026-11-27', priority: 'Low', done: true },
  { id: 4, title: 'Draft research methods proposal', course: 'Social Science 204', dueDate: '2026-11-28', priority: 'High', done: false },
  { id: 5, title: 'Prepare group presentation outline', course: 'WDD 430', dueDate: '2026-11-30', priority: 'Medium', done: false },
]

const projects = [
  { name: 'Campus food access study', course: 'Social Science 204', members: 4, progress: 72, accent: 'from-cyan-500 to-teal-400', initials: 'CF' },
  { name: 'Web design critique', course: 'WDD 430', members: 3, progress: 48, accent: 'from-violet-500 to-indigo-400', initials: 'WD' },
]

const defaultDraft: TaskDraft = { title: '', course: 'Personal', dueDate: '2026-11-30', priority: 'Medium' }

function formatDueDate(date: string) {
  if (date === TODAY) return 'Today'
  if (date === '2026-11-25') return 'Tomorrow'
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(`${date}T12:00:00`))
}

function dueState(task: Task) {
  if (task.done) return 'Complete'
  if (task.dueDate < TODAY) return 'Overdue'
  if (task.dueDate === TODAY) return 'Due today'
  return `Due ${formatDueDate(task.dueDate)}`
}

function priorityClasses(priority: Priority) {
  if (priority === 'High') return 'bg-rose-50 text-rose-600 ring-rose-100'
  if (priority === 'Medium') return 'bg-amber-50 text-amber-700 ring-amber-100'
  return 'bg-slate-100 text-slate-600 ring-slate-200'
}

export default function Home() {
  const [tasks, setTasks] = useState(initialTasks)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [priorityFilter, setPriorityFilter] = useState<'all' | Priority>('all')
  const [sortBy, setSortBy] = useState<SortOption>('due')
  const [showComposer, setShowComposer] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [draft, setDraft] = useState<TaskDraft>(defaultDraft)
  const [notice, setNotice] = useState('')

  const completedCount = tasks.filter((task) => task.done).length
  const activeTasks = tasks.filter((task) => !task.done)
  const highPriorityCount = activeTasks.filter((task) => task.priority === 'High').length
  const completionPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0

  const visibleTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return tasks
      .filter((task) => {
        const matchesQuery = !normalizedQuery || `${task.title} ${task.course}`.toLowerCase().includes(normalizedQuery)
        const matchesStatus = statusFilter === 'all' || (statusFilter === 'completed' ? task.done : !task.done)
        const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
        return matchesQuery && matchesStatus && matchesPriority
      })
      .sort((first, second) => {
        if (sortBy === 'priority') return priorityOrder[first.priority] - priorityOrder[second.priority]
        if (sortBy === 'title') return first.title.localeCompare(second.title)
        return first.dueDate.localeCompare(second.dueDate)
      })
  }, [priorityFilter, query, sortBy, statusFilter, tasks])

  const upcomingTasks = tasks.filter((task) => !task.done).sort((first, second) => first.dueDate.localeCompare(second.dueDate)).slice(0, 3)

  function showNotice(message: string) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2600)
  }

  function toggleTask(id: number) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))
    const task = tasks.find((item) => item.id === id)
    if (task) showNotice(task.done ? 'Task marked as active' : 'Task completed')
  }

  function openNewTask() {
    setEditingTask(null)
    setDraft(defaultDraft)
    setShowComposer(true)
  }

  function openEditTask(task: Task) {
    setEditingTask(task)
    setDraft({ title: task.title, course: task.course, dueDate: task.dueDate, priority: task.priority })
    setShowComposer(true)
  }

  function saveTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = draft.title.trim()
    if (!title) return

    if (editingTask) {
      setTasks((current) => current.map((task) => (task.id === editingTask.id ? { ...task, ...draft, title } : task)))
      showNotice('Task details updated')
    } else {
      setTasks((current) => [...current, { ...draft, title, id: Date.now(), done: false }])
      showNotice('Task added to your plan')
    }

    setShowComposer(false)
    setEditingTask(null)
    setDraft(defaultDraft)
  }

  function deleteTask(id: number) {
    const task = tasks.find((item) => item.id === id)
    if (!task || !window.confirm(`Delete “${task.title}”?`)) return
    setTasks((current) => current.filter((item) => item.id !== id))
    showNotice('Task removed')
  }

  return (
    <main className="min-h-screen bg-[#f6f8fa] text-[#193247]">
      {notice && <div role="status" className="fixed right-5 top-5 z-50 rounded-2xl bg-[#193247] px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/20">{notice}</div>}

      <div className="mx-auto flex min-h-screen max-w-[1480px]">
        <aside className="hidden w-[248px] flex-col border-r border-slate-200/80 bg-white px-5 py-7 lg:flex">
          <div className="flex items-center gap-3 px-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#193247] text-sm font-bold text-white shadow-lg shadow-[#193247]/15">S</div>
            <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#167986]">StudySync</p><p className="mt-0.5 text-sm font-semibold text-[#193247]">Student workspace</p></div>
          </div>

          <nav className="mt-12 space-y-1.5 text-sm font-semibold" aria-label="Main navigation">
            <a className="flex items-center gap-3 rounded-xl bg-[#eaf4f6] px-3 py-3 text-[#167986]" href="#dashboard"><span className="grid h-6 w-6 place-items-center rounded-lg bg-white text-xs shadow-sm" aria-hidden="true">⌂</span>Overview</a>
            <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-500 transition hover:bg-slate-50 hover:text-[#193247]" href="#tasks"><span className="grid h-6 w-6 place-items-center rounded-lg bg-slate-100 text-xs" aria-hidden="true">✓</span>My tasks <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">{activeTasks.length}</span></a>
            <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-500 transition hover:bg-slate-50 hover:text-[#193247]" href="#calendar"><span className="grid h-6 w-6 place-items-center rounded-lg bg-slate-100 text-xs" aria-hidden="true">□</span>Calendar</a>
            <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-500 transition hover:bg-slate-50 hover:text-[#193247]" href="#projects"><span className="grid h-6 w-6 place-items-center rounded-lg bg-slate-100 text-xs" aria-hidden="true">◈</span>Group projects</a>
          </nav>

          <div className="mt-auto rounded-2xl bg-[#f0f8f6] p-4">
            <div className="flex items-center justify-between"><p className="text-xs font-bold text-[#247b72]">Weekly progress</p><span className="text-xs font-bold text-[#247b72]">{completionPercent}%</span></div>
            <p className="mt-2 text-xs leading-5 text-slate-500">A steady pace beats a perfect plan. Keep going.</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-[#58a59a] transition-all duration-500" style={{ width: `${completionPercent}%` }} /></div>
          </div>
        </aside>

        <section className="min-w-0 flex-1 px-5 py-5 sm:px-8 lg:px-12 lg:py-8">
          <header className="flex items-center justify-between border-b border-slate-200/80 pb-5">
            <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#193247] text-sm font-bold text-white lg:hidden">S</div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#167986] lg:hidden">StudySync</p><p className="hidden text-sm font-medium text-slate-400 lg:block">Tuesday, November 24, 2026</p></div></div>
            <div className="flex items-center gap-3"><div className="relative hidden sm:block"><label className="sr-only" htmlFor="global-search">Search tasks and courses</label><span className="pointer-events-none absolute left-3 top-2.5 text-slate-400" aria-hidden="true">⌕</span><input id="global-search" value={query} onChange={(event) => setQuery(event.target.value)} className="w-48 rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs outline-none transition placeholder:text-slate-400 focus:border-[#9bcbd0] focus:ring-2 focus:ring-[#dff1f2]" placeholder="Search your workspace" /></div><button type="button" aria-label="Notifications" className="relative grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-sm text-slate-500 transition hover:border-[#9bcbd0] hover:text-[#167986]">♧<span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" /></button><div className="grid h-9 w-9 place-items-center rounded-full bg-[#dbecef] text-xs font-bold text-[#167986]">JD</div></div>
          </header>

          <div id="dashboard" className="pt-8">
            <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
              <div><div className="inline-flex items-center gap-2 rounded-full bg-[#eaf4f6] px-3 py-1.5 text-xs font-bold text-[#167986]"><span className="h-1.5 w-1.5 rounded-full bg-[#58a59a]" />Your workspace is on track</div><h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.055em] text-[#193247] sm:text-5xl">Make room for what matters.</h1><p className="mt-4 max-w-xl text-sm leading-6 text-slate-500">Good morning, Jordan. Here is a calm, clear view of what needs your attention this week.</p></div>
              <button type="button" onClick={openNewTask} className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#193247] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#193247]/15 transition hover:-translate-y-0.5 hover:bg-[#25455b]"><span className="text-lg leading-none">+</span> Add task</button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/30"><div className="flex items-start justify-between"><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Active tasks</p><span className="grid h-8 w-8 place-items-center rounded-xl bg-[#eaf4f6] text-[#167986]">✓</span></div><p className="mt-4 text-3xl font-semibold tracking-tight">{activeTasks.length}</p><p className="mt-1 text-xs text-slate-400">to work through this week</p></div>
              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/30"><div className="flex items-start justify-between"><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Completed</p><span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-50 text-emerald-600">↗</span></div><p className="mt-4 text-3xl font-semibold tracking-tight">{completedCount}</p><p className="mt-1 text-xs text-slate-400">{completionPercent}% of your task list</p></div>
              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/30"><div className="flex items-start justify-between"><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">High priority</p><span className="grid h-8 w-8 place-items-center rounded-xl bg-rose-50 text-rose-500">!</span></div><p className="mt-4 text-3xl font-semibold tracking-tight">{highPriorityCount}</p><p className="mt-1 text-xs text-slate-400">items need focus soon</p></div>
              <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/30"><div className="flex items-start justify-between"><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Projects</p><span className="grid h-8 w-8 place-items-center rounded-xl bg-violet-50 text-violet-600">◈</span></div><p className="mt-4 text-3xl font-semibold tracking-tight">{projects.length}</p><p className="mt-1 text-xs text-slate-400">active collaborations</p></div>
            </div>
          </div>

          {showComposer && <div className="mt-6 rounded-2xl border border-[#b9dfe0] bg-[#f2fbfb] p-5 shadow-sm" id="task-composer"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#167986]">{editingTask ? 'Edit task' : 'Quick capture'}</p><h2 className="mt-1 text-lg font-semibold">{editingTask ? 'Refine your plan' : 'Add something to your list'}</h2></div><button type="button" aria-label="Close task form" onClick={() => setShowComposer(false)} className="text-xl text-slate-400 hover:text-slate-700">×</button></div><form onSubmit={saveTask} className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1fr_auto] xl:items-end"><div className="xl:col-span-1"><label className="text-xs font-bold text-slate-500" htmlFor="new-task">Task name</label><input id="new-task" autoFocus value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#9bcbd0] focus:ring-2 focus:ring-[#dff1f2]" placeholder="What needs your attention?" required /></div><div><label className="text-xs font-bold text-slate-500" htmlFor="task-course">Course</label><input id="task-course" value={draft.course} onChange={(event) => setDraft({ ...draft, course: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#9bcbd0] focus:ring-2 focus:ring-[#dff1f2]" /></div><div><label className="text-xs font-bold text-slate-500" htmlFor="task-date">Due date</label><input id="task-date" type="date" value={draft.dueDate} onChange={(event) => setDraft({ ...draft, dueDate: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#9bcbd0] focus:ring-2 focus:ring-[#dff1f2]" /></div><div><label className="text-xs font-bold text-slate-500" htmlFor="task-priority">Priority</label><select id="task-priority" value={draft.priority} onChange={(event) => setDraft({ ...draft, priority: event.target.value as Priority })} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#9bcbd0] focus:ring-2 focus:ring-[#dff1f2]"><option>High</option><option>Medium</option><option>Low</option></select></div><button type="submit" className="rounded-xl bg-[#167986] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#126571]">{editingTask ? 'Save changes' : 'Save task'}</button></form></div>}

          <div className="mt-7 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
            <section id="tasks" className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 sm:p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Your workload</p><h2 className="mt-2 text-xl font-semibold">Tasks for this week</h2><p className="mt-1 text-xs text-slate-400">Stay focused on the next actionable step.</p></div><div className="text-left sm:text-right"><p className="text-2xl font-semibold text-[#167986]">{completionPercent}%</p><p className="text-xs text-slate-400">complete</p></div></div>
              <div className="mt-5 flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row"><div className="relative flex-1 sm:hidden"><label className="sr-only" htmlFor="mobile-search">Search tasks</label><span className="pointer-events-none absolute left-3 top-2.5 text-slate-400">⌕</span><input id="mobile-search" value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs outline-none focus:border-[#9bcbd0]" placeholder="Search tasks" /></div><div className="flex flex-wrap gap-2" role="group" aria-label="Task status filters">{(['all', 'active', 'completed'] as const).map((filter) => <button key={filter} type="button" onClick={() => setStatusFilter(filter)} aria-pressed={statusFilter === filter} className={`rounded-lg px-3 py-2 text-xs font-bold capitalize transition ${statusFilter === filter ? 'bg-[#193247] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>{filter}</button>)}</div><label className="sr-only" htmlFor="task-sort">Sort tasks</label><select id="task-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 outline-none focus:border-[#9bcbd0]"><option value="due">Sort: Due date</option><option value="priority">Sort: Priority</option><option value="title">Sort: Name</option></select></div>
              <div className="flex flex-wrap gap-2 py-4" role="group" aria-label="Priority filters"><span className="self-center text-xs font-semibold text-slate-400">Priority</span>{(['all', 'High', 'Medium', 'Low'] as const).map((priority) => <button key={priority} type="button" onClick={() => setPriorityFilter(priority)} aria-pressed={priorityFilter === priority} className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition ${priorityFilter === priority ? 'bg-[#eaf4f6] text-[#167986] ring-1 ring-[#b9dfe0]' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>{priority === 'all' ? 'All priorities' : priority}</button>)}</div>
              <div className="divide-y divide-slate-100">{visibleTasks.length ? visibleTasks.map((task) => <article key={task.id} className="group flex items-start gap-3 py-4 first:pt-1"><button type="button" onClick={() => toggleTask(task.id)} aria-label={`${task.done ? 'Mark' : 'Complete'} ${task.title}`} aria-pressed={task.done} className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 text-xs transition ${task.done ? 'border-[#58a59a] bg-[#58a59a] text-white' : 'border-slate-300 text-transparent hover:border-[#58a59a]'}`}>✓</button><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><p className={`truncate text-sm font-semibold ${task.done ? 'text-slate-400 line-through' : 'text-[#193247]'}`}>{task.title}</p><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${priorityClasses(task.priority)}`}>{task.priority}</span></div><div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-400"><span>{task.course}</span><span className="text-slate-300">•</span><span className={task.dueDate <= TODAY && !task.done ? 'font-semibold text-rose-500' : task.done ? 'text-emerald-600' : ''}>{dueState(task)}</span></div></div><div className="flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"><button type="button" onClick={() => openEditTask(task)} aria-label={`Edit ${task.title}`} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-[#167986]">✎</button><button type="button" onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.title}`} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500">⌫</button></div></article>) : <div className="rounded-xl bg-slate-50 py-10 text-center"><p className="text-sm font-semibold text-slate-500">No tasks match these filters.</p><button type="button" onClick={() => { setQuery(''); setStatusFilter('all'); setPriorityFilter('all') }} className="mt-2 text-xs font-bold text-[#167986] hover:underline">Clear filters</button></div>}</div>
            </section>

            <div className="space-y-5">
              <section id="calendar" className="overflow-hidden rounded-2xl bg-[#193247] p-6 text-white shadow-xl shadow-[#193247]/10"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9bcbd0]">Next deadline</p><p className="mt-4 text-4xl font-semibold tracking-[-0.06em]">{upcomingTasks[0] ? formatDueDate(upcomingTasks[0].dueDate) : 'Clear'}</p><p className="mt-2 max-w-[210px] text-sm font-semibold">{upcomingTasks[0]?.title ?? 'You have no upcoming deadlines.'}</p></div><span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#bde2df]">{upcomingTasks[0] ? 'On track' : 'All done'}</span></div><div className="mt-6 h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-[#7ac6b6] transition-all" style={{ width: `${completionPercent}%` }} /></div><div className="mt-2 flex justify-between text-[10px] text-slate-300"><span>Weekly completion</span><span>{completionPercent}%</span></div></section>
              <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Coming up</p><h2 className="mt-2 text-lg font-semibold">Your next steps</h2></div><a href="#tasks" className="text-xs font-bold text-[#167986] hover:underline">View all</a></div><div className="mt-4 space-y-3">{upcomingTasks.map((task) => <button type="button" key={task.id} onClick={() => openEditTask(task)} className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-slate-50"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold ${task.priority === 'High' ? 'bg-rose-50 text-rose-500' : 'bg-[#eaf4f6] text-[#167986]'}`}>{formatDueDate(task.dueDate).slice(0, 2)}</span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-bold text-[#193247]">{task.title}</span><span className="mt-1 block text-[11px] text-slate-400">{task.course}</span></span><span className="text-slate-300">›</span></button>)}</div></section>
            </div>
          </div>

          <section id="projects" className="mt-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/30 sm:p-6"><div className="flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Collaboration</p><h2 className="mt-2 text-xl font-semibold">Group projects</h2><p className="mt-1 text-xs text-slate-400">Keep shared work moving without extra meetings.</p></div><button type="button" className="hidden text-xs font-bold text-[#167986] hover:underline sm:block">Manage projects →</button></div><div className="mt-5 grid gap-3 md:grid-cols-2">{projects.map((project) => <div className="rounded-2xl border border-slate-100 bg-[#fafbfc] p-4 transition hover:border-slate-200 hover:shadow-sm" key={project.name}><div className="flex items-start gap-3"><div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${project.accent} text-xs font-bold text-white`}>{project.initials}</div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div><p className="truncate text-sm font-bold">{project.name}</p><p className="mt-1 text-xs text-slate-400">{project.course} · {project.members} collaborators</p></div><span className="text-sm font-bold text-[#193247]">{project.progress}%</span></div><div className="mt-5 h-2 rounded-full bg-slate-200"><div className={`h-full rounded-full bg-gradient-to-r ${project.accent}`} style={{ width: `${project.progress}%` }} /></div></div></div><div className="mt-4 flex items-center justify-between"><div className="flex -space-x-2"><span className="grid h-6 w-6 place-items-center rounded-full border-2 border-[#fafbfc] bg-[#dbecef] text-[9px] font-bold text-[#167986]">JD</span><span className="grid h-6 w-6 place-items-center rounded-full border-2 border-[#fafbfc] bg-violet-100 text-[9px] font-bold text-violet-600">AM</span><span className="grid h-6 w-6 place-items-center rounded-full border-2 border-[#fafbfc] bg-amber-100 text-[9px] font-bold text-amber-700">+{project.members - 2}</span></div><button type="button" className="text-xs font-bold text-[#167986] hover:underline">Open workspace →</button></div></div>)}</div></section>

          <footer className="mt-8 flex flex-col justify-between gap-2 pb-3 text-xs text-slate-400 sm:flex-row"><span>StudySync · A calmer way to study together.</span><span>Planning for the week of Nov 23–29, 2026</span></footer>
        </section>
      </div>
    </main>
  )
}
