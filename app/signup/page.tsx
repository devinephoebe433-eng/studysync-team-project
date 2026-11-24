import Link from 'next/link'
import { AuthForm } from '@/components/AuthForm'

export default function SignupPage() {
  return <main className="min-h-screen bg-[#f6f8fa] px-5 py-12 text-[#193247]"><div className="mx-auto max-w-4xl text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700">StudySync</p><h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Make room for what matters.</h1><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">Create your student workspace and start turning deadlines into a plan.</p><AuthForm mode="signup" /><p className="mt-6 text-sm text-slate-500">Already have an account? <Link href="/login" className="font-bold text-teal-700 hover:underline">Log in</Link></p></div></main>
}
