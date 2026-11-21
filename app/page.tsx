const tasks = [
  { title: 'Read chapter 4 and write notes', course: 'Human Biology', date: 'Today', tone: 'rose', done: false },
  { title: 'Submit wireframes for review', course: 'Web Design', date: 'Tomorrow', tone: 'blue', done: false },
  { title: 'Problem set 06', course: 'Calculus II', date: 'Fri, Oct 18', tone: 'amber', done: true },
]

const projects = [
  { name: 'Campus food access study', members: 4, progress: 72, color: 'bg-cyan-500' },
  { name: 'Web design critique', members: 3, progress: 48, color: 'bg-violet-500' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f7f8] text-[#193247]">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="hidden w-[238px] flex-col border-r border-slate-200 bg-white px-5 py-7 lg:flex">
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#193247] text-sm font-bold text-white">S</div>
            <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">StudySync</p><p className="text-sm font-semibold">Student workspace</p></div>
          </div>
          <nav className="space-y-1 text-sm font-medium" aria-label="Main navigation">
            <a className="flex items-center gap-3 rounded-xl bg-[#eaf4f6] px-3 py-3 text-[#167986]" href="#dashboard"><span>⌂</span>Dashboard</a>
            <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-500 hover:bg-slate-50" href="#tasks"><span>✓</span>My tasks <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs">12</span></a>
            <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-500 hover:bg-slate-50" href="#calendar"><span>□</span>Calendar</a>
            <a className="flex items-center gap-3 rounded-xl px-3 py-3 text-slate-500 hover:bg-slate-50" href="#projects"><span>◈</span>Group projects</a>
          </nav>
          <div className="mt-auto rounded-2xl bg-[#f1f7f5] p-4"><p className="text-xs font-semibold text-[#247b72]">Small steps add up.</p><p className="mt-2 text-xs leading-5 text-slate-500">You have completed 68% of this week&apos;s planned work.</p><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white"><div className="h-full w-[68%] rounded-full bg-[#58a59a]" /></div></div>
        </aside>

        <section className="flex-1 px-5 py-6 sm:px-8 lg:px-12 lg:py-9">
          <header className="flex items-center justify-between border-b border-slate-200 pb-5"><div className="lg:hidden"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#167986]">StudySync</p></div><div className="hidden text-sm text-slate-400 sm:block">Wednesday, October 16, 2024</div><div className="flex items-center gap-3"><button className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">⌕ Search</button><div className="grid h-9 w-9 place-items-center rounded-full bg-[#dbecef] text-xs font-bold text-[#167986]">JD</div></div></header>

          <div id="dashboard" className="pt-9"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#167986]">Good morning, Jordan</p><h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#193247] sm:text-4xl">Make room for what matters.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">Your week at a glance, with the next right thing always within reach.</p></div><button className="w-fit rounded-xl bg-[#193247] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#193247]/10">+ Add task</button></div></div>

          <div className="mt-9 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
            <section id="tasks" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/30"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Today&apos;s focus</p><h2 className="mt-2 text-lg font-semibold">Your task list</h2></div><button className="text-xs font-semibold text-[#167986]">View all →</button></div><div className="mt-5 divide-y divide-slate-100">{tasks.map((task) => <div className="flex items-center gap-4 py-4 first:pt-1" key={task.title}><span className={`grid h-5 w-5 place-items-center rounded-full border-2 ${task.done ? 'border-[#58a59a] bg-[#58a59a] text-white' : 'border-slate-300 text-transparent'}`}>✓</span><div className="min-w-0 flex-1"><p className={`truncate text-sm font-semibold ${task.done ? 'text-slate-400 line-through' : 'text-[#193247]'}`}>{task.title}</p><p className="mt-1 text-xs text-slate-400">{task.course}</p></div><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${task.tone === 'rose' ? 'bg-rose-50 text-rose-500' : task.tone === 'blue' ? 'bg-sky-50 text-sky-600' : 'bg-amber-50 text-amber-600'}`}>{task.date}</span></div>)}</div></section>
            <section id="calendar" className="rounded-2xl bg-[#193247] p-5 text-white shadow-lg shadow-[#193247]/10"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9bcbd0]">Next deadline</p><p className="mt-5 text-4xl font-semibold tracking-[-0.06em]">2<span className="ml-1 text-base font-normal text-slate-300">days</span></p></div><span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#bde2df]">On track</span></div><p className="mt-5 text-sm font-semibold">Research methods proposal</p><p className="mt-1 text-xs text-slate-300">Social Science 204 · Friday, Oct 18</p><div className="mt-6 h-1.5 rounded-full bg-white/10"><div className="h-full w-[72%] rounded-full bg-[#7ac6b6]" /></div><p className="mt-2 text-[10px] text-slate-300">72% of prep complete</p></section>
          </div>

          <section id="projects" className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/30"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Collaboration</p><h2 className="mt-2 text-lg font-semibold">Group projects</h2></div><button className="text-xs font-semibold text-[#167986]">See projects →</button></div><div className="mt-5 grid gap-3 md:grid-cols-2">{projects.map((project) => <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4" key={project.name}><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-semibold">{project.name}</p><p className="mt-1 text-xs text-slate-400">{project.members} collaborators</p></div><span className="text-sm font-bold text-[#193247]">{project.progress}%</span></div><div className="mt-5 h-1.5 rounded-full bg-slate-200"><div className={`h-full rounded-full ${project.color}`} style={{ width: `${project.progress}%` }} /></div><button className="mt-4 text-xs font-semibold text-[#167986]">Open workspace →</button></div>)}</div></section>

          <footer className="mt-8 flex flex-col justify-between gap-2 text-xs text-slate-400 sm:flex-row"><span>StudySync · A calmer way to study together.</span><span>Planning for the week of Oct 14–20</span></footer>
        </section>
      </div>
    </main>
  )
}
