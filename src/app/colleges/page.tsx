"use client"

import { useState } from "react"
import { colleges } from "@/data/colleges"
import CollegeCard from "@/components/colleges/CollegeCard"
import Link from "next/link"

export default function CollegesPage() {
  const [compareList, setCompareList] = useState<string[]>([])

  function toggleCompare(id: string) {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id)
      if (prev.length >= 3) return prev  // max 3
      return [...prev, id]
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-display text-4xl font-bold text-white mb-2">Engineering Colleges</h1>
      <p className="text-[var(--text-muted)] mb-8">{colleges.length} colleges listed</p>

      {/* TODO: add filters here */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {colleges.map(college => (
          <CollegeCard
            key={college.id}
            college={college}
            onCompareToggle={toggleCompare}
            isInCompare={compareList.includes(college.id)}
            canAdd={compareList.length < 3}
          />
        ))}
      </div>

      {/* compare bar at bottom */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--navy-800)] border-t border-[var(--amber)]/30 px-4 py-3 flex items-center justify-between z-50">
          <p className="text-sm text-white">
            {compareList.length} college{compareList.length > 1 ? "s" : ""} selected
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCompareList([])}
              className="text-xs text-[var(--text-muted)] hover:text-white"
            >
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