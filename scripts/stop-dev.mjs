#!/usr/bin/env node
import { execSync } from 'node:child_process';

/** Dev ports from app package.json files plus a small range for Vite auto-fallback. */
const PORTS = [5173, 5174, 5175, 5176, 5177, 5178, 5179, 5180];

function pidsOnPort(port) {
  try {
    const output = execSync(`lsof -ti tcp:${port}`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    if (!output) return [];
    return output.split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

function killPid(pid) {
  const id = Number(pid);
  if (!Number.isFinite(id)) return false;

  try {
    process.kill(id, 'SIGTERM');
    return true;
  } catch {
    try {
      process.kill(id, 'SIGKILL');
      return true;
    } catch {
      return false;
    }
  }
}

const stopped = new Set();

for (const port of PORTS) {
  for (const pid of pidsOnPort(port)) {
    if (stopped.has(pid)) continue;
    if (killPid(pid)) {
      stopped.add(pid);
      console.log(`Stopped process ${pid} (port ${port})`);
    }
  }
}

if (stopped.size === 0) {
  console.log('No dev servers found on ports 5173–5180.');
} else {
  console.log(`Stopped ${stopped.size} process(es).`);
}
