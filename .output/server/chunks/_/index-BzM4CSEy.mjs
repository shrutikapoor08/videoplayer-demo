import { jsx, jsxs } from 'react/jsx-runtime';
import { c } from 'react/compiler-runtime';
import { useEffect, useRef, useState } from 'react';
import { R as bt, u as pt } from './ssr.mjs';
import { ChevronRight, ChevronLeft, Play, Star } from 'lucide-react';
import { B, p } from './badge-BSMVLglI.mjs';
import { useNavigate, useRouter } from '@tanstack/react-router';
import 'zustand';
import 'zustand/middleware';
import 'tiny-invariant';
import '@tanstack/router-core';
import '@tanstack/router-core/ssr/client';
import 'node:async_hooks';
import '@tanstack/history';
import '@tanstack/router-core/ssr/server';
import '@tanstack/react-router/ssr/server';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';

const D = () => {
  const o = c(5);
  let e, t;
  o[0] === Symbol.for("react.memo_cache_sentinel") ? (e = jsx("img", { src: "https://res.cloudinary.com/dubc3wnbv/image/upload/v1760360925/hero-background_ksbmpq.jpg", alt: "", className: "absolute inset-0 w-full h-full object-cover", fetchPriority: "high" }), t = jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 z-[1]" }), o[0] = e, o[1] = t) : (e = o[0], t = o[1]);
  let l, i;
  o[2] === Symbol.for("react.memo_cache_sentinel") ? (l = jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 drop-shadow-lg", children: "Unlimited movies, TV shows, and more" }), i = jsx("p", { className: "text-xl font-normal mb-8 opacity-90 drop-shadow-md", children: "Starts at $7.99. Cancel anytime." }), o[2] = l, o[3] = i) : (l = o[2], i = o[3]);
  let s;
  return o[4] === Symbol.for("react.memo_cache_sentinel") ? (s = jsxs("section", { className: "relative min-h-[80vh] flex items-center justify-center overflow-hidden w-full bg-gradient-to-br from-black via-gray-900 to-black", children: [e, t, jsx("div", { className: "relative z-10 text-center max-w-[600px] px-6 flex flex-col items-center w-full", children: jsxs("div", { className: "text-white", children: [l, i, jsxs("button", { className: "bg-red-600 hover:bg-red-700 border-0 rounded-md text-white px-8 py-4 text-lg font-semibold cursor-pointer inline-flex items-center gap-2 transition-all duration-300 ease-out shadow-lg shadow-red-600/30 min-w-[200px] justify-center hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-600/50 focus-visible:outline-2 focus-visible:outline-white/80 focus-visible:outline-offset-2 active:translate-y-0 group", children: ["Restart Your Membership", jsx(ChevronRight, { size: 20, className: "transition-transform duration-200 group-hover:translate-x-1" })] })] }) })] }), o[4] = s) : s = o[4], s;
};
function I(o) {
  const e = c(8);
  let t, l;
  e[0] !== o ? ({ className: t, ...l } = o, e[0] = o, e[1] = t, e[2] = l) : (t = e[1], l = e[2]);
  let i;
  e[3] !== t ? (i = p("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", t), e[3] = t, e[4] = i) : i = e[4];
  let s;
  return e[5] !== l || e[6] !== i ? (s = jsx("div", { "data-slot": "card", className: i, ...l }), e[5] = l, e[6] = i, e[7] = s) : s = e[7], s;
}
const W = "https://image.tmdb.org/t/p/w500/", U = (o) => {
  const e = c(26), { movie: t, onMovieClick: l } = o, [i, s] = useState(false), c$1 = useRouter();
  let f;
  e[0] !== t.id || e[1] !== c$1 ? (f = () => {
    s(true), setTimeout(() => {
      c$1.preloadRoute({ to: "/movie/$id", params: { id: t.id.toString() } });
    }, 200);
  }, e[0] = t.id, e[1] = c$1, e[2] = f) : f = e[2];
  const m = f;
  let b;
  e[3] === Symbol.for("react.memo_cache_sentinel") ? (b = () => s(false), e[3] = b) : b = e[3];
  let u, h;
  e[4] !== t || e[5] !== l ? (u = () => l(t), h = (S) => {
    (S.key === "Enter" || S.key === " ") && l(t);
  }, e[4] = t, e[5] = l, e[6] = u, e[7] = h) : (u = e[6], h = e[7]);
  const w = t != null && t.poster_path ? W + (t == null ? void 0 : t.poster_path) : "/placeholder.svg", N = t == null ? void 0 : t.title;
  let d;
  e[8] !== w || e[9] !== N ? (d = jsx("img", { src: w, alt: N, loading: "lazy", className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 z-10" }), e[8] = w, e[9] = N, e[10] = d) : d = e[10];
  const v = `absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${i ? "opacity-100" : "opacity-0"}`;
  let g;
  e[11] === Symbol.for("react.memo_cache_sentinel") ? (g = jsxs("div", { className: "text-center text-white p-4", children: [jsx(Play, { className: "w-12 h-12 mx-auto mb-2 text-primary" }), jsx("p", { className: "text-sm font-medium", children: "Watch Now" })] }), e[11] = g) : g = e[11];
  let p;
  e[12] !== v ? (p = jsx("div", { className: v, children: g }), e[12] = v, e[13] = p) : p = e[13];
  let x;
  e[14] === Symbol.for("react.memo_cache_sentinel") ? (x = jsx(Star, { className: "w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" }), e[14] = x) : x = e[14];
  let a;
  e[15] !== t.vote_average ? (a = t.vote_average.toFixed(1), e[15] = t.vote_average, e[16] = a) : a = e[16];
  let n;
  e[17] !== a ? (n = jsx("div", { className: "absolute top-2 right-2", children: jsxs(B, { variant: "secondary", className: "bg-black/70 text-white border-none", children: [x, a] }) }), e[17] = a, e[18] = n) : n = e[18];
  let _;
  return e[19] !== m || e[20] !== p || e[21] !== n || e[22] !== u || e[23] !== h || e[24] !== d ? (_ = jsxs(I, { className: "group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl outline-blue-200 bg-card p-0 border-0 md:min-w-[180px] w-[7rem]", role: "button", tabIndex: 0, onMouseEnter: m, onMouseLeave: b, onClick: u, onKeyDown: h, children: [d, p, n] }), e[19] = m, e[20] = p, e[21] = n, e[22] = u, e[23] = h, e[24] = d, e[25] = _) : _ = e[25], _;
}, q = (o) => {
  const e = c(20), { movies: t } = o, l = useRef(null), i = useNavigate(), s = useRouter();
  let c$1;
  e[0] === Symbol.for("react.memo_cache_sentinel") ? (c$1 = (a) => {
    const n = l.current;
    if (n) {
      const _ = a === "left" ? -n.clientWidth : n.clientWidth;
      n.scrollBy({ left: _, behavior: "smooth" });
    }
  }, e[0] = c$1) : c$1 = e[0];
  const f = c$1;
  let m;
  e[1] !== i ? (m = (a) => {
    i({ to: `/movie/${a.id}` });
  }, e[1] = i, e[2] = m) : m = e[2];
  const b = m;
  let u;
  e[3] !== s ? (u = (a) => {
    s.preloadRoute({ to: "/movie/$id", params: { id: a.id.toString() } });
  }, e[3] = s, e[4] = u) : u = e[4];
  const h = u;
  let w;
  e[5] === Symbol.for("react.memo_cache_sentinel") ? (w = () => f("left"), e[5] = w) : w = e[5];
  let N;
  e[6] === Symbol.for("react.memo_cache_sentinel") ? (N = jsx("button", { onClick: w, className: "left-0 top-0 bottom-0 bg-black/50 dark:bg-black/50 hover:bg-black/80 dark:hover:bg-black/80 text-white opacity-100 transition-all duration-300 flex items-center justify-center z-50 mr-2 p-0", children: jsx(ChevronLeft, { size: 24 }) }), e[6] = N) : N = e[6];
  let d;
  if (e[7] !== b || e[8] !== h || e[9] !== t) {
    let a;
    e[11] !== b || e[12] !== h ? (a = (n) => jsx("li", { onMouseEnter: () => h(n), children: jsx(U, { movie: n, onMovieClick: b }) }, n.id), e[11] = b, e[12] = h, e[13] = a) : a = e[13], d = t.map(a), e[7] = b, e[8] = h, e[9] = t, e[10] = d;
  } else d = e[10];
  let v;
  e[14] !== d ? (v = jsx("ul", { ref: l, className: "flex overflow-x-auto overflow-y-visible space-x-4 px-4 md:px-6 py-4 scrollbar-hide relative", children: d }), e[14] = d, e[15] = v) : v = e[15];
  let g;
  e[16] === Symbol.for("react.memo_cache_sentinel") ? (g = () => f("right"), e[16] = g) : g = e[16];
  let p;
  e[17] === Symbol.for("react.memo_cache_sentinel") ? (p = jsx("button", { onClick: g, className: "right-0 top-0 bottom-0 bg-black/50 dark:bg-black/50 hover:bg-black/80 dark:hover:bg-black/80 text-white opacity-100 transition-all duration-300 flex items-center justify-center z-50 ml-2 p-0", children: jsx(ChevronRight, { size: 24 }) }), e[17] = p) : p = e[17];
  let x;
  return e[18] !== v ? (x = jsxs("div", { className: "relative group flex", children: [N, v, p] }), e[18] = v, e[19] = x) : x = e[19], x;
}, F = (o) => {
  const e = c(7), { movies: t } = o, { initializeTheme: l } = pt();
  let i, s;
  e[0] !== l ? (i = () => {
    l();
  }, s = [l], e[0] = l, e[1] = i, e[2] = s) : (i = e[1], s = e[2]), useEffect(i, s);
  let c$1;
  e[3] === Symbol.for("react.memo_cache_sentinel") ? (c$1 = jsx(D, {}), e[3] = c$1) : c$1 = e[3];
  let f;
  e[4] === Symbol.for("react.memo_cache_sentinel") ? (f = jsx("h2", { className: "text-xl md:text-2xl font-semibold px-4 md:px-6 mb-4 pt-8", children: "Trending Now" }), e[4] = f) : f = e[4];
  let m;
  return e[5] !== t ? (m = jsxs("div", { className: "min-h-screen bg-background text-foreground transition-colors duration-300", children: [c$1, jsx("main", { children: jsxs("div", { className: "container mx-auto", children: [f, t.length > 0 ? jsx(q, { movies: t }) : jsx("div", { className: "px-4 md:px-6", children: jsx("p", { className: "text-gray-500", children: "No movies available at the moment." }) })] }) })] }), e[5] = t, e[6] = m) : m = e[6], m;
};
function fe() {
  const o = c(4), { movies: e } = bt.useLoaderData();
  let t;
  o[0] !== e.results ? (t = e.results || [], o[0] = e.results, o[1] = t) : t = o[1];
  let l;
  return o[2] !== t ? (l = jsx(F, { movies: t }), o[2] = t, o[3] = l) : l = o[3], l;
}

export { fe as component };
//# sourceMappingURL=index-BzM4CSEy.mjs.map
