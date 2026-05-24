"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, Compass } from "lucide-react"

const links = [
  { href: "/colleges", label: "Colleges" },
  { href: "/compare", label: "Compare" },
  { href: "/predictor", label: "Predictor" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[var(--navy)]/90 backdrop-blur border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[var(--amber)] rounded-lg p-1.5">
            <Compass className="w-4 h-4 text-[var(--navy)]" />
          </div>
          <span className="font-display font-semibold text-white">
            College<span className="text-[var(--amber)]">Compass</span>
          </span>
        </Link>

        {/* desktop */}
        <div className="hidden md:flex gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                pathname === link.href
                  ? "bg-[var(--amber)] text-[var(--navy)] font-medium"
                  : "text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* mobile toggle */}
        <button className="md:hidden text-[var(--text-secondary)]" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden px-4 pb-3 space-y-1 border-t border-[var(--border)]">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}