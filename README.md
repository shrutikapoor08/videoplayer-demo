# Video Player Demo

This project demonstrates how to optimize a video player using React and Vite. It includes features such as movie listing, detail view, and a custom video player component.

## Optimization layers

### Step 0: Unoptimized video player

LCP - 33s
bundle size - 1.76MB

### Step 1: Analyze bundle size and

run `vite bundle analyser` using - `npm run build`

- minified CSS
- minified JS
- code split routes using TS router
- dynamic imported using import()
- Suspensed

LCP - 20s
bundle size - 970KB
target components to optimize - MovieDetail, MovieList, MovieCard

## Features

- Movie list and detail pages
- Custom video player
- Theme toggle (light/dark)
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or above)
- pnpm (recommended)

### Installation

```bash
pnpm install
```

### Running the App

```bash
pnpm dev
```

The app will be available at `http://localhost:3000` by default.

## Project Structure

- `src/components/` - UI components
- `src/data/` - Movie data
- `src/lib/` - Custom hooks and utilities
- `src/routes/` - Route definitions
- `src/store/` - State management

## License

MIT
