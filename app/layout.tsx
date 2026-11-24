import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://studysync-team-project.vercel.app'),
  title: { default: 'StudySync · Student workspace', template: '%s · StudySync' },
  description: 'Organize assignments, deadlines, study sessions, and group projects in one calm workspace.',
  openGraph: { title: 'StudySync · Student workspace', description: 'A calm dashboard for student tasks and group projects.', type: 'website' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><body className="min-h-full">{children}</body></html>
}
