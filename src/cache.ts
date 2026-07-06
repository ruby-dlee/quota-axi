import { chmodSync, renameSync, writeFileSync } from "node:fs";
import { cacheFilePath, ensurePrivateParent, readJsonFile } from "./lib/fs.js";
import type { ProviderId, ProviderQuota, QuotaAxiResponse } from "./types.js";

type CachePayload = QuotaAxiResponse;

export function readCachedProvider(provider: ProviderId): ProviderQuota | undefined {
  const raw = readJsonFile(cacheFilePath());
  if (!raw || typeof raw !== "object") return undefined;
  const payload = raw as Partial<CachePayload>;
  if (payload.schemaVersion !== 1 || !Array.isArray(payload.providers)) return undefined;
  const cached = payload.providers.find((item) => item.provider === provider);
  if (!cached || cached.windows.length === 0) return undefined;
  return {
    ...cached,
    source: "cache",
    state: {
      ...cached.state,
      status: "stale",
      stale: true,
      sourcesTried: [...new Set([...cached.state.sourcesTried, "cache"])],
    },
  };
}

export function writeCachedProviders(providers: ProviderQuota[]): void {
  const cacheable = providers
    .filter((provider) => provider.state.status === "fresh" && provider.windows.length > 0)
    .map((provider): ProviderQuota => ({
      ...provider,
      account: undefined,
      attempts: undefined,
      state: {
        ...provider.state,
        error: undefined,
        retryAfter: undefined,
        stale: false,
      },
    }));
  if (cacheable.length === 0) return;

  const file = cacheFilePath();
  ensurePrivateParent(file);
  const temp = `${file}.${process.pid}.tmp`;
  writeFileSync(
    temp,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), schemaVersion: 1, providers: cacheable }, null, 2)}\n`,
    { mode: 0o600 },
  );
  chmodSync(temp, 0o600);
  renameSync(temp, file);
  chmodSync(file, 0o600);
}
