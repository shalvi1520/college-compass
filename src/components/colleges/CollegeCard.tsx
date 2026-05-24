import Link from "next/link"
import { MapPin, Star, TrendingUp } from "lucide-react"
import { College } from "@/types"
import { formatFees, formatPackage } from "@/lib/utils"

interface Props {
  college: College
  onCompareToggle: (id: string) => void
  isInCompare: boolean
  canAdd: boolean
}

export default function CollegeCard({ college, onCompareToggle, isInCompare, canAdd }: Props) {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--amber)]/30 transition-all animate-fade-up">

      <div className="relative h-36 overflow-hidden">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover"
          onError={e => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1562774053-701939374585?w=800"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] to-transparent" />
        <span className="absolute top-2 right-2 text-xs bg-[var(--navy)]/80 text-[var(--amber)] px-2 py-1 rounded-md font-medium">
          NIRF #{college.ranking.nirf}
        </span>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-display font-semibold text-white">{college.shortName}</h3>
          <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] mt-1">
            <MapPin className="w-3 h-3" />
            {college.location}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-[var(--navy-700)] rounded-lg p-2">
            <p className="text-xs text-[var(--text-muted)] mb-0.5">Fees</p>
            <p className="text-sm font-medium text-white">{formatFees(college.fees.btech)}</p>
          </div>
          <div className="bg-[var(--navy-700)] rounded-lg p-2">
            <p className="text-xs text-[var(--text-muted)] mb-0.5">Avg Package</p>
            <p className="text-sm font-medium text-white">{formatPackage(college.placements.averagePackage)}</p>
          </div>
        </div>

        {/* rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3 h-3 text-[var(--amber)] fill-[var(--amber)]" />
          <span className="text-sm text-white">{college.rating}</span>
          <span className="text-xs text-[var(--text-muted)]">({college.totalReviews.toLocaleString()} reviews)</span>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/colleges/${college.id}`}
            className="flex-1 text-center bg-[var(--amber)] text-[var(--navy)] text-sm font-semibold py-2 rounded-xl hover:bg-[var(--amber-light)] transition-colors"
          >
            View
          </Link>
          <button
            onClick={() => onCompareToggle(college.id)}
            disabled={!canAdd && !isInCompare}
            className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
              isInCompare
                ? "bg-[var(--amber)]/20 border-[var(--amber)]/50 text-[var(--amber)]"
                : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--amber)]/40 disabled:opacity-30"
            }`}
          >
            {isInCompare ? "✓ Added" : "+ Compare"}
          </button>
        </div>
      </div>
    </div>
  )
}