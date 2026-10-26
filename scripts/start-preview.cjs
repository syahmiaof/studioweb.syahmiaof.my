#!/usr/bin/env node
const http = require("node:http");
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const HOST = "127.0.0.1";
const PORT = 3461;
const URL = `http://${HOST}:${PORT}`;
const projectRoot = process.cwd();

function checkPort(host, port) {
  return new Promise((resolve) => {
    const req = http.get(`http://${host}:${port}/`, (res) => {
      resolve({ active: true, statusCode: res.statusCode });
    });
    req.on("error", () => resolve({ active: false }));
    req.setTimeout(1200, () => {
      req.destroy();
      resolve({ active: false });
    });
  });
}

async function main() {
  console.log(`[PREVIEW] Checking local preview server at ${URL}...`);
  const status = await checkPort(HOST, PORT);

  if (status.active) {
    console.log(`[PREVIEW] Active preview server already detected (HTTP ${status.statusCode}) at ${URL}`);
    console.log(`[PREVIEW] You can view the live site in your browser at: ${URL}`);
    process.exit(0);
  }

  const buildDir = path.join(projectRoot, ".next");
  if (!fs.existsSync(buildDir)) {
    console.error("[PREVIEW] Error: Production build not found. Please run 'npm run build' first.");
    process.exit(1);
  }

  console.log(`[PREVIEW] Starting Next.js production server on ${URL}...`);
  const nextCli = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");
  const child = spawn(process.execPath, [nextCli, "start", "-H", HOST, "-p", String(PORT)], {
    cwd: projectRoot,
    stdio: "inherit",
    windowsHide: true,
  });

  child.on("error", (err) => {
    console.error(`[PREVIEW] Failed to start preview server:`, err.message);
    process.exit(1);
  });

  child.on("exit", (code) => {
    console.log(`[PREVIEW] Server process exited with code ${code}`);
    process.exit(code || 0);
  });

  const shutdown = () => {
    console.log("\n[PREVIEW] Shutting down preview server gracefully...");
    child.kill("SIGINT");
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main();
