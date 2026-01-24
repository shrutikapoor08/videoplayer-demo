import { jsx, jsxs } from 'react/jsx-runtime';
import { c } from 'react/compiler-runtime';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, Plus } from 'lucide-react';
import { B } from './badge-BSMVLglI.mjs';
import { a as It } from './ssr.mjs';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'zustand';
import 'zustand/middleware';
import 'tiny-invariant';
import '@tanstack/router-core';
import '@tanstack/router-core/ssr/client';
import 'node:async_hooks';
import '@tanstack/history';
import '@tanstack/router-core/ssr/server';
import '@tanstack/react-router/ssr/server';

const ie = "https://image.tmdb.org/t/p/w500/", se = (o) => {
  const e = c(3), { movie: t } = o, n = ie + t.poster_path;
  let a;
  e[0] === Symbol.for("react.memo_cache_sentinel") ? (a = jsx("source", { src: "https://res.cloudinary.com/dubc3wnbv/video/upload/v1757295154/IMG_2779_bax6bk.mov", type: "video/mp4" }), e[0] = a) : a = e[0];
  let i;
  return e[1] !== n ? (i = jsx("div", { className: " bg-black text-white relative", children: jsxs("video", { height: "250px", poster: n, preload: "metadata", "aria-label": "Play movie", className: "w-full lg:h-[550px] sm:h-[250px]", controls: true, children: [a, "Your browser does not support the video tag."] }) }), e[1] = n, e[2] = i) : i = e[2], i;
}, ne = "https://image.tmdb.org/t/p/w500/", ce = "https://image.tmdb.org/t/p/w1280/", de = (o) => {
  const e = c(114), { movie: t } = o;
  if (!t) {
    let u, x;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? (u = jsx("h1", { className: "text-2xl font-bold text-foreground mb-4", children: "Movie not found" }), x = jsx("p", { className: "text-lg text-muted-foreground mb-8 max-w-md", children: "The movie you're looking for doesn't exist or has been removed." }), e[0] = u, e[1] = x) : (u = e[0], x = e[1]);
    let Z;
    return e[2] === Symbol.for("react.memo_cache_sentinel") ? (Z = jsx("div", { className: "max-w-6xl mx-auto px-6 md:px-24 min-h-screen bg-background text-foreground", children: jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-center p-10", children: [u, x, jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 bg-white/10 text-foreground border border-border rounded-lg px-5 py-3 text-sm font-medium cursor-pointer transition-all duration-200 no-underline hover:bg-white/20 hover:-translate-x-1 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2", children: [jsx(ArrowLeft, { size: 16 }), "Back to Home"] })] }) }), e[2] = Z) : Z = e[2], Z;
  }
  let n;
  e[3] !== t.release_date ? (n = t.release_date ? new Date(t.release_date).getFullYear() : "Unknown", e[3] = t.release_date, e[4] = n) : n = e[4];
  const a = n;
  let i;
  e[5] !== t.vote_average ? (i = t.vote_average ? t.vote_average.toFixed(1) : "N/A", e[5] = t.vote_average, e[6] = i) : i = e[6];
  const b = i;
  let s, h, v, c$1, _, w, d, m, N, p, k, y, S, M, f, D, g;
  if (e[7] !== t.backdrop_path || e[8] !== t.poster_path || e[9] !== t.title || e[10] !== t.vote_average || e[11] !== a) {
    h = t.vote_average ? Math.round(t.vote_average / 2) : 0, s = me, N = "max-w-6xl mx-auto px-6 md:px-24 min-h-screen bg-background text-foreground", e[29] === Symbol.for("react.memo_cache_sentinel") ? (p = jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 bg-white/10 text-foreground border border-border rounded-lg px-5 py-3 text-sm font-medium cursor-pointer transition-all duration-200 mb-8 mt-6 no-underline hover:bg-white/20 hover:-translate-x-1 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2", children: [jsx(ArrowLeft, { size: 16 }), "Back to Movies"] }), e[29] = p) : p = e[29], w = "relative min-h-[60vh] rounded-xl overflow-hidden mb-10 bg-gradient-to-br from-[#141414] to-[#2f2f2f]", e[30] !== t.backdrop_path || e[31] !== t.title ? (d = t.backdrop_path && jsx("img", { src: ce + t.backdrop_path, alt: `${t.title} backdrop`, className: "absolute top-0 left-0 w-full h-full object-cover opacity-30", loading: "lazy" }), e[30] = t.backdrop_path, e[31] = t.title, e[32] = d) : d = e[32], e[33] === Symbol.for("react.memo_cache_sentinel") ? (m = jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80" }), e[33] = m) : m = e[33], _ = "relative z-10 p-10 lg:p-15 h-full flex items-center", v = "grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[300px_1fr] gap-10 lg:gap-10 xl:gap-10 items-start w-full";
    const u = ne + t.poster_path, x = `${t.title} poster`;
    e[34] !== u || e[35] !== x ? (c$1 = jsx("div", { className: "lg:sticky lg:top-25 max-w-xs mx-auto lg:mx-0", children: jsx("img", { src: u, alt: x, className: "w-full aspect-[2/3] object-cover rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105", onError: pe, loading: "lazy" }) }), e[34] = u, e[35] = x, e[36] = c$1) : c$1 = e[36], D = "flex-1", e[37] !== t.title ? (g = jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white drop-shadow-lg", children: t.title }), e[37] = t.title, e[38] = g) : g = e[38], M = "flex items-center gap-6 mb-6 flex-wrap", e[39] !== a ? (f = jsx("span", { className: "text-lg text-white/80 font-medium", children: a }), e[39] = a, e[40] = f) : f = e[40], S = "flex items-center gap-2 bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm", k = "text-yellow-400 text-lg", y = "\u2605".repeat(h), e[7] = t.backdrop_path, e[8] = t.poster_path, e[9] = t.title, e[10] = t.vote_average, e[11] = a, e[12] = s, e[13] = h, e[14] = v, e[15] = c$1, e[16] = _, e[17] = w, e[18] = d, e[19] = m, e[20] = N, e[21] = p, e[22] = k, e[23] = y, e[24] = S, e[25] = M, e[26] = f, e[27] = D, e[28] = g;
  } else s = e[12], h = e[13], v = e[14], c$1 = e[15], _ = e[16], w = e[17], d = e[18], m = e[19], N = e[20], p = e[21], k = e[22], y = e[23], S = e[24], M = e[25], f = e[26], D = e[27], g = e[28];
  let L;
  e[41] !== h ? (L = "\u2606".repeat(5 - h), e[41] = h, e[42] = L) : L = e[42];
  let j;
  e[43] !== L || e[44] !== k || e[45] !== y ? (j = jsxs("div", { className: k, children: [y, L] }), e[43] = L, e[44] = k, e[45] = y, e[46] = j) : j = e[46];
  let A;
  e[47] !== b ? (A = jsx("span", { className: "text-white font-semibold text-lg", children: b }), e[47] = b, e[48] = A) : A = e[48];
  let B$1;
  e[49] !== j || e[50] !== A || e[51] !== S ? (B$1 = jsxs("div", { className: S, children: [j, A] }), e[49] = j, e[50] = A, e[51] = S, e[52] = B$1) : B$1 = e[52];
  let R;
  e[53] !== s || e[54] !== t.runtime ? (R = t.runtime && jsx(B, { variant: "secondary", className: "bg-black/60 text-white border-none", children: s(t.runtime) }), e[53] = s, e[54] = t.runtime, e[55] = R) : R = e[55];
  let $;
  e[56] !== B$1 || e[57] !== R || e[58] !== M || e[59] !== f ? ($ = jsxs("div", { className: M, children: [f, B$1, R] }), e[56] = B$1, e[57] = R, e[58] = M, e[59] = f, e[60] = $) : $ = e[60];
  let P;
  e[61] !== t.overview ? (P = t.overview && jsx("p", { className: "text-lg leading-relaxed text-white/90 mb-8 max-w-2xl", children: t.overview }), e[61] = t.overview, e[62] = P) : P = e[62];
  let J;
  e[63] === Symbol.for("react.memo_cache_sentinel") ? (J = jsx("div", { className: "flex gap-4 mb-8 flex-wrap", children: jsxs("button", { className: "inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 rounded-lg px-7 py-3.5 text-base font-medium cursor-pointer transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5", children: [jsx(Plus, { size: 20 }), "Add to List"] }) }), e[63] = J) : J = e[63];
  let T;
  e[64] !== $ || e[65] !== P || e[66] !== D || e[67] !== g ? (T = jsxs("div", { className: D, children: [g, $, P, J] }), e[64] = $, e[65] = P, e[66] = D, e[67] = g, e[68] = T) : T = e[68];
  let z;
  e[69] !== v || e[70] !== c$1 || e[71] !== T ? (z = jsxs("div", { className: v, children: [c$1, T] }), e[69] = v, e[70] = c$1, e[71] = T, e[72] = z) : z = e[72];
  let E;
  e[73] !== _ || e[74] !== z ? (E = jsx("div", { className: _, children: z }), e[73] = _, e[74] = z, e[75] = E) : E = e[75];
  let U;
  e[76] !== w || e[77] !== d || e[78] !== m || e[79] !== E ? (U = jsxs("div", { className: w, children: [d, m, E] }), e[76] = w, e[77] = d, e[78] = m, e[79] = E, e[80] = U) : U = e[80];
  let G;
  e[81] !== t ? (G = jsx("div", { children: jsx(se, { movie: t }) }), e[81] = t, e[82] = G) : G = e[82];
  let Q;
  e[83] === Symbol.for("react.memo_cache_sentinel") ? (Q = jsx("h2", { className: "text-2xl font-bold text-card-foreground mb-6 font-['Poppins']", children: "Movie Details" }), e[83] = Q) : Q = e[83];
  let V;
  e[84] === Symbol.for("react.memo_cache_sentinel") ? (V = jsx("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Release Date" }), e[84] = V) : V = e[84];
  let I;
  e[85] !== t.release_date ? (I = t.release_date ? new Date(t.release_date).toLocaleDateString() : "Unknown", e[85] = t.release_date, e[86] = I) : I = e[86];
  let Y;
  e[87] !== I ? (Y = jsxs("div", { className: "flex flex-col gap-2", children: [V, jsx("span", { className: "text-base text-card-foreground font-medium", children: I })] }), e[87] = I, e[88] = Y) : Y = e[88];
  let W;
  e[89] === Symbol.for("react.memo_cache_sentinel") ? (W = jsx("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Rating" }), e[89] = W) : W = e[89];
  let F;
  e[90] !== b ? (F = jsxs("div", { className: "flex flex-col gap-2", children: [W, jsxs("span", { className: "text-base text-card-foreground font-medium", children: [b, "/10"] })] }), e[90] = b, e[91] = F) : F = e[91];
  let C;
  e[92] !== s || e[93] !== t.runtime ? (C = t.runtime && jsxs("div", { className: "flex flex-col gap-2", children: [jsx("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Duration" }), jsx("span", { className: "text-base text-card-foreground font-medium", children: s(t.runtime) })] }), e[92] = s, e[93] = t.runtime, e[94] = C) : C = e[94];
  let H;
  e[95] !== t.genres ? (H = t.genres && t.genres.length > 0 && jsxs("div", { className: "flex flex-col gap-2", children: [jsx("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Genres" }), jsx("span", { className: "text-base text-card-foreground font-medium", children: t.genres.map(fe).join(", ") })] }), e[95] = t.genres, e[96] = H) : H = e[96];
  let K;
  e[97] !== t.spoken_languages ? (K = t.spoken_languages && t.spoken_languages.length > 0 && jsxs("div", { className: "flex flex-col gap-2", children: [jsx("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Languages" }), jsx("span", { className: "text-base text-card-foreground font-medium", children: t.spoken_languages.map(ge).join(", ") })] }), e[97] = t.spoken_languages, e[98] = K) : K = e[98];
  let O;
  e[99] !== t.production_companies ? (O = t.production_companies && t.production_companies.length > 0 && jsxs("div", { className: "flex flex-col gap-2", children: [jsx("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Production" }), jsx("span", { className: "text-base text-card-foreground font-medium", children: t.production_companies.slice(0, 3).map(ue).join(", ") })] }), e[99] = t.production_companies, e[100] = O) : O = e[100];
  let q;
  e[101] !== Y || e[102] !== F || e[103] !== C || e[104] !== H || e[105] !== K || e[106] !== O ? (q = jsxs("div", { className: "bg-card border border-border rounded-xl p-8 mb-8", children: [Q, jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [Y, F, C, H, K, O] })] }), e[101] = Y, e[102] = F, e[103] = C, e[104] = H, e[105] = K, e[106] = O, e[107] = q) : q = e[107];
  let X;
  return e[108] !== N || e[109] !== p || e[110] !== U || e[111] !== G || e[112] !== q ? (X = jsxs("div", { className: N, children: [p, U, G, q] }), e[108] = N, e[109] = p, e[110] = U, e[111] = G, e[112] = q, e[113] = X) : X = e[113], X;
};
function me(o) {
  const e = Math.floor(o / 60), t = o % 60;
  return `${e}h ${t}m`;
}
function pe(o) {
  o.currentTarget.src = "/placeholder-movie.svg";
}
function fe(o) {
  return o.name;
}
function ge(o) {
  return o.name;
}
function ue(o) {
  return o.name;
}
function Ee() {
  const o = c(2), { video: e } = It.useLoaderData();
  let t;
  return o[0] !== e ? (t = jsx(de, { movie: e }), o[0] = e, o[1] = t) : t = o[1], t;
}

export { Ee as component };
//# sourceMappingURL=movie._id-BjKdsTCV.mjs.map
