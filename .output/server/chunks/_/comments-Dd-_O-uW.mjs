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

const m = B("src_routes_comments_tsx--streamComments_createServerFn_handler", "/_serverFn", (t, r) => c.__executeServer(t, r)), c = E({ method: "GET", response: "raw" }).handler(m, async ({ signal: t }) => {
  const r = new ReadableStream({ async start(e) {
    e.enqueue(new TextEncoder().encode(`Connection established
`));
    let o = 0;
    const n = setInterval(() => {
      if (t.aborted) {
        clearInterval(n), e.close();
        return;
      }
      e.enqueue(new TextEncoder().encode(`Event ${++o}: ${(/* @__PURE__ */ new Date()).toISOString()}
`)), o >= 10 && (clearInterval(n), e.close());
    }, 1e3);
    t.addEventListener("abort", () => {
      clearInterval(n), e.close();
    });
  } });
  return new Response(r, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" } });
});

export { m as streamComments_createServerFn_handler };
//# sourceMappingURL=comments-Dd-_O-uW.mjs.map
