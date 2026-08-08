// Flattens the TanStack SPA build into a plain static site:
//   dist/client/**  ->  dist/**
//   dist/client/_shell.html -> dist/index.html
// and drops the server bundle so `dist/` is purely static.
import { cp, rename, rm, readdir, access } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const client = path.join(dist, "client");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

if (await exists(client)) {
  for (const entry of await readdir(client)) {
    await rm(path.join(dist, entry), { recursive: true, force: true });
    await cp(path.join(client, entry), path.join(dist, entry), { recursive: true });
  }
  await rm(client, { recursive: true, force: true });
}

await rm(path.join(dist, "server"), { recursive: true, force: true });

const shell = path.join(dist, "_shell.html");
const index = path.join(dist, "index.html");
if (await exists(shell)) {
  await rm(index, { force: true });
  await rename(shell, index);
}

if (!(await exists(index))) {
  throw new Error("[spa-postbuild] dist/index.html was not produced");
}

// SPA fallback for static hosts that serve 404.html.
await cp(index, path.join(dist, "404.html"));

console.log("[spa-postbuild] static SPA ready at dist/index.html");
