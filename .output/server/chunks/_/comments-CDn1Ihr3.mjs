import { jsx } from 'react/jsx-runtime';
import { c } from 'react/compiler-runtime';

function g() {
  const t = c(1);
  let o;
  return t[0] === Symbol.for("react.memo_cache_sentinel") ? (o = jsx("div", { children: "Comments go here" }), t[0] = o) : o = t[0], o;
}

export { g as component };
//# sourceMappingURL=comments-CDn1Ihr3.mjs.map
