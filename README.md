# Simple Next.js Voting App

A minimal Next.js application for voting with SQLite database storage.

## Features

- **Voting Screen**: Submit votes with name and color selection
- **Results Screen**: View graphical representation of vote results
- **SQLite Database**: Persistent storage using better-sqlite3
- **Tailwind CSS**: Modern, responsive UI

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
simple-nextjs/
├── app/
│   ├── api/
│   │   ├── colors/route.ts    # API endpoint for fetching colors
│   │   ├── votes/route.ts      # API endpoint for submitting votes
│   │   └── results/route.ts    # API endpoint for fetching results
│   ├── results/
│   │   └── page.tsx            # Results screen
│   ├── globals.css             # Global styles with Tailwind
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Voting screen (home page)
├── lib/
│   └── db.ts                   # SQLite database initialization
└── votes.db                    # SQLite database file (created automatically)
```

## Database Schema

- **colors**: Stores available color options (Blue, Yellow, Green)
- **votes**: Stores submitted votes with name and color reference

## API Endpoints

- `GET /api/colors` - Get all available colors
- `POST /api/votes` - Submit a new vote
- `GET /api/results` - Get vote results grouped by color

