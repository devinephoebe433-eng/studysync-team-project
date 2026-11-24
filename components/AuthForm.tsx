'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState(mode === 'login' ? 'jordan@studysync.app' : '')
  const [password, setPassword] = useState(mode === 'login' ? 'studysync2026' : '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const response = await fetch(`/api/auth/${mode === 'login' ? 'login' : 'signup'}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name, email, password }) })
    const result = await response.json() as { error?: string }
    if (!response.ok) { setError(result.error ?? 'Something went wrong.'); setLoading(false); return }
    router.push('/')
    router.refresh()
  }

  return <form onSubmit={submit} className="mx-auto mt-8 max-w-sm space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40">
    {mode === 'signup' && <label className="block text-sm font-semibold text-slate-600">Name<input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100" required /></label>}
    <label className="block text-sm font-semibold text-slate-600">Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100" required /></label>
    <label className="block text-sm font-semibold text-slate-600">Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100" minLength={8} required /></label>
    {error && <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">{error}</p>}
    <button disabled={loading} className="w-full rounded-xl bg-[#193247] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#2c4a61] disabled:opacity-50">{loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}</button>
  </form>
}
