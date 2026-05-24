// basic types for the app

export interface College {
  id: string
  name: string
  shortName: string
  location: string
  city: string
  state: string
  type: "IIT" | "NIT" | "IIIT" | "Deemed" | "State" | "Central"
  rating: number
  totalReviews: number
  fees: {
    btech: number
    mtech?: number
  }
  placements: {
    averagePackage: number
    highestPackage: number
    placementRate: number
    topRecruiters: string[]
  }
  courses: string[]
  established: number
  ranking: {
    nirf: number
  }
  image: string
  description: string
  highlights: string[]
  cutoffs: {
    exam: "JEE Advanced" | "JEE Mains"
    generalRank: number
    obcRank?: number
    scRank?: number
  }[]
}

// for the filter state on listing page
export interface FilterState {
  search: string
  type: string[]
  state: string[]
  minRating: number
  sortBy: "ranking" | "fees" | "rating" | "placement"
}