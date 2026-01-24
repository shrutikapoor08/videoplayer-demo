import { createFileRoute, lazyRouteComponent, createRootRoute, HeadContent, Outlet, Scripts, RouterProvider, createRouter } from '@tanstack/react-router';
import { jsx, jsxs } from 'react/jsx-runtime';
import { c } from 'react/compiler-runtime';
import { Sun, Moon } from 'lucide-react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import z from 'tiny-invariant';
import { isPlainObject, isRedirect, isNotFound, joinPaths, trimPath, processRouteTree, isResolvedRedirect, rootRouteId, getMatchedRoutes } from '@tanstack/router-core';
import { mergeHeaders, json } from '@tanstack/router-core/ssr/client';
import { AsyncLocalStorage } from 'node:async_hooks';
import { createMemoryHistory } from '@tanstack/history';
import { attachRouterServerSsrUtils } from '@tanstack/router-core/ssr/server';
import { defineHandlerCallback, renderRouterToStream } from '@tanstack/react-router/ssr/server';

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}
function toWebRequest(event) {
  return event.web?.request || new Request(getRequestURL(event), {
    // @ts-ignore Undici option
    duplex: "half",
    method: event.method,
    headers: event.headers,
    body: getRequestWebStream(event)
  });
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseHeaders(event) {
  return event.node.res.getHeaders();
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    // Hooks
    __publicField(this, "_onBeforeResponseCalled");
    __publicField(this, "_onAfterResponseCalled");
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}

function Pe(e){return jsx(RouterProvider,{router:e.router})}const ze=defineHandlerCallback(({request:e,router:r,responseHeaders:t})=>renderRouterToStream({request:e,router:r,responseHeaders:t,children:jsx(Pe,{router:r})})),S={stringify:e=>JSON.stringify(e,function(t,n){const o=this[t],s=x.find(i=>i.stringifyCondition(o));return s?s.stringify(o):n}),parse:e=>JSON.parse(e,function(t,n){const o=this[t];if(isPlainObject(o)){const s=x.find(i=>i.parseCondition(o));if(s)return s.parse(o)}return n}),encode:e=>{if(Array.isArray(e))return e.map(t=>S.encode(t));if(isPlainObject(e))return Object.fromEntries(Object.entries(e).map(([t,n])=>[t,S.encode(n)]));const r=x.find(t=>t.stringifyCondition(e));return r?r.stringify(e):e},decode:e=>{if(isPlainObject(e)){const r=x.find(t=>t.parseCondition(e));if(r)return r.parse(e)}return Array.isArray(e)?e.map(r=>S.decode(r)):isPlainObject(e)?Object.fromEntries(Object.entries(e).map(([r,t])=>[r,S.decode(t)])):e}},b=(e,r,t,n)=>({key:e,stringifyCondition:r,stringify:o=>({[`$${e}`]:t(o)}),parseCondition:o=>Object.hasOwn(o,`$${e}`),parse:o=>n(o[`$${e}`])}),x=[b("undefined",e=>e===void 0,()=>0,()=>{}),b("date",e=>e instanceof Date,e=>e.toISOString(),e=>new Date(e)),b("error",e=>e instanceof Error,e=>({...e,message:e.message,stack:e.stack,cause:e.cause}),e=>Object.assign(new Error(e.message),e)),b("formData",e=>e instanceof FormData,e=>{const r={};return e.forEach((t,n)=>{const o=r[n];o!==void 0?Array.isArray(o)?o.push(t):r[n]=[o,t]:r[n]=t;}),r},e=>{const r=new FormData;return Object.entries(e).forEach(([t,n])=>{Array.isArray(n)?n.forEach(o=>r.append(t,o)):r.append(t,n);}),r}),b("bigint",e=>typeof e=="bigint",e=>e.toString(),e=>BigInt(e)),b("server-function",e=>typeof e=="function"&&"functionId"in e&&typeof e.functionId=="string",({functionId:e})=>({functionId:e,__serverFn:true}),e=>e)],ee=new AsyncLocalStorage;async function De(e,r){return ee.run(e,r)}function Ue(e){const r=ee.getStore();if(!r&&(e==null?void 0:e.throwIfNotFound)!==false)throw new Error("No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");return r}const Be=[],Je=()=>{var e;return (e=Ue({throwIfNotFound:false}))==null?void 0:e.router};function E(e,r){const t=r||e||{};return typeof t.method>"u"&&(t.method="GET"),{options:t,middleware:n=>E(void 0,Object.assign(t,{middleware:n})),validator:n=>E(void 0,Object.assign(t,{validator:n})),type:n=>E(void 0,Object.assign(t,{type:n})),handler:(...n)=>{const[o,s]=n;Object.assign(t,{...o,extractedFn:o,serverFn:s});const i=[...t.middleware||[],qe(t)];return Object.assign(async a=>G(i,"client",{...o,...t,data:a==null?void 0:a.data,headers:a==null?void 0:a.headers,signal:a==null?void 0:a.signal,context:{},router:Je()}).then(c=>{if(t.response==="full")return c;if(c.error)throw c.error;return c.result}),{...o,__executeServer:async(a,c)=>{const d=a instanceof FormData?Ge(a):a;d.type=typeof t.type=="function"?t.type(d):t.type;const p={...o,...d,signal:c},f=()=>G(i,"server",p).then(u=>({result:u.result,error:u.error,context:u.sendContext}));if(p.type==="static"){let u;if(_!=null&&_.getItem&&(u=await _.getItem(p)),u||(u=await f().then(R=>({ctx:R,error:null})).catch(R=>({ctx:void 0,error:R})),_!=null&&_.setItem&&await _.setItem(p,u)),z(u,"No response from both server and static cache!"),u.error)throw u.error;return u.ctx}return f()}})}}}async function G(e,r,t){const n=k([...Be,...e]),o=async s=>{const i=n.shift();if(!i)return s;i.options.validator&&(r!=="client"||i.options.validateClient)&&(s.data=await Ze(i.options.validator,s.data));const a=r==="client"?i.options.client:i.options.server;return a?Ve(a,s,async c=>o(c).catch(d=>{if(isRedirect(d)||isNotFound(d))return {...c,error:d};throw d})):o(s)};return o({...t,headers:t.headers||{},sendContext:t.sendContext||{},context:t.context||{}})}let _;function We(e){const r=_;return _=typeof e=="function"?e():e,()=>{_=r;}}async function Ye(e){const r=new TextEncoder().encode(e),t=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(t)).map(s=>s.toString(16).padStart(2,"0")).join("")}We(()=>{const e=async(n,o)=>`/__tsr/staticServerFnCache/${await Ye(`${n.functionId}__${o}`)}.json`,r=n=>JSON.stringify(n??"",(i,a)=>a&&typeof a=="object"&&!Array.isArray(a)?Object.keys(a).sort().reduce((c,d)=>(c[d]=a[d],c),{}):a).replace(/[/\\?%*:|"<>]/g,"-").replace(/\s+/g,"_"),t=typeof document<"u"?new Map:null;return {getItem:async n=>{if(typeof document>"u"){const o=r(n.data),s=await e(n,o),i="/Users/shrutikapoor/Development/videoplayer-demo/.output/public",{promises:a}=await import('node:fs'),d=(await import('node:path')).join(i,s),[p,f]=await a.readFile(d,"utf-8").then(u=>[S.parse(u),null]).catch(u=>[null,u]);if(f&&f.code!=="ENOENT")throw f;return p}},setItem:async(n,o)=>{const{promises:s}=await import('node:fs'),i=await import('node:path'),a=r(n.data),c=await e(n,a),p=i.join("/Users/shrutikapoor/Development/videoplayer-demo/.output/public",c);await s.mkdir(i.dirname(p),{recursive:true}),await s.writeFile(p,S.stringify(o));},fetchItem:async n=>{const o=r(n.data),s=await e(n,o);let i=t==null?void 0:t.get(s);return i||(i=await fetch(s,{method:"GET"}).then(a=>a.text()).then(a=>S.parse(a)),t==null||t.set(s,i)),i}}});function Ge(e){const r=e.get("__TSR_CONTEXT");if(e.delete("__TSR_CONTEXT"),typeof r!="string")return {context:{},data:e};try{return {context:S.parse(r),data:e}}catch{return {data:e}}}function k(e){const r=new Set,t=[],n=o=>{o.forEach(s=>{s.options.middleware&&n(s.options.middleware),r.has(s)||(r.add(s),t.push(s));});};return n(e),t}const Ve=async(e,r,t)=>e({...r,next:async(n={})=>t({...r,...n,context:{...r.context,...n.context},sendContext:{...r.sendContext,...n.sendContext??{}},headers:mergeHeaders(r.headers,n.headers),result:n.result!==void 0?n.result:r.response==="raw"?n:r.result,error:n.error??r.error})});function Ze(e,r){if(e==null)return {};if("~standard"in e){const t=e["~standard"].validate(r);if(t instanceof Promise)throw new Error("Async validation not supported");if(t.issues)throw new Error(JSON.stringify(t.issues,void 0,2));return t.value}if("parse"in e)return e.parse(r);if(typeof e=="function")return e(r);throw new Error("Invalid validator type!")}function qe(e){return {_types:void 0,options:{validator:e.validator,validateClient:e.validateClient,client:async({next:r,sendContext:t,...n})=>{var o;const s={...n,context:t,type:typeof n.type=="function"?n.type(n):n.type};n.type;const i=await((o=e.extractedFn)==null?void 0:o.call(e,s));return r(i)},server:async({next:r,...t})=>{var n;const o=await((n=e.serverFn)==null?void 0:n.call(e,t));return r({...t,result:o})}}}}const te=new AsyncLocalStorage;function Xe(e){return defineEventHandler(r=>Ke(r,()=>e(r)))}async function Ke(e,r){return te.run(e,r)}function re(){const e=te.getStore();if(!e)throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");return e}const ne=Symbol("$HTTPEvent");function Qe(e){return typeof e=="object"&&(e instanceof H3Event||(e==null?void 0:e[ne])instanceof H3Event||(e==null?void 0:e.__is_event__)===true)}function oe(e){return function(...r){const t=r[0];return Qe(t)?r[0]=t instanceof H3Event||t.__is_event__?t:t[ne]:r.unshift(re()),e(...r)}}const et=oe(getResponseStatus),tt=oe(getResponseHeaders);const C={routeTree:"tanstack-start-route-tree:v",startManifest:"tanstack-start-manifest:v",serverFnManifest:"tanstack-start-server-fn-manifest:v"};async function U(e){switch(e){case C.routeTree:return await Promise.resolve().then(()=>jt);case C.startManifest:return await import('./_tanstack-start-manifest_v-_QDjGF_g.mjs');case C.serverFnManifest:return await import('./_tanstack-start-server-fn-manifest_v-DFtE_D4u.mjs');default:throw new Error(`Unknown virtual module: ${e}`)}}async function rt(e){const{tsrStartManifest:r}=await U(C.startManifest),t=r(),n=t.routes[rootRouteId]=t.routes[rootRouteId]||{};n.assets=n.assets||[];let o=`import('${t.clientEntry}')`;return globalThis.TSS_INJECTED_HEAD_SCRIPTS&&(o=`${globalThis.TSS_INJECTED_HEAD_SCRIPTS+";"}${o}`),n.assets.push({tag:"script",attrs:{type:"module",suppressHydrationWarning:true,async:true},children:o}),{...t,routes:Object.fromEntries(Object.entries(t.routes).map(([i,a])=>{const{preloads:c,assets:d}=a;return [i,{preloads:c,assets:d}]}))}}function nt(e){return e.replace(/^\/|\/$/g,"")}async function ot(e,r){async function t(o,s){const i=o[s];i&&typeof i=="object"&&await Promise.all(Object.keys(i).map(a=>t(i,a))),r&&(o[s]=await r(s,o[s]));}const n={"":e};return await t(n,""),n[""]}async function st(e,r){if(r&&r.__serverFn===true&&r.functionId){const t=await se(r.functionId);return async(n,o)=>(await t(n??{},o)).result}return r}async function se(e){const{default:r}=await U(C.serverFnManifest),t=r[e];if(!t)throw console.info("serverFnManifest",r),new Error("Server function info not found for "+e);const n=await t.importer();if(!n)throw console.info("serverFnInfo",t),new Error("Server function module not resolved for "+e);const o=n[t.functionName];if(!o)throw console.info("serverFnInfo",t),console.info("fnModule",n),new Error(`Server function module export not resolved for serverFn ID: ${e}`);return o}async function V(e){const r=S.parse(e);return await ot(r,st),r}const at=async({request:e})=>{const r=new AbortController,t=r.signal,n=()=>r.abort();e.signal.addEventListener("abort",n);const o=e.method,s=new URL(e.url,"http://localhost:3000"),i=new RegExp(`${nt("/_serverFn")}/([^/?#]+)`),a=s.pathname.match(i),c=a?a[1]:null,d=Object.fromEntries(s.searchParams.entries()),p="createServerFn"in d;if(typeof c!="string")throw new Error("Invalid server action param for serverFnId: "+c);const u=await se(c),R=["multipart/form-data","application/x-www-form-urlencoded"],T=await(async()=>{try{let l=await(async()=>{if(e.headers.get("Content-Type")&&R.some(y=>{var g;return (g=e.headers.get("Content-Type"))==null?void 0:g.includes(y)}))return z(o.toLowerCase()!=="get","GET requests with FormData payloads are not supported"),await u(await e.formData(),t);if(o.toLowerCase()==="get"){let y=d;return p&&(y=d.payload),y=y&&await V(y),await u(y,t)}const h=await e.text(),m=await V(h);return p?await u(m,t):await u(...m,t)})();return l.result instanceof Response?l.result:!p&&(l=l.result,l instanceof Response)?l:isNotFound(l)?Z(l):new Response(l!==void 0?S.stringify(l):void 0,{status:et(re()),headers:{"Content-Type":"application/json"}})}catch(l){return l instanceof Response?l:isNotFound(l)?Z(l):(console.info(),console.info("Server Fn Error!"),console.info(),console.error(l),console.info(),new Response(S.stringify(l),{status:500,headers:{"Content-Type":"application/json"}}))}})();return e.signal.removeEventListener("abort",n),T};function Z(e){const{headers:r,...t}=e;return new Response(JSON.stringify(t),{status:200,headers:{"Content-Type":"application/json",...r||{}}})}const it={TSS_SHELL:"X-TSS_SHELL"};function ct(e){return mergeHeaders(tt(),{"Content-Type":"text/html; charset=UTF-8"},...e.router.state.matches.map(t=>t.headers))}function ut({createRouter:e}){let r=null,t=null,n;return o=>{const s=globalThis.fetch,i=async({request:a})=>{globalThis.fetch=async function(h,m){function y(w,J){const W=new Request(w,J);return i({request:W})}function g(){return a.headers.get("Origin")||a.headers.get("Referer")||"http://localhost"}if(typeof h=="string"&&h.startsWith("/")){const w=new URL(h,g());return y(w,m)}else if(typeof h=="object"&&"url"in h&&typeof h.url=="string"&&h.url.startsWith("/")){const w=new URL(h.url,g());return y(w,m)}return s(h,m)};const c=new URL(a.url),d=c.href.replace(c.origin,""),p="/",f=await e(),u=createMemoryHistory({initialEntries:[d]}),R=process.env.TSS_PRERENDERING==="true";let T=process.env.TSS_SHELL==="true";R&&!T&&(T=a.headers.get(it.TSS_SHELL)==="true"),f.update({history:u,isShell:T,isPrerendering:R});const l=await(async()=>{try{const h=joinPaths([p,trimPath("/_serverFn"),"/"]);if(d.startsWith(h))return await at({request:a});if(r===null)try{r=await U(C.routeTree),r.serverRouteTree&&(n=processRouteTree({routeTree:r.serverRouteTree,initRoute:(g,w)=>{g.init({originalIndex:w});}}));}catch(g){console.log(g);}const m=()=>De({router:f},async()=>{const w=(a.headers.get("Accept")||"*/*").split(",");if(!["*/*","text/html"].some(he=>w.some(me=>me.trim().startsWith(he))))return json({error:"Only HTML requests are supported here"},{status:500});if(t===null&&(t=await rt({basePath:p})),attachRouterServerSsrUtils(f,t),await f.load(),f.state.redirect)return f.state.redirect;await f.serverSsr.dehydrate();const pe=ct({router:f});return await o({request:a,router:f,responseHeaders:pe})});if(n){const[g,w]=await lt({processedServerRouteTree:n,router:f,request:a,basePath:p,executeRouter:m});if(w)return w}return await m()}catch(h){if(h instanceof Response)return h;throw h}})();if(isRedirect(l)){if(isResolvedRedirect(l))return a.headers.get("x-tsr-redirect")==="manual"?json({...l.options,isSerializedRedirect:true},{headers:l.headers}):l;if(l.options.to&&typeof l.options.to=="string"&&!l.options.to.startsWith("/"))throw new Error(`Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(l.options)}`);if(["params","search","hash"].some(m=>typeof l.options[m]=="function"))throw new Error(`Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(l.options).filter(m=>typeof l.options[m]=="function").map(m=>`"${m}"`).join(", ")}`);const h=f.resolveRedirect(l);return a.headers.get("x-tsr-redirect")==="manual"?json({...l.options,isSerializedRedirect:true},{headers:l.headers}):h}return l};return i}}async function lt(e){var r,t;const o=new URL(e.request.url).pathname,s=getMatchedRoutes({pathname:o,basepath:e.basePath,caseSensitive:true,routesByPath:e.processedServerRouteTree.routesByPath,routesById:e.processedServerRouteTree.routesById,flatRoutes:e.processedServerRouteTree.flatRoutes}),i=e.router.getMatchedRoutes(o,void 0);let a,c=[];if(c=s.matchedRoutes,i.foundRoute&&s.matchedRoutes.length<i.matchedRoutes.length){const d=[...i.matchedRoutes].reverse().find(p=>e.processedServerRouteTree.routesById[p.id]!==void 0);if(d){let p=d.id;c=[];do{const f=e.processedServerRouteTree.routesById[p];if(!f)break;c.push(f),p=(r=f.parentRoute)==null?void 0:r.id;}while(p);c.reverse();}}if(c.length){const d=k(c.flatMap(f=>f.options.middleware).filter(Boolean)).map(f=>f.options.server);if((t=s.foundRoute)!=null&&t.options.methods){const f=Object.keys(s.foundRoute.options.methods).find(u=>u.toLowerCase()===e.request.method.toLowerCase());if(f){const u=s.foundRoute.options.methods[f];u&&(typeof u=="function"?d.push(O(u)):(u._options.middlewares&&u._options.middlewares.length&&d.push(...k(u._options.middlewares).map(R=>R.options.server)),u._options.handler&&d.push(O(u._options.handler))));}}d.push(O(e.executeRouter)),a=(await dt(d,{request:e.request,context:{},params:s.routeParams,pathname:o})).response;}return [c,a]}function O(e){return async({next:r,...t})=>{const n=await e(t);return n?{response:n}:r(t)}}function dt(e,r){let t=-1;const n=async o=>{t++;const s=e[t];if(!s)return o;const i=await s({...o,next:async a=>{const c=await n({...o,...a,context:{...o.context,...(a==null?void 0:a.context)||{}}});return Object.assign(o,N(c))}}).catch(a=>{if(ae(a))return {response:a};throw a});return Object.assign(o,N(i))};return N(n(r))}function N(e){return ae(e)?{response:e}:e}function ae(e){return ft(e)||isRedirect(e)}function ft(e){return e instanceof Response}const pt=create(persist((e,r)=>({isDarkMode:true,toggleTheme:()=>{const t=!r().isDarkMode;e({isDarkMode:t}),document.documentElement.classList.toggle("dark",t);},initializeTheme:()=>{const{isDarkMode:t}=r();document.documentElement.classList.toggle("dark",t);}}),{name:"netflix-theme-storage",onRehydrateStorage:()=>e=>{e&&e.initializeTheme();}})),ht=()=>{const e=c(6),{isDarkMode:r,toggleTheme:t}=pt(),n=`Switch to ${r?"light":"dark"} mode`;let o;e[0]!==r?(o=r?jsx(Sun,{size:20,className:"text-white transition-colors duration-200"}):jsx(Moon,{size:20,className:"text-gray-800 dark:text-white transition-colors duration-200"}),e[0]=r,e[1]=o):o=e[1];let s;return e[2]!==n||e[3]!==o||e[4]!==t?(s=jsx("button",{onClick:t,className:"bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-lg p-2 cursor-pointer transition-all duration-200 flex items-center justify-center backdrop-blur-sm hover:bg-white/20 dark:hover:bg-white/20 hover:-translate-y-0.5 focus:outline-2 focus:outline-red-600 focus:outline-offset-2","aria-label":n,children:o}),e[2]=n,e[3]=o,e[4]=t,e[5]=s):s=e[5],s},mt=()=>{const e=c(2);let r;e[0]===Symbol.for("react.memo_cache_sentinel")?(r=jsx("div",{className:"flex-shrink-0",children:jsx("h1",{className:"text-xl lg:text-4xl font-bold text-red-600",children:"REACTFLIX"})}),e[0]=r):r=e[0];let t;return e[1]===Symbol.for("react.memo_cache_sentinel")?(t=jsx("header",{className:"relative top-0 left-0 right-0 z-[100] py-5 bg-gradient-to-b from-black/70 via-black/30 to-transparent",children:jsxs("div",{className:"max-w-6xl mx-auto px-6 md:px-6 flex justify-between items-center",children:[r,jsx("div",{className:"flex items-center gap-4",children:jsx(ht,{})})]})}),e[1]=t):t=e[1],t},q="/assets/App-BL-pdSKQ.css",M=createRootRoute({head:()=>({meta:[{charSet:"utf-8"},{name:"viewport",content:"width=device-width, initial-scale=1"},{title:"Netflix Clone"},{name:"description",content:"React Netflix Clone Application built by Shruti Kapoor"}],links:[{rel:"preload",href:q,as:"style"},{rel:"stylesheet",href:q},{rel:"icon",href:"/favicon.ico"},{rel:"apple-touch-icon",href:"/logo192.png"},{rel:"manifest",href:"/manifest.json"}]}),component:vt});function vt(){const e=c(2);let r;e[0]===Symbol.for("react.memo_cache_sentinel")?(r=jsx("head",{children:jsx(HeadContent,{})}),e[0]=r):r=e[0];let t;return e[1]===Symbol.for("react.memo_cache_sentinel")?(t=jsxs("html",{lang:"en",className:"dark",children:[r,jsxs("body",{children:[jsxs("div",{id:"root",children:[jsx(mt,{}),jsx(Outlet,{})]}),jsx(Scripts,{})]})]}),e[1]=t):t=e[1],t}function X(e){return e.replace(/^\/|\/$/g,"")}const B=(e,r,t)=>{z(t,"🚨splitImportFn required for the server functions server runtime, but was not provided.");const n=X("/"),o=X(r),s=`${n?`/${n}`:""}/${o}/${e}`;return Object.assign(t,{url:s,functionId:e})},yt=()=>import('./comments-CDn1Ihr3.mjs'),wt=B("src_routes_comments_tsx--streamComments_createServerFn_handler","/_serverFn",(e,r)=>ie.__executeServer(e,r)),ie=E({method:"GET",response:"raw"}).handler(wt,async({signal:e})=>{const r=new ReadableStream({async start(t){t.enqueue(new TextEncoder().encode(`Connection established
`));let n=0;const o=setInterval(()=>{if(e.aborted){clearInterval(o),t.close();return}t.enqueue(new TextEncoder().encode(`Event ${++n}: ${new Date().toISOString()}
`)),n>=10&&(clearInterval(o),t.close());},1e3);e.addEventListener("abort",()=>{clearInterval(o),t.close();});}});return new Response(r,{headers:{"Content-Type":"text/event-stream","Cache-Control":"no-cache",Connection:"keep-alive"}})}),gt=createFileRoute("/comments")({component:lazyRouteComponent(yt,"component"),loader:async()=>{try{return await ie()}catch(e){return console.error("Failed to load comments:",e),{comments:[]}}}}),ce="https://api.themoviedb.org/3/movie",ue="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTdmNTI3N2RjYzExZmU3ZTJjNjM2NmVmOTM1NTM5YiIsIm5iZiI6MTc1MzE2MDI5NC4yODgsInN1YiI6IjY4N2YxYTY2ZjlmY2M5NWI5YWQ5OTVmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yYE6qWd02l2Nf5SqVStFZwAoyImCY2tw9d3MU_3smrw",St=B("src_lib_movieServerFn_ts--getMovies_createServerFn_handler","/_serverFn",(e,r)=>le.__executeServer(e,r)),le=E({method:"GET"}).handler(St,async()=>{try{const e=await fetch(`${ce}/popular`,{headers:{accept:"application/json",Authorization:`Bearer ${ue}`}});if(!e.ok)throw new Error(`Failed to fetch movies: ${e.statusText}`);return {movies:await e.json()}}catch(e){const r=e instanceof Error?e.message:"Unknown error occurred";throw new Error(`Movies fetch failed: ${r}`)}}),Rt=B("src_lib_movieServerFn_ts--getMovieById_createServerFn_handler","/_serverFn",(e,r)=>de.__executeServer(e,r)),de=E({method:"GET"}).handler(Rt,async({data:e})=>{console.log({data:e});const r=e;try{const t=await fetch(`${ce}/${r}?language=en-US`,{headers:{accept:"application/json",Authorization:`Bearer ${ue}`}});if(console.log({response:t}),!t.ok)throw new Error(`Failed to fetch movie: ${t.statusText}`);const n=await t.json();return console.log({video:n}),{video:n}}catch(t){const n=t instanceof Error?t.message:"Unknown error occurred";throw new Error(`Movie fetch failed: ${n}`)}}),_t=()=>import('./index-DP-tBrOQ.mjs'),Tt=()=>import('./index-BzM4CSEy.mjs'),bt=createFileRoute("/")({loader:async()=>{try{return await le()}catch(e){return console.error("Failed to load movies:",e),{movies:{results:[]}}}},component:lazyRouteComponent(Tt,"component"),errorComponent:lazyRouteComponent(_t,"errorComponent")}),Et=()=>import('./movie._id-pVn5xXe4.mjs'),Ct=()=>import('./movie._id-BjKdsTCV.mjs'),It=createFileRoute("/movie/$id")({loader:async({params:e})=>{if(!(e!=null&&e.id))throw new Error("Movie ID is required");return console.log({params:e}),await de({data:e.id})},component:lazyRouteComponent(Ct,"component"),errorComponent:lazyRouteComponent(Et,"errorComponent")}),$t=gt.update({id:"/comments",path:"/comments",getParentRoute:()=>M}),xt=bt.update({id:"/",path:"/",getParentRoute:()=>M}),Ft=It.update({id:"/movie/$id",path:"/movie/$id",getParentRoute:()=>M}),Mt={IndexRoute:xt,CommentsRoute:$t,MovieIdRoute:Ft},fe=M._addFileChildren(Mt)._addFileTypes(),jt=Object.freeze(Object.defineProperty({__proto__:null,routeTree:fe},Symbol.toStringTag,{value:"Module"}));function Ot(){return createRouter({routeTree:fe,scrollRestoration:true})}const Nt=ut({createRouter:Ot})(ze),Xt=Xe(function(e){const r=toWebRequest(e);return Nt({request:r})});

export { bt as R, It as a, E as b, B as c, Xt as default, pt as u };
//# sourceMappingURL=ssr.mjs.map
