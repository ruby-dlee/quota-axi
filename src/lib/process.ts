import { execFile, spawn } from "node:child_process";

export function execFileText(command: string, args: string[], timeoutMs: number): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(command, args, { timeout: timeoutMs, maxBuffer: 1024 * 1024 }, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(String(stdout));
    });
  });
}

export async function commandExists(command: string): Promise<boolean> {
  for (const probe of [
    { command: "command", args: ["-v", command] },
    { command: "which", args: [command] },
  ]) {
    try {
      await execFileText(probe.command, probe.args, 2_000);
      return true;
    } catch {
      // Try the next portable probe.
    }
  }
  return false;
}

export function spawnTextSession(
  command: string,
  args: string[],
  input: (stdin: NodeJS.WritableStream) => void,
  timeoutMs: number,
  ready: (buffer: string) => boolean,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ["pipe", "pipe", "pipe"],
      env: { ...process.env, NO_COLOR: "1", TERM: "dumb" },
    });
    let settled = false;
    let buffer = "";
    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      child.kill("SIGTERM");
      if (error) reject(error);
      else resolve(buffer);
    };
    const timer = setTimeout(() => finish(new Error("command timed out")), timeoutMs);

    child.stdout.on("data", (chunk) => {
      buffer += String(chunk);
      if (ready(buffer)) {
        setTimeout(() => finish(), 300);
      }
    });
    child.stderr.on("data", (chunk) => {
      buffer += String(chunk);
    });
    child.on("error", () => finish(new Error("command unavailable")));
    child.on("exit", () => finish());
    input(child.stdin);
  });
}
