import Link from "next/link"
import { ArrowRight, Search, BarChart3, Target } from "lucide-react"
import { colleges } from "@/data/colleges"
import { formatPackage } from "@/lib/utils"

export default function Home() {
  // show top 3 by nirf ranking on homepage
  const topColleges = [...colleges]
    .sort((a, b) => a.ranking.nirf - b.ranking.nirf)
    .slice(0, 3)

  return (
    <div>

      {/* hero */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight">
          Find Your<br />
          <span className="text-[var(--amber)] italic">Perfect College</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-8 max-w-xl mx-auto">
          Compare fees, placements and rankings across India's top engineering colleges.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/colleges"
            className="flex items-center gap-2 bg-[var(--amber)] text-[var(--navy)] font-semibold px-5 py-3 rounded-xl hover:bg-[var(--amber-light)] transition-colors"
          >
            Browse Colleges <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/predictor"
            className="flex items-center gap-2 border border-[var(--border)] text-white px-5 py-3 rounded-xl hover:border-[var(--amber)]/40 transition-colors"
          >
            Try Predictor
          </Link>
        </div>
      </section>

      {/* quick stats - hardcoded for now */}
      <section className="border-y border-[var(--border)] bg-[var(--navy-800)]">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-display text-3xl font-bold text-[var(--amber)]">20+</p>
            <p className="text-sm text-[var(--text-muted)] mt-1">Top Colleges</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-[var(--amber)]">₹2Cr</p>
            <p className="text-sm text-[var(--text-muted)] mt-1">Highest Package</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-[var(--amber)]">95%</p>
            <p className="text-sm text-[var(--text-muted)] mt-1">Best Placement Rate</p>
          </div>
        </div>
      </section>

      {/* features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-bold text-white text-center mb-10">
          What you can do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: <Search className="w-5 h-5" />,
              title: "Search & Filter",
              desc: "Filter colleges by type, state, fees and ratings",
              href: "/colleges",
            },
            {
              icon: <BarChart3 className="w-5 h-5" />,
              title: "Compare",
              desc: "Compare up to 3 colleges side by side",
              href: "/compare",
            },
            {
              icon: <Target className="w-5 h-5" />,
              title: "Predictor",
              desc: "Enter your rank and see which colleges you can get",
              href: "/predictor",
            },
          ].map(f => (
            <Link
              key={f.title}
              href={f.href}
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5 hover:border-[var(--amber)]/30 transition-colors group"
            >
              <div className="w-10 h-10 bg-[var(--amber)]/10 rounded-xl flex items-center justify-center text-[var(--amber)] mb-3">
                {f.icon}
              </div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-[var(--amber)] transition-colors">
                {f.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)]">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* top 3 colleges preview */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl font-bold text-white">Top Ranked</h2>
          <Link href="/colleges" className="text-sm text-[var(--amber)] hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topColleges.map((c, i) => (
            <Link
              key={c.id}
              href={`/colleges/${c.id}`}
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-4 hover:border-[var(--amber)]/30 transition-colors"
            >
              <span className="font-display text-4xl font-bold text-[var(--amber)]/20">#{i + 1}</span>
              <h3 className="font-semibold text-white mt-1">{c.shortName}</h3>
              <p className="text-xs text-[var(--text-muted)]">{c.city}</p>
              <p className="text-sm text-[var(--text-secondary)] mt-2">
                Avg: {formatPackage(c.placements.averagePackage)}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}