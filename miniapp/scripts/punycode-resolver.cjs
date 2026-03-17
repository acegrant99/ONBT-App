const Module = require('module');
const path = require('path');

// Set NODE_PATH so @tailwindcss/node's enhanced-resolve can find 'tailwindcss'
// when Turbopack passes an empty `from` option (causing the base to resolve to
// the workspace root instead of the miniapp directory).
const miniappNodeModules = path.resolve(__dirname, '..', 'node_modules');
if (!process.env.NODE_PATH || !process.env.NODE_PATH.includes(miniappNodeModules)) {
  process.env.NODE_PATH = process.env.NODE_PATH
    ? `${process.env.NODE_PATH};${miniappNodeModules}`
    : miniappNodeModules;
  Module._initPaths();
}

const originalLoad = Module._load;

Module._load = function patchedLoad(request, parent, isMain) {
  if (request === 'punycode') {
    return originalLoad.call(this, 'punycode/', parent, isMain);
  }

  return originalLoad.call(this, request, parent, isMain);
};
