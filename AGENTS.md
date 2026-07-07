# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- quota-axi is data only.
- It reports local Claude and Codex quota windows, and it must never route, recommend, proxy, intercept, log in, import browser cookies, or mutate provider state.
- Default stdout is compact TOON.
- `--json` emits the normalized model, and `--full` is required before account identity or per-source attempts are shown.
- macOS Claude Keychain reads are skipped by default because they can prompt.
- `--allow-keychain-prompt` is the only v1 opt-in for that behavior.
- Never launch the Claude CLI to probe quota, because that would spend the quota being measured.
- The read-only Codex app-server JSON-RPC probe is the only CLI fallback.
- The cache path is `~/.cache/quota-axi/quotas.json`, or under `$XDG_CACHE_HOME/quota-axi/` when `XDG_CACHE_HOME` is set.
- Cache files must be `0600` and contain only normalized non-secret snapshots.
- Do not cache raw provider responses or credential headers.
- CodexBar is a reference only, not a runtime dependency.
- Substantial translated CodexBar adapter behavior must preserve MIT attribution to Peter Steinberger.

## Development

```sh
pnpm install
pnpm run build
pnpm test
```
