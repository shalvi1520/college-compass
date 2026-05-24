"use client"

import { useState } from "react"
import { colleges } from "@/data/colleges"
import { formatFees, formatPackage } from "@/lib/utils"
import { Target, MapPin } from "lucide-react"
import Link from "next/link"

export default function PredictorPage() {
  const [exam, setExam] = useState<"JEE Mains" | "JEE Advanced">("JEE Mains")
  const [rank, setRank] = useState("")
  const [category, setCategory] = useState<"General" | "OBC" | "SC">("General")
  const [results, setResults] = useState<typeof colleges | null>(null)

  function predict() {
    const r = parseInt(rank)
    if (!r || r <= 0) return

    const matched = colleges.filter(c => {
      const cutoff = c.cutoffs.find(cu => cu.exam === exam)
      if (!cutoff) return false

      // get cutoff rank based on category
      let limit = cutoff.generalRank
      if (category === "OBC" && cutoff.obcRank) limit = cutoff.obcRank
      if (category === "SC" && cutoff.scRank) limit = cutoff.scRank

      // giving 20% buffer so more results show up
      return r <= limit * 1.2
    }).sort((a, b) => a.ranking.nirf - b.ranking.nirf)

    setResults(matched)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      <div className="text-center mb-10">
        <div className="w-14 h-14 bg-[var(--amber)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Target className="w-7 h-7 text-[var(--amber)]" />
        </div>
        <h1 className="font-display text-4xl font-bold text-white mb-2">College Predictor</h1>
        <p className="text-[var(--text-muted)]">
          Enter your rank to see which colleges you can likely get into
        </p>
      </div>

      {/* form */}
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1.5">Exam</label>
            <select
              value={exam}
              onChange={e => setExam(e.target.value as typeof exam)}
              className="w-full bg-[var(--navy-700)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[var(--amber)]"
            >
              <option value="JEE Mains">JEE Mains</option>
              <option value="JEE Advanced">JEE Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1.5">Your Rank</label>
            <input
              type="number"
              placeholder="e.g. 5000"
              value={rank}
              onChange={e => setRank(e.target.value)}
              className="w-full bg-[var(--navy-700)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--amber)]"
            />
          </div>
          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1.5">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as typeof category)}
              className="w-full bg-[var(--navy-700)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[var(--amber)]"
            >
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC / ST</option>
            </select>
          </div>
        </div>
        <button
          onClick={predict}
          disabled={!rank || parseInt(rank) <= 0}
          className="w-full bg-[var(--amber)] text-[var(--navy)] font-semibold py-3 rounded-xl hover:bg-[var(--amber-light)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Predict Colleges
        </button>
      </div>

      {/* results */}
      {results !== null && (
        <div>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            {results.length > 0
              ? `Found ${results.length} colleges for rank ${parseInt(rank).toLocaleString()} (${category})`
              : "No colleges found for this rank"}
          </p>
          <div className="space-y-3">
            {results.map((c, i) => (
              <div key={c.id} className="flex items-center gap-4 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 hover:border-[var(--amber)]/20 transition-colors animate-fade-up">
                <span className="font-display text-2xl font-bold text-[var(--amber)]/30 w-8 text-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white">{c.shortName}</p>
                  <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <MapPin className="w-3 h-3" />{c.location}
                  </div>
                  <div className="flex gap-3 mt-1 text-xs text-[var(--text-secondary)]">
                    <span>Avg: {formatPackage(c.placements.averagePackage)}</span>
                    <span>Fees: {formatFees(c.fees.btech)}</span>
                    <span>NIRF #{c.ranking.nirf}</span>
                  </div>
                </div>
                <Link href={`/colleges/${c.id}`} className="text-xs text-[var(--amber)] hover:underline flex-shrink-0">
                  View →
                </Link>
              </div>
            ))}
          </div>

          {results.length === 0 && (
            <div className="text-center py-12 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl">
              <p className="text-[var(--text-secondary)] mb-1">No matches found</p>
              <p className="text-sm text-[var(--text-muted)]">Try a different exam or higher rank range</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}