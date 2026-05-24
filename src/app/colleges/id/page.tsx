import { colleges } from "@/data/colleges"
import { notFound } from "next/navigation"
import { MapPin, Star, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { formatFees, formatPackage } from "@/lib/utils"

export function generateStaticParams() {
  return colleges.map(c => ({ id: c.id }))
}

export default function CollegeDetail({ params }: { params: { id: string } }) {
  const college = colleges.find(c => c.id === params.id)

  if (!college) notFound()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      <Link href="/colleges" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--amber)] mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      {/* hero image */}
      <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 mb-8">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover"
          onError={e => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1562774053-701939374585?w=800"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)] via-[var(--navy)]/40 to-transparent" />
        <div className="absolute bottom-0 p-6">
          <p className="text-xs text-[var(--amber)] font-medium mb-1 uppercase tracking-wider">{college.type} · NIRF #{college.ranking.nirf}</p>
          <h1 className="font-display text-3xl font-bold text-white">{college.shortName}</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-0.5">{college.name}</p>
          <div className="flex items-center gap-1 mt-2 text-sm text-[var(--text-muted)]">
            <MapPin className="w-3.5 h-3.5" />
            {college.location}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* left col - main content */}
        <div className="lg:col-span-2 space-y-5">

          {/* about */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5">
            <h2 className="font-display text-xl font-semibold text-white mb-3">About</h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{college.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              {college.highlights.map(h => (
                <div key={h} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--amber)] mt-0.5 flex-shrink-0" />
                  {h}
                </div>
              ))}
            </div>
          </div>

          {/* placements */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5">
            <h2 className="font-display text-xl font-semibold text-white mb-4">Placements</h2>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-[var(--navy-700)] rounded-xl p-3 text-center">
                <p className="font-display font-bold text-lg text-[var(--amber)]">{formatPackage(college.placements.averagePackage)}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">Avg Package</p>
              </div>
              <div className="bg-[var(--navy-700)] rounded-xl p-3 text-center">
                <p className="font-display font-bold text-lg text-[var(--amber)]">{formatPackage(college.placements.highestPackage)}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">Highest</p>
              </div>
              <div className="bg-[var(--navy-700)] rounded-xl p-3 text-center">
                <p className="font-display font-bold text-lg text-[var(--amber)]">{college.placements.placementRate}%</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">Placed</p>
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-2">Top Recruiters</p>
            <div className="flex flex-wrap gap-2">
              {college.placements.topRecruiters.map(r => (
                <span key={r} className="px-3 py-1 bg-[var(--navy-700)] border border-[var(--border)] rounded-full text-xs text-[var(--text-secondary)]">
                  {r}
                </span>
              ))}
            </div>
          </div>

          {/* courses */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5">
            <h2 className="font-display text-xl font-semibold text-white mb-3">Programs</h2>
            <div className="flex flex-wrap gap-2">
              {college.courses.map(c => (
                <span key={c} className="px-3 py-1.5 bg-[var(--navy-700)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-secondary)]">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* cutoffs */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5">
            <h2 className="font-display text-xl font-semibold text-white mb-4">Cutoffs</h2>
            {college.cutoffs.map(cutoff => (
              <div key={cutoff.exam} className="bg-[var(--navy-700)] rounded-xl p-4 mb-3">
                <p className="text-sm font-medium text-[var(--amber)] mb-3">{cutoff.exam}</p>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">General</p>
                    <p className="text-white font-medium mt-0.5">{cutoff.generalRank.toLocaleString()}</p>
                  </div>
                  {cutoff.obcRank && (
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">OBC</p>
                      <p className="text-white font-medium mt-0.5">{cutoff.obcRank.toLocaleString()}</p>
                    </div>
                  )}
                  {cutoff.scRank && (
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">SC/ST</p>
                      <p className="text-white font-medium mt-0.5">{cutoff.scRank.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* right col - sidebar */}
        <div className="space-y-4">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-5">
            <h3 className="font-semibold text-white mb-4 text-sm">Quick Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[var(--amber)] fill-[var(--amber)]" />
                  <span className="text-white">{college.rating}/5</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">B.Tech Fees</span>
                <span className="text-white">{formatFees(college.fees.btech)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">NIRF Rank</span>
                <span className="text-white">#{college.ranking.nirf}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Established</span>
                <span className="text-white">{college.established}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Type</span>
                <span className="text-white">{college.type}</span>
              </div>
            </div>
          </div>

          <Link
            href={`/compare?ids=${college.id}`}
            className="block text-center bg-[var(--amber)] text-[var(--navy)] text-sm font-semibold py-3 rounded-xl hover:bg-[var(--amber-light)] transition-colors"
          >
            Compare this college →
          </Link>
        </div>
      </div>
    </div>
  )
}