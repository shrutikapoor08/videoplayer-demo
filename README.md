
# Video Player Demo

This project demonstrates how to optimize a video player using React and Vite. It includes features such as movie listing, detail view, and a custom video player component.

## Optimization layers
Step 0: Unoptimized video player
Step 1: minify, code split
-     minify: true,
    cssMinify: true,
     autoCodeSplitting: true,
     - View in `http://localhost:4000/` using `npx vite-bundle-analyzer --port 4000`
  - terserOptions -minify : true

- bundle size from 23KB to 14KB
- view in bundle analyser



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
