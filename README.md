# IPL Dashboard 2025

A modern dashboard application for tracking the **Indian Premier League (IPL) 2025** cricket tournament. Built with **Next.js**, **React**, **Zustand**, and **TypeScript**.

![Next.js](https://img.shields.io/badge/Next.js-15+-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-4+-9B59B6?logo=zustand&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-06B6D4?logo=tailwindcss&logoColor=white)

## Features

- **Live-Polling Match Updates**: Displays near real-time match information and scores fetched periodically via a central Zustand store.
- **Points Table**: Tracks team standings and detailed performance statistics.
- **Match Schedule**: View upcoming and past matches organized by date.
- **Match Notes**: Displays key events and commentary snippets for the featured match.
- **Real-time Notifications**: Provides updates for new match events using:
  - In-app toasts (via **React Toastify**).
  - Optional browser notifications (requires user permission) for updates when the tab is inactive.
- **Centralized State Management**: Uses **Zustand** for efficient global state handling, data polling, and sharing across pages, minimizing redundant API calls.
- **Responsive Design**: Fully functional on both desktop and mobile devices.

## Screenshots

_(Include screenshots here showing the main dashboard, points table, schedule views, and notifications.)_

## Tech Stack

- **Framework**: Next.js (v15+) with App Router
- **UI Library**: React (v18+)
- **State Management**: Zustand
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Notifications**: React Toastify, Browser Notification API
- **Data Fetching Strategy**: Client-side polling initiated globally, managed via Zustand store, consuming an internal API route (`/api/ipl-data`) for external data.

## Project Structure

```
ipl-dashboard/
├── src/
│ ├── app/                   # App Router structure
│ │ ├── api/                 # API routes
│ │ │ └── ipl-data/          # Endpoint fetching external IPL data sources
│ │ │     route.ts
│ │ ├── components/          # Page-specific UI components
│ │ │ ├── FeaturedMatchCard.tsx
│ │ │ ├── PointsTableSection.tsx
│ │ │ ├── UpcomingMatchesCarousel.tsx
│ │ ├── points-table/        # Points table page
│ │ │ └── page.tsx
│ │ ├── schedule/            # Schedule page
│ │ │ ├── matchCard.tsx
│ │ │ └── page.tsx
│ │ ├── types/               # Shared TypeScript types
│ │ │ └── global.d.ts
│ │ ├── utilities/           # App-level client components/hooks
│ │ │ ├── IplDataInitializer.tsx
│ │ │ └── MatchNoteNotifier.tsx
│ │ ├── globals.css          # Global styles
│ │ ├── layout.tsx           # Root layout
│ │ └── page.tsx             # Home page component
│ ├── lib/                   # Optional: Shared utilities/functions
│ ├── store/                 # Zustand store definition
│ │ └── iplStore.ts          # Contains state, actions, and data-fetching logic
├── public/                  # Static assets (e.g., notification icons)
├── next.config.js           # Next.js configuration (incl. Image remotePatterns)
├── .eslintrc.json           # ESLint configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies
```

## Getting Started

### Prerequisites

- **Node.js** 18.x or later
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shreyas-Dayal/ipl-dashboard.git
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
4. Ensure the external IPL data sources used in `/api/ipl-data/route.ts` are accessible and their format hasn’t changed significantly (parsing logic may be fragile).
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

## State Management with Zustand

This project uses **Zustand** for efficient global state management:

- **Store**: Defined in `src/store/iplStore.ts`, it holds the main application state (`data`, `loading`, `error`, `notificationPermission`).
- **Data Fetching Action**: The `fetchData` action handles data fetching from the `/api/ipl-data` endpoint.
- **Initialization**: The `src/components/IplDataInitializer.tsx` component, placed in the root layout, triggers the initial `fetchData` call and sets up periodic polling.
- **Consumption**: Pages (`/`, `/schedule`, `/points-table`) are Client Components that use the `useIplStore` hook to subscribe to state slices and display data reactively.

## Notifications

The application uses notifications for new match events:

- **In-App Toasts**: Uses **React Toastify** to show brief notifications within the app.
- **Browser Notifications**: If the user grants permission, native browser notifications are displayed when the tab is inactive.
- **Logic**: The `src/components/MatchNoteNotifier.tsx` listens for changes in `matchNotes` from the Zustand store and triggers notifications.

## Image Optimization

This project uses **Next.js `<Image>`** for optimized image loading:

- Always use `<Image />` from `next/image` instead of `<img>`.
- Provide `width`, `height`, and `alt` props for every image.
- Configure `remotePatterns` in `next.config.js` for external image sources:
  ```js
  // next.config.js
  const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "ipl-stats-sports-mechanic.s3.ap-south-1.amazonaws.com",
        },
      ],
    },
  };
  export default nextConfig;
  ```

## API Reference

### GET `/api/ipl-data`

Fetches data from external IPL sources and returns a consolidated JSON response:

- **Returns**:

  - `featuredMatch`: Details of the current or most relevant match.
  - `pointsTable`: Array of team standings.
  - `schedule`: Array of weeks, each containing matches.
  - `matchNotes`: Array of key events for the featured match.

- **Usage**: This endpoint is polled client-side by the Zustand store (`fetchData` action) to update the application's global state.

Example response snippet:

```json
{
  "featuredMatch": { "matchDetails": "..." },
  "pointsTable": [ { "TeamID": "14", "TeamName": "Delhi Capitals" } ],
  "schedule": [ { "date": "10 Apr 2025", "matches": [ ... ] } ],
  "matchNotes": [ { "MatchID": "1825", "Description": "WICKET!" } ]
}
```

---

### Deployment

This application is optimized for deployment on **Vercel**. Follow these steps to deploy:

1. **Connect Your Git Repository to Vercel**
   - Sign in to [Vercel](https://vercel.com) and create a new project.
   - Link your Git repository to Vercel (GitHub, GitLab, or Bitbucket).
2. **Configure Environment Variables**

   - If your project requires environment variables, configure them in the Vercel dashboard.
   - This project currently uses **relative API paths**, so no environment variables are needed at this time.

3. **Build and Output Directory**

   - Vercel automatically detects the build command (`npm run build`) and output directory (`.next`).
   - If not, specify them in the Vercel dashboard.

4. **Deploy!**
   - Click the **Deploy** button, and your application will be live.

---

### Learn More

To dive deeper into the technologies used in this project, check out the following documentation:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Toastify Documentation](https://fkhadra.github.io/react-toastify/introduction)
- [MDN - Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)

---

### License

This project is licensed under the **MIT License**.

---

### Author

Created by [Shreyas](https://github.com/shreyas).
