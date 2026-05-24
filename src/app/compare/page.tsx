"use client"

import { useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import { colleges } from "@/data/colleges"
import { formatFees, formatPackage } from "@/lib/utils"
import { X, Plus } from "lucide-react"
import Link from "next/link"

function CompareContent() {
  const params = useSearchParams()
  const initialIds = params.get("ids")?.split(",").filter(Boolean) ?? []
  const [ids, setIds] = useState<string[]>(initialIds.slice(0, 3))
  const [search, setSearch] = useState("")
  const [picking, setPicking] = useState(false)

  const selected = ids.map(id => colleges.find(c => c.id === id)).filter(Boolean) as typeof colleges

  const pickable = colleges.filter(c =>
    !ids.includes(c.id) &&
    (c.shortName.toLowerCase().includes(search.toLowerCase()) ||
     c.name.toLowerCase().includes(search.toLowerCase()))
  )

  const rows = [
    { label: "NIRF Rank", get: (c: typeof colleges[0]) => `#${c.ranking.nirf}`, num: (c: typeof colleges[0]) => c.ranking.nirf, lower: true },
    { label: "Rating", get: (c: typeof colleges[0]) => `${c.rating}/5`, num: (c: typeof colleges[0]) => c.rating, lower: false },
    { label: "B.Tech Fees", get: (c: typeof colleges[0]) => formatFees(c.fees.btech), num: (c: typeof colleges[0]) => c.fees.btech, lower: true },
    { label: "Avg Package", get: (c: typeof colleges[0]) => formatPackage(c.placements.averagePackage), num: (c: typeof colleges[0]) => c.placements.averagePackage, lower: false },
    { label: "Highest Package", get: (c: typeof colleges[0]) => formatPackage(c.placements.highestPackage), num: (c: typeof colleges[0]) => c.placements.highestPackage, lower: false },
    { label: "Placement %", get: (c: typeof colleges[0]) => `${c.placements.placementRate}%`, num: (c: typeof colleges[0]) => c.placements.placementRate, lower: false },
    { label: "Established", get: (c: typeof colleges[0]) => `${c.established}`, num: (c: typeof colleges[0]) => c.established, lower: true },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-display text-4xl font-bold text-white mb-2">Compare Colleges</h1>
      <p className="text-[var(--text-muted)] mb-8">Pick up to 3 colleges to compare</p>

      {/* college headers */}
      <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `180px repeat(${Math.max(selected.length + (selected.length < 3 ? 1 : 0), 1)}, 1fr)` }}>
        <div />
        {selected.map(c => (
          <div key={c.id} className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 relative text-center">
            <button
              onClick={() => setIds(p => p.filter(i => i !== c.id))}
              className="absolute top-2 right-2 text-[var(--text-muted)] hover:text-red-400"
            >
              <X className="w-4 h-4" />
            </button>
            <img src={c.image} alt={c.name} className="w-full h-20 object-cover rounded-lg mb-2"
              onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1562774053-701939374585?w=800" }}
            />
            <p className="text-xs text-[var(--amber)] mb-0.5">{c.type}</p>
            <p className="font-semibold text-white text-sm">{c.shortName}</p>
            <p className="text-xs text-[var(--text-muted)]">{c.city}</p>
          </div>
        ))}

        {selected.length < 3 && (
          <div
            onClick={() => setPicking(true)}
            className="border-2 border-dashed border-[var(--border)] rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer hover:border-[var(--amber)]/40 group"
          >
            <Plus className="w-7 h-7 text-[var(--text-muted)] group-hover:text-[var(--amber)] mb-1" />
            <p className="text-xs text-[var(--text-muted)] group-hover:text-[var(--amber)]">Add</p>
          </div>
        )}
      </div>

      {/* picker */}
      {picking && (
        <div className="bg-[var(--card-bg)] border border-[var(--amber)]/20 rounded-2xl p-4 mb-6">
          <div className="flex justify-between mb-3">
            <p className="text-sm text-white font-medium">Search college to add</p>
            <button onClick={() => { setPicking(false); setSearch("") }}><X className="w-4 h-4 text-[var(--text-muted)]" /></button>
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Type college name..."
            className="w-full px-3 py-2 bg-[var(--navy-700)] border border-[var(--border)] rounded-xl text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--amber)] mb-3"
          />
          <div className="max-h-44 overflow-y-auto space-y-1">
            {pickable.slice(0, 8).map(c => (
              <button
                key={c.id}
                onClick={() => { setIds(p => [...p, c.id]); setPicking(false); setSearch("") }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--navy-700)] transition-colors text-sm text-[var(--text-secondary)] hover:text-white"
              >
                {c.shortName} <span className="text-[var(--text-muted)] text-xs ml-1">{c.city}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* comparison table */}
      {selected.length > 0 && (
        <div className="space-y-2">
          {rows.map(row => {
            const nums = selected.map(c => row.num(c))
            const best = row.lower ? Math.min(...nums) : Math.max(...nums)
            return (
              <div
                key={row.label}
                className="grid items-center gap-4 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-4 py-3"
                style={{ gridTemplateColumns: `180px repeat(${selected.length}, 1fr)` }}
              >
                <span className="text-sm text-[var(--text-muted)]">{row.label}</span>
                {selected.map(c => {
                  const isWinner = row.num(c) === best && selected.length > 1
                  return (
                    <div key={c.id} className={`text-center py-1.5 rounded-lg ${isWinner ? "bg-[var(--amber)]/10" : ""}`}>
                      <span className={`text-sm font-semibold ${isWinner ? "text-[var(--amber)]" : "text-white"}`}>
                        {row.get(c)}
                      </span>
                      {isWinner && <p className="text-xs text-[var(--amber)]/60 mt-0.5">best</p>}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      )}

      {selected.length === 0 && (
        <div className="text-center py-20 border border-[var(--border)] rounded-2xl">
          <p className="text-[var(--text-secondary)] mb-2">No colleges selected</p>
          <Link href="/colleges" className="text-sm text-[var(--amber)] hover:underline">
            Go pick some colleges →
          </Link>
        </div>
      )}
    </div>
  )
}

export default function ComparePage() {
  return <Suspense><CompareContent /></Suspense>
}