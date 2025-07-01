import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cursor & Slack Background Agents | Voice-to-Deploy Pipeline',
  description: 'Experience the future of development with AI-powered background agents that transform voice commands into deployed applications through Slack and Cursor integration.',
  keywords: 'cursor, slack, background agents, voice to text, AI development, deployment pipeline',
  authors: [{ name: 'Cursor Background Agents' }],
  openGraph: {
    title: 'Cursor & Slack Background Agents',
    description: 'Voice-to-Deploy Pipeline Demo',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}