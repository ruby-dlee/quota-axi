quota-axi README polish acceptance report
base: 10b3c46b2f0a3e1d8562b2a3e1d1dbfae09cb5da
head: 40cfc50647675761e5b157436ee4dbee7dcbe754

PASS - README-only change scope: Changed files: README.md
PASS - Verbatim hero tagline near the top: Tagline appears on line 3.
PASS - Every uppercase AXI mention links to axi.md: 3/3 uppercase AXI mentions are linked as [AXI](https://axi.md).
PASS - Hero bullets match the requested labels and quota-axi behavior: First three bullet labels: Official sources, Local first, Token efficient.
PASS - Quick Start examples show TOON and JSON true-shape output without obvious secrets: TOON includes Claude and Codex model-scoped windows; JSON parses with schemaVersion 1 and a model window; no obvious email, API key, account, or org identifiers found.
PASS - Install section recommends the agent skill first and documents global vs project-local install: Install marker offsets: 41, 210, 405, 544, 588, 633.
PASS - Obsolete Attribution section is removed: No Attribution heading or CodexBar reference remains.

Hero excerpt:
<h1 align="center">quota-axi</h1>

<h3 align="center">Your agent needs to be aware of your quota</h3>

<p align="center">
  <a href="https://www.npmjs.com/package/quota-axi"><img alt="npm" src="https://img.shields.io/npm/v/quota-axi?style=flat-square" /></a>
  <a href="https://github.com/kunchenguid/quota-axi/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/kunchenguid/quota-axi/ci.yml?style=flat-square&label=ci" /></a>
  <a href="https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-blue?style=flat-square"><img alt="Platform" src="https://img.shields.io/badge/platform-macOS%20%7C%20Linux%20%7C%20Windows-blue?style=flat-square" /></a>
  <a href="https://x.com/kunchenguid"><img alt="X" src="https://img.shields.io/badge/X-@kunchenguid-black?style=flat-square" /></a>
  <a href="https://discord.gg/Wsy2NpnZDu"><img alt="Discord" src="https://img.shields.io/discord/1439901831038763092?style=flat-square&label=discord" /></a>
</p>

Quota CLI for agents - designed with [AXI](https://axi.md) (Agent eXperience Interface).

Agents need quota state before they choose where work can safely run.
Vendor dashboards are not shaped for shell automation, and local CLIs expose different windows, resets, and auth files.

quota-axi reports local Claude and Codex quota windows in one [AXI](https://axi.md)-shaped call.
It is data only: it never routes, recommends, proxies, intercepts, logs in, imports browser cookies, or mutates provider state.

- **Official sources** - quota-axi reads local Claude and Codex auth files and calls the same first-party usage endpoints the vendor CLIs use, with a read-only Codex app-server probe as fallback.
- **Local first** - everything runs on the machine that holds the credentials; the only network calls are to Anthropic's and OpenAI's own usage endpoints, never a third-party relay.
- **Token efficient** - default stdout is compact TOON so agents spend fewer tokens parsing quota state, with `--json` available when a caller needs the normalized model.

