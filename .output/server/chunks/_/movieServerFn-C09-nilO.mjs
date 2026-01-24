import { c as B, b as E } from './ssr.mjs';
import '@tanstack/react-router';
import 'react/jsx-runtime';
import 'react/compiler-runtime';
import 'lucide-react';
import 'zustand';
import 'zustand/middleware';
import 'tiny-invariant';
import '@tanstack/router-core';
import '@tanstack/router-core/ssr/client';
import 'node:async_hooks';
import '@tanstack/history';
import '@tanstack/router-core/ssr/server';
import '@tanstack/react-router/ssr/server';

const s = "https://api.themoviedb.org/3/movie", c = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTdmNTI3N2RjYzExZmU3ZTJjNjM2NmVmOTM1NTM5YiIsIm5iZiI6MTc1MzE2MDI5NC4yODgsInN1YiI6IjY4N2YxYTY2ZjlmY2M5NWI5YWQ5OTVmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yYE6qWd02l2Nf5SqVStFZwAoyImCY2tw9d3MU_3smrw", a = B("src_lib_movieServerFn_ts--getMovies_createServerFn_handler", "/_serverFn", (e, r) => h.__executeServer(e, r)), m = B("src_lib_movieServerFn_ts--getMovieById_createServerFn_handler", "/_serverFn", (e, r) => p.__executeServer(e, r)), h = E({ method: "GET" }).handler(a, async () => {
  try {
    const e = await fetch(`${s}/popular`, { headers: { accept: "application/json", Authorization: `Bearer ${c}` } });
    if (!e.ok) throw new Error(`Failed to fetch movies: ${e.statusText}`);
    return { movies: await e.json() };
  } catch (e) {
    const r = e instanceof Error ? e.message : "Unknown error occurred";
    throw new Error(`Movies fetch failed: ${r}`);
  }
}), p = E({ method: "GET" }).handler(m, async ({ data: e }) => {
  console.log({ data: e });
  const r = e;
  try {
    const o = await fetch(`${s}/${r}?language=en-US`, { headers: { accept: "application/json", Authorization: `Bearer ${c}` } });
    if (console.log({ response: o }), !o.ok) throw new Error(`Failed to fetch movie: ${o.statusText}`);
    const t = await o.json();
    return console.log({ video: t }), { video: t };
  } catch (o) {
    const t = o instanceof Error ? o.message : "Unknown error occurred";
    throw new Error(`Movie fetch failed: ${t}`);
  }
});

export { m as getMovieById_createServerFn_handler, a as getMovies_createServerFn_handler };
//# sourceMappingURL=movieServerFn-C09-nilO.mjs.map
