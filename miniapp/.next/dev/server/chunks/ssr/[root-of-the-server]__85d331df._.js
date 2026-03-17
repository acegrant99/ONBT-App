module.exports = [
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/lib/shims/noop.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// No-op shim for optional dependencies that should not be bundled at runtime.
const noopShim = {};
const __TURBOPACK__default__export__ = noopShim;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__85d331df._.js.map