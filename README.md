CollegeCompass

CollegeCompass is a modern college discovery platform designed for engineering aspirants to explore, compare, and analyze engineering colleges across India.

This project was developed as part of the Frontend Engineer assignment for the AI Signal internship selection process.

Live Demo

https://college-compass-lac.vercel.app/

Overview

The platform helps students:
- discover engineering colleges
- compare institutions side-by-side
- explore placement statistics and fee structures
- analyze rankings and cutoff trends
- use filtering and search to narrow choices

The focus of the project was building a polished, scalable, and responsive frontend experience using modern web technologies.

Features

College Discovery
- Browse engineering colleges in a responsive card layout
- View rankings, placements, fees, and ratings
- Dedicated detail pages for each college

Search and Filtering
- Search colleges by name, city, or short name
- Filter by:
  - college type
  - state
  - rating
- Sort colleges by:
  - NIRF ranking
  - fees
  - placement packages
  - ratings

College Detail Pages
- Detailed overview section
- Placement statistics
- Top recruiters
- Programs offered
- Cutoff information
- Quick facts section
- Breadcrumb navigation

College Comparison
- Compare up to three colleges
- Side-by-side comparison workflow
- Sticky compare bar for better usability

Predictor
- Rank-based college exploration interface
- Categorized recommendation workflow

User Experience Enhancements
- Responsive design for all screen sizes
- Empty state handling
- Client-side pagination
- Reusable component architecture
- Smooth UI interactions

Tech Stack

Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS

UI Libraries
- Lucide React

Deployment
- Vercel

Project Structure

```bash
src
│
├── app
│   ├── colleges
│   │   ├── [id]
│   │   │   └── page.tsx
│   │   └── page.tsx
│   │
│   ├── compare
│   ├── predictor
│   └── page.tsx
│
├── components
│   ├── colleges
│   ├── layout
│   └── ui
│
├── data
│   └── colleges.ts
│
├── lib
│   └── utils.ts
│
├── styles
│
└── types
    └── index.ts
```

Installation

Clone the repository:

```bash
git clone https://github.com/shalvi1520/college-compass
```

Navigate to the project directory:

```bash
cd college-compass
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open in browser:

```bash
http://localhost:3000
```

Engineering Decisions

Next.js App Router
The project uses the Next.js App Router architecture for scalable routing and modern React patterns.

TypeScript
TypeScript was used to improve maintainability, enforce type safety, and reduce runtime errors.

Client-side Pagination
Pagination was implemented to improve scalability and rendering performance while keeping the architecture flexible for future API integration.

Responsive Architecture
The UI was designed mobile-first with responsive layouts to ensure usability across devices.

Future Improvements

Potential future enhancements include:
- saved colleges
- recently viewed colleges
- authentication
- backend APIs
- database integration
- real-time cutoff updates
- AI-based recommendations





