import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"

export const metadata: Metadata = {
  title: "CollegeCompass",
  description: "Find and compare engineering colleges in India",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-[var(--border)] mt-20 py-8 text-center text-sm text-[var(--text-muted)]">
          <p>CollegeCompass — data from public NIRF reports. For reference only.</p>
        </footer>
      </body>
    </html>
  )
}