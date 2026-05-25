"use client"

import { useState, useMemo } from "react"
import { colleges } from "@/data/colleges"
import { FilterState } from "@/types"
import CollegeCard from "@/components/colleges/CollegeCard"
import Link from "next/link"
import { Search, X, SlidersHorizontal } from "lucide-react"

const defaultFilters: FilterState = {
  search: "",
  type: [],
  state: [],
  minRating: 0,
  sortBy: "ranking",
}

const allTypes = ["IIT", "NIT", "IIIT", "Deemed", "State"]
const allStates = [...new Set(colleges.map(c => c.state))].sort()

export default function CollegesPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [compareList, setCompareList] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // filter and sort logic
  const filtered = useMemo(() => {
    let list = [...colleges]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q)
      )
    }

    if (filters.type.length > 0) {
      list = list.filter(c => filters.type.includes(c.type))
    }

    if (filters.state.length > 0) {
      list = list.filter(c => filters.state.includes(c.state))
    }

    if (filters.minRating > 0) {
      list = list.filter(c => c.rating >= filters.minRating)
    }

    list.sort((a, b) => {
      if (filters.sortBy === "fees") return a.fees.btech - b.fees.btech
      if (filters.sortBy === "rating") return b.rating - a.rating
      if (filters.sortBy === "placement") return b.placements.averagePackage - a.placements.averagePackage
      return a.ranking.nirf - b.ranking.nirf // default
    })

    return list
  }, [filters])

  function toggleCompare(id: string) {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id)
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }

  function toggleType(type: string) {
    setFilters(f => ({
      ...f,
      type: f.type.includes(type) ? f.type.filter(t => t !== type) : [...f.type, type]
    }))
  }

  function toggleState(state: string) {
    setFilters(f => ({
      ...f,
      state: f.state.includes(state) ? f.state.filter(s => s !== state) : [...f.state, state]
    }))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24">

      <h1 className="font-display text-4xl font-bold text-white mb-2">Engineering Colleges</h1>
      <p className="text-[var(--text-muted)] mb-6">{filtered.length} colleges found</p>

      {/* search bar */}
      <div className="relative mb-4 max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="Search by name, city..."
          value={filters.search}
          onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
          className="w-full pl-9 pr-9 py-2.5 bg-[var(--navy-700)] border border-[var(--border)] rounded-xl text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--amber)]"
        />
        {filters.search && (
          <button
            onClick={() => setFilters(f => ({ ...f, search: "" }))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex gap-6">

        {/* filters - sidebar on desktop, hidden on mobile unless toggled */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 sticky top-20">

            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">Sort</p>
            <div className="space-y-1 mb-4">
              {(["ranking", "fees", "rating", "placement"] as const).map(opt => (
                <button
                  key={opt}
                  onClick={() => setFilters(f => ({ ...f, sortBy: opt }))}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                    filters.sortBy === opt
                      ? "bg-[var(--amber)]/20 text-[var(--amber)]"
                      : "text-[var(--text-secondary)] hover:text-white hover:bg-[var(--navy-700)]"
                  }`}
                >
                  {opt === "ranking" ? "NIRF Rank" : opt === "placement" ? "Avg Package" : opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>

            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">Type</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {allTypes.map(t => (
                <button
                  key={t}
                  onClick={() => toggleType(t)}
                  className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
                    filters.type.includes(t)
                      ? "bg-[var(--amber)]/20 border-[var(--amber)]/40 text-[var(--amber)]"
                      : "border-[var(--border)] text-[var(--text-muted)] hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">State</p>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {allStates.map(s => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.state.includes(s)}
                    onChange={() => toggleState(s)}
                    className="accent-[var(--amber)]"
                  />
                  <span className="text-sm text-[var(--text-secondary)] hover:text-white">{s}</span>
                </label>
              ))}
            </div>

            {(filters.type.length > 0 || filters.state.length > 0) && (
              <button
                onClick={() => setFilters(defaultFilters)}
                className="mt-4 text-xs text-[var(--amber)] hover:underline"
              >
                reset filters
              </button>
            )}
          </div>
        </aside>

        {/* grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <p className="text-[var(--text-muted)] text-center py-20">
              No colleges match your filters
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(college => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  onCompareToggle={toggleCompare}
                  isInCompare={compareList.includes(college.id)}
                  canAdd={compareList.length < 3}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* compare bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--navy-800)] border-t border-[var(--amber)]/30 px-4 py-3 flex items-center justify-between z-50">
          <p className="text-sm text-white">
            {compareList.length}/3 selected
          </p>
          <div className="flex gap-2">
            <button onClick={() => setCompareList([])} className="text-xs text-[var(--text-muted)] hover:text-white">
              clear
            </button>
            <Link
              href={`/compare?ids=${compareList.join(",")}`}
              className="bg-[var(--amber)] text-[var(--navy)] text-sm font-semibold px-4 py-2 rounded-xl"
            >
              Compare →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}