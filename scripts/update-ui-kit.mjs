#!/usr/bin/env node
import { execSync } from 'node:child_process';

const version = process.env.npm_config_version;

if (!version) {
  console.error('Usage: pnpm update-ui-kit --version=1.0.1');
  process.exit(1);
}

execSync(`pnpm --filter ui-kit exec npm pkg set version=${version}`, { stdio: 'inherit' });
execSync('pnpm --filter ui-kit run build', { stdio: 'inherit' });
execSync('pnpm --filter "...ui-kit" --filter=!ui-kit run build', { stdio: 'inherit' });

console.log(`UI Kit updated to ${version}. Dependent apps were rebuilt.`);
