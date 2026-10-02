import { spawn } from "node:child_process";
import process from "node:process";

const services = [
  { name: "api", cwd: "services/api" },
  { name: "ui", cwd: "apps/ui" },
];

const children = services.map(({ name, cwd }) => {
  const command = process.platform === "win32" ? process.env.ComSpec : "pnpm";
  const args =
    process.platform === "win32"
      ? ["/d", "/s", "/c", "pnpm dev"]
      : ["dev"];
  const child = spawn(command, args, {
    cwd,
    stdio: "inherit",
    shell: false,
  });

  child.on("error", (error) => {
    console.error(`[${name}] failed to start: ${error.message}`);
  });

  child.on("exit", (code, signal) => {
    if (shuttingDown) {
      return;
    }

    const result = signal ? `signal ${signal}` : `code ${code}`;
    console.error(`[${name}] exited with ${result}; stopping the other service.`);
    shutdown(code ?? 1);
  });

  return child;
});

let shuttingDown = false;

function shutdown(exitCode) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }

  setTimeout(() => process.exit(exitCode), 100);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
