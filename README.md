# AI Memory Manager Frontend

A React + TypeScript + Tailwind + Zustand frontend that simulates an AI-powered memory management workflow.

## Run

```bash
npm install
npm run dev
```

## Architecture

- `src/components`: reusable UI blocks (grid, filters, cards, modal, timeline)
- `src/pages`: dashboard and memory detail views
- `src/services`: fake backend + semantic/AI simulation layer
- `src/store`: Zustand global state and async actions
- `src/types`: shared TypeScript models
