o
# Video Player Demo

This project demonstrates how to optimize a video player using React and Vite. It includes features such as movie listing, detail view, and a custom video player component.

## Optimization layers
### Step 0: Unoptimized video player

### Step 1: Analyze bundle size

minify, code split
-     minify: true,
    cssMinify: true,
     autoCodeSplitting: true,
     - View in `http://localhost:4000/` using `npx vite-bundle-analyzer --port 4000`
  - terserOptions -minify : true

- bundle size from 23KB to...
- view in bundle analyser



### Step 2 - React optimizations
1. View components in React Profiler
   
2. React Compiler - `pnpm install -D babel-plugin-react-compiler@rc`
MovieDetail - 5.7ms to render
MovieCard - 2.8ms to render
First - 34 re-renders
Later - 25 re-renders


`vite.config.ts` - 
```
{
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }

```


### Step 3 - SSR
1. Move initial data load to the server. Show no fetch calls being made from the client. 


### Step 4 - Router caching
1. Preload data when mouse is hovered. 
---

### Step 5 - Streaming SSR

1. Plain SSR (blocking)
2. Streaming SSR with suspense boundaries
3. Cache preloading (router caching step)
4. Avoiding waterfalls by co-locating data fetching


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

---

---
1. Suspense.

Step 3 - Lazy load. 
2. Lazy load components, images, videos
3. 3. Lazy Load components

Before
MovieList - 27ms
x
after - 
MovieList - 20ms