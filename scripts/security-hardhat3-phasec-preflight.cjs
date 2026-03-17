#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function readPackageJson() {
  const packagePath = path.join(process.cwd(), 'package.json');
  return JSON.parse(fs.readFileSync(packagePath, 'utf8'));
}

function getInstalledVersion(pkgName) {
  const packagePath = path.join(process.cwd(), 'node_modules', ...pkgName.split('/'), 'package.json');
  if (fs.existsSync(packagePath)) {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    return pkg.version;
  }

  try {
    const pkgPath = require.resolve(`${pkgName}/package.json`, { paths: [process.cwd()] });
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    return pkg.version;
  } catch {
    return null;
  }
}

function hasFoundationPluginSet() {
  const hardhatEthers = getInstalledVersion('@nomicfoundation/hardhat-ethers');
  const hardhatVerify = getInstalledVersion('@nomicfoundation/hardhat-verify');
  const hardhatCore = getInstalledVersion('hardhat');

  return {
    hardhatEthers,
    hardhatVerify,
    hardhatCore,
    ok: Boolean(hardhatEthers && hardhatVerify && hardhatCore),
  };
}

function main() {
  const packageJson = readPackageJson();
  const scripts = packageJson.scripts || {};
  const deps = packageJson.devDependencies || {};
  const projectType = packageJson.type || '(missing)';

  const installCmd = scripts['security:hardhat3:phasec:install'] || '(missing)';
  const compileCmd = scripts['compile:hh3:strict'] || '(missing)';

  const foundationState = hasFoundationPluginSet();

  console.log('Hardhat 3 Phase C preflight');
  console.log(`- install script: ${installCmd}`);
  console.log(`- strict compile script: ${compileCmd}`);
  console.log(`- package.json hardhat target: ${deps.hardhat || '(missing)'}`);
  console.log(`- package.json type: ${projectType}`);
  console.log(`- installed hardhat: ${foundationState.hardhatCore || '(missing)'}`);
  console.log(`- installed @nomicfoundation/hardhat-ethers: ${foundationState.hardhatEthers || '(missing)'}`);
  console.log(`- installed @nomicfoundation/hardhat-verify: ${foundationState.hardhatVerify || '(missing)'}`);

  if (projectType !== 'module') {
    console.log('Preflight: Hardhat 3 requires an ESM project (`"type": "module"`).');
    process.exit(1);
  }

  if (!foundationState.ok) {
    console.log('Preflight: missing one or more Hardhat 3 modules.');
    process.exit(1);
  }

  console.log('Preflight: ready for strict Hardhat 3 compile.');
}

main();
