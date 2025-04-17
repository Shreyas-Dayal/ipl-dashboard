# IPL Dashboard 2025

A modern dashboard application for tracking the Indian Premier League (IPL) 2025 cricket tournament. Built with Next.js and React.

![Next.js](https://img.shields.io/badge/Next.js-13+-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-06B6D4?logo=tailwindcss&logoColor=white)

## Features

- **Live Match Updates**: View real-time match information and scores
- **Points Table**: Track team standings and performance statistics
- **Match Schedule**: View upcoming and past matches organized by date
- **Match Notes**: Get detailed information about ongoing matches
- **Responsive Design**: Works on both desktop and mobile devices

## Screenshots

_Screenshots would be included here showing the main dashboard, points table, and schedule views_

## Tech Stack

- **Frontend Framework**: Next.js with App Router
- **UI Library**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: Server-side API routes

## Project Structure

```
ipl-dashboard/
├── src/
│   ├── app/               # App Router components
│   │   ├── api/           # API routes
│   │   │   └── ipl-data/  # IPL data endpoint
│   │   ├── points-table/  # Points table page
│   │   ├── schedule/      # Schedule page
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
├── next.config.js         # Next.js configuration
└── package.json           # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn or pnpm or bun

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ipl-dashboard.git
   cd ipl-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## Image Optimization

This project uses the Next.js Image component for optimized image loading. When adding images, use the `<Image />` component from `next/image` instead of the standard HTML `<img>` tag for better performance:

```jsx
import Image from 'next/image';

// Use this:
<Image src="/path/to/image.jpg" alt="Description" width={300} height={200} />

// Instead of:
<img src="/path/to/image.jpg" alt="Description" />
```

## API Reference

### GET `/api/ipl-data`

Returns data about the IPL tournament including:

- Featured match details
- Points table
- Match schedule
- Match notes for live matches

Example response:

```json
{
  "featuredMatch": {
    "venue": "Rajiv Gandhi International Stadium",
    "time": "16:00 IST",
    "status": "live",
    "team1Code": "PBKS",
    "team2Code": "SRH",
    "...": "..."
  },
  "pointsTable": [...],
  "schedule": [...],
  "matchNotes": [...]
}
```

## Deployment

This application can be deployed on [Vercel](https://vercel.com) for optimal performance with Next.js:

```bash
npm run build
# or
yarn build
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## License

MIT

## Author

Created by Shreyas - [GitHub Profile](https://github.com/yourusername)

Similar code found with 1 license type
