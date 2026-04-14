# Memories AI Frontend

Production-grade React + TypeScript frontend for an AI-powered memory management system.

## Tech stack

- React (Vite)
- TypeScript
- Tailwind CSS
- Zustand
- React Router
- Axios
- Leaflet (React Leaflet)

## Run

```bash
npm install
npm run dev
```

Set `VITE_API_BASE_URL` to your backend API base URL (default: `http://localhost:8080/api`).

## AI behavior exposed in UI

- AI memory analysis during upload (`/memories/analyze`) with generated description + emotion preview
- Semantic retrieval (`/memories/semantic-search`) via the dashboard search bar
- Similar memory recommendations (`/memories/:id/related`) on detail page
- Emotion and AI-generated description labels on all cards
