// @ts-ignore Next.js handles CSS imports at build time.
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'GoChina',
  description: 'AI-first China travel planning with on-demand human help.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <Link href="/"><strong>GoChina</strong></Link>
          <div className="navlinks">
            <Link href="/plan">Plan My Trip</Link>
            <Link href="/help">Help Me Now</Link>
            <Link href="/agency-request">Travel Agency</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
