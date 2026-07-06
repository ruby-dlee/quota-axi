<h1 align="center">quota-axi</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/quota-axi"><img alt="npm" src="https://img.shields.io/npm/v/quota-axi?style=flat-square" /></a>
  <a href="https://github.com/kunchenguid/quota-axi/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/kunchenguid/quota-axi/ci.yml?style=flat-square&label=ci" /></a>
  <a href="https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-blue?style=flat-square"><img alt="Platform" src="https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-blue?style=flat-square" /></a>
  <a href="https://x.com/kunchenguid"><img alt="X" src="https://img.shields.io/badge/X-@kunchenguid-black?style=flat-square" /></a>
  <a href="https://discord.gg/Wsy2NpnZDu"><img alt="Discord" src="https://img.shields.io/discord/1439901831038763092?style=flat-square&label=discord" /></a>
</p>

<h3 align="center">Know your local agent quota headroom without turning it into routing advice.</h3>

Agents need quota state before they choose where work can safely run.
Vendor dashboards are not shaped for shell automation, and local CLIs expose different windows, resets, and auth files.

quota-axi reports local Claude and Codex quota windows in one AXI-shaped call.
It is data only: it never routes, recommends, proxies, intercepts, logs in, imports browser cookies, or mutates provider state.

- **Honest comparison ceiling** - quota-axi reports percent-of-window and reset time only.
- **Local first** - it reads local Claude and Codex credentials and calls only first-party provider endpoints.
- **Agent shaped** - default stdout is compact TOON, with JSON available for callers that need the normalized model.

## Quick Start

```sh
$ npx -y quota-axi
bin: ~/.npm/_npx/.../quota-axi
description: Report local agent-provider quota windows for routing-aware agents
generatedAt: 2026-07-06T18:10:00.000Z
providers[2]{provider,plan,source,status,refreshedAt}:
  claude,Pro,oauth,fresh,2026-07-06T18:09:55.000Z
  codex,plus,cli-rpc,fresh,2026-07-06T18:09:58.000Z
windows[4]{provider,id,label,percentRemaining,resetsAt,state}:
  claude,five_hour,session,82,2026-07-06T22:15:00.000Z,fresh
  claude,seven_day,week,64,2026-07-10T16:00:00.000Z,fresh
  codex,five_hour,session,71,2026-07-06T21:45:00.000Z,fresh
  codex,weekly,week,43,2026-07-11T09:00:00.000Z,fresh
```

```sh
$ quota-axi auth
auth[4]{provider,source,path,status,error}:
  claude,oauth-file,~/.claude/.credentials.json,available,none
  claude,keychain,none,skipped,keychain_prompt_required
  codex,auth-json,~/.codex/auth.json,available,none
  codex,cli-rpc,none,available,none
```

## Install

**npm**

```sh
npm install -g quota-axi
```

**Direct use**

```sh
npx -y quota-axi
```

**From source**

```sh
git clone https://github.com/kunchenguid/quota-axi.git
cd quota-axi
pnpm install
pnpm run build
pnpm run dev
```

## How It Works

```
┌────────────┐
│ quota-axi  │
└─────┬──────┘
      ▼
┌───────────────┐
│ claude,codex  │
└─────┬─────────┘
      ▼
┌───────────────┐       ┌──────────────┐
│ local auth    │ ───▶  │ first-party  │
│ files only    │       │ usage APIs   │
└─────┬─────────┘       └──────┬───────┘
      ▼                        ▼
┌───────────────┐       ┌──────────────┐
│ CLI fallback  │ ───▶  │ normalized   │
│ no prompts    │       │ quota model  │
└─────┬─────────┘       └──────┬───────┘
      ▼                        ▼
┌───────────────┐       ┌──────────────┐
│ stale cache   │ ◀───  │ TOON or JSON │
└───────────────┘       └──────────────┘
```

- **Live first** - each provider gets a 15 second live fetch attempt before stale cache fallback.
- **No default Keychain prompt** - macOS Claude Keychain reads are skipped unless `--allow-keychain-prompt` is passed.
- **Partial success is success** - one provider can fail while another returns fresh or stale data, and the process still exits 0.
- **No token equivalence** - quota-axi does not claim that one provider percentage equals another provider percentage.

## CLI Reference

| Command     | Description                                      |
| ----------- | ------------------------------------------------ |
| `quota-axi` | Report Claude and Codex quota windows            |
| `auth`      | Report local auth-source availability, no values |

### Flags

| Flag                        | Description                                                |
| --------------------------- | ---------------------------------------------------------- |
| `--provider claude,codex`   | Scope providers                                            |
| `--json`                    | Emit normalized JSON instead of TOON                       |
| `--full`                    | Include account identity and source attempts               |
| `--allow-keychain-prompt`   | Permit macOS Claude Keychain access that could prompt      |
| `--help`                    | Print terse AXI help                                       |
| `-v`, `-V`, `--version`     | Print version                                              |

## Security Posture

quota-axi reads `~/.claude/.credentials.json`, optional `Claude Code-credentials` from macOS Keychain only with explicit opt-in, and `$CODEX_HOME/auth.json` or `~/.codex/auth.json`.
It may run `claude --allowed-tools ""` for `/usage` and `codex -s read-only -a untrusted app-server` for Codex JSON-RPC fallback.

It sends requests only to Anthropic and OpenAI first-party usage endpoints with the user's local credentials.
It never prints, logs, caches, or transmits credential values.
The cache lives at `~/.cache/quota-axi/quotas.json`, uses `0600` file permissions, and stores normalized non-secret snapshots only.

## Development

```sh
pnpm install       # Install dependencies
pnpm run build    # Compile TypeScript to dist/
pnpm test         # Run fixture parser and CLI tests
pnpm run dev      # Run the CLI with tsx
```

## Attribution

quota-axi is independently implemented from local Baby Menu quota code and public provider behavior references.
Some adapter behavior and rate-limit handling was translated from [CodexBar](https://github.com/steipete/CodexBar), which is MIT licensed by Peter Steinberger.
The CodexBar MIT notice is included in [licenses/CodexBar-MIT.txt](licenses/CodexBar-MIT.txt).

## License

MIT
