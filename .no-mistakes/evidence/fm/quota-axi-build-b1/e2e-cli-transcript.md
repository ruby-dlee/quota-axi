# quota-axi v1 end-to-end CLI transcript

Real runs of the built CLI (`node dist/bin/quota-axi.js`) on macOS with the machine's actual local credentials, captured 2026-07-07.
`XDG_CACHE_HOME` was pointed at a throwaway directory so the runs never touched the real user cache.
Identity values (email, account id) are redacted in this transcript; the CLI itself printed them only under `--full`, as designed.

## 1. Help and version

```console
$ quota-axi --help
usage: quota-axi [auth] [flags]
commands[2]:
  (none)=quota, auth
flags[6]:
  --provider <claude,codex>, --json, --full, --allow-keychain-prompt, --help, -v/--version
examples:
  quota-axi
  quota-axi --provider claude
  quota-axi --json
  quota-axi --full
  quota-axi auth
$ echo $?
0

$ quota-axi --version
quota-axi 0.1.0
```

## 2. Default quota report (compact TOON, live credentials)

The machine's on-disk Claude OAuth token is genuinely expired (expired 2026-07-04) and the Keychain copy is skipped by default, so Claude honestly reports `auth_required` while Codex returns fresh oauth data.
Partial success still exits 0.

```console
$ quota-axi
bin: ~/.no-mistakes/worktrees/.../dist/bin/quota-axi.js
description: Report local agent-provider quota windows for routing-aware agents
generatedAt: "2026-07-07T03:35:03.340Z"
providers[2]{provider,plan,source,status,refreshedAt}:
  claude,unknown,unavailable,auth_required,none
  codex,pro,oauth,fresh,"2026-07-07T03:35:03.340Z"
windows[2]{provider,id,label,percentRemaining,resetsAt,state}:
  codex,five_hour,session,97,"2026-07-07T08:03:31.000Z",fresh
  codex,weekly,week,99,"2026-07-14T01:48:49.000Z",fresh
help[3]:
  Run `quota-axi --provider claude --json` for JSON output
  Run `quota-axi --full` to include account and source-attempt details
  Run `quota-axi auth` to inspect local auth source availability without printing secrets
$ echo $?
0
```

The live run completed in 0.49s wall clock.

## 3. `auth` subcommand (source availability, no secret values)

```console
$ quota-axi auth
bin: ~/.no-mistakes/worktrees/.../dist/bin/quota-axi.js
description: Inspect local quota auth sources without printing secret values
auth[4]{provider,source,path,status,error}:
  claude,oauth-file,~/.claude/.credentials.json,expired,none
  claude,keychain,none,skipped,keychain_prompt_required
  codex,auth-json,~/.codex/auth.json,available,none
  codex,cli-rpc,none,available,none
help[1]:
  Run `quota-axi --allow-keychain-prompt auth` to permit macOS Keychain access
$ echo $?
0
```

The `expired` status is correct: the file's `expiresAt` is 2026-07-04T00:56:20.937Z, in the past.
No Keychain prompt appeared because `--allow-keychain-prompt` was not passed.

## 4. `--json` (normalized model, identity redacted by default)

Note: no `account` and no `attempts` fields appear without `--full`.

```console
$ quota-axi --json
{
  "generatedAt": "2026-07-07T03:35:49.937Z",
  "schemaVersion": 1,
  "providers": [
    {
      "provider": "claude",
      "label": "Claude",
      "source": "unavailable",
      "windows": [],
      "state": {
        "status": "auth_required",
        "stale": false,
        "error": "Claude sign-in required",
        "sourcesTried": ["oauth-file", "keychain"]
      }
    },
    {
      "provider": "codex",
      "label": "Codex",
      "source": "oauth",
      "plan": "pro",
      "windows": [
        {
          "id": "five_hour",
          "label": "session",
          "kind": "session",
          "percentUsed": 3,
          "resetsAt": "2026-07-07T08:03:31.000Z",
          "windowSeconds": 18000,
          "percentRemaining": 97
        },
        {
          "id": "weekly",
          "label": "week",
          "kind": "weekly",
          "percentUsed": 1,
          "resetsAt": "2026-07-14T01:48:49.000Z",
          "windowSeconds": 604800,
          "percentRemaining": 99
        }
      ],
      "credits": { "remaining": 0, "unlimited": false, "unit": "credits" },
      "state": {
        "status": "fresh",
        "stale": false,
        "refreshedAt": "2026-07-07T03:35:49.936Z",
        "sourcesTried": ["oauth"]
      }
    }
  ]
}
$ echo $?
0
```

## 5. `--full` (accounts and per-source attempts appear)

Email and account id below are redacted for this transcript only; the CLI printed the real values, gated behind `--full` as specified.

```console
$ quota-axi --full
bin: ~/.no-mistakes/worktrees/.../dist/bin/quota-axi.js
description: Report local agent-provider quota windows for routing-aware agents
generatedAt: "2026-07-07T03:36:02.457Z"
providers[2]{provider,plan,source,status,refreshedAt}:
  claude,unknown,unavailable,auth_required,none
  codex,pro,oauth,fresh,"2026-07-07T03:36:02.457Z"
windows[2]{provider,id,label,percentRemaining,resetsAt,state}:
  codex,five_hour,session,97,"2026-07-07T08:03:31.000Z",fresh
  codex,weekly,week,99,"2026-07-14T01:48:49.000Z",fresh
accounts[2]{provider,email,organization,accountId}:
  claude,hidden,none,none
  codex,<redacted-email>,none,<redacted-account-id>
attempts[3]{provider,source,status,error}:
  claude,oauth-file,skipped,credentials_expired
  claude,keychain,skipped,keychain_prompt_required
  codex,oauth,success,none
help[3]:
  Run `quota-axi --provider claude --json` for JSON output
  Run `quota-axi --full` to include account and source-attempt details
  Run `quota-axi auth` to inspect local auth source availability without printing secrets
$ echo $?
0
```

## 6. Cache file guarantees

Only the fresh provider snapshot is cached, permissions are `0600` in a `0700` directory, no account identity is persisted, and a scan for credential-like strings finds nothing.

```console
$ ls -l "$XDG_CACHE_HOME/quota-axi/quotas.json"
-rw-------@ ... quotas.json
$ stat -f "%Lp" "$XDG_CACHE_HOME/quota-axi"
700
$ grep -ciE 'accessToken|access_token|authorization|bearer|sk-|eyJ' "$XDG_CACHE_HOME/quota-axi/quotas.json"
0
$ cat "$XDG_CACHE_HOME/quota-axi/quotas.json"
{
  "generatedAt": "2026-07-07T03:36:02.459Z",
  "schemaVersion": 1,
  "providers": [
    {
      "provider": "codex",
      "label": "Codex",
      "source": "oauth",
      "windows": [
        { "id": "five_hour", "label": "session", "kind": "session", "percentUsed": 3, "percentRemaining": 97, "resetsAt": "2026-07-07T08:03:31.000Z", "windowSeconds": 18000 },
        { "id": "weekly", "label": "week", "kind": "weekly", "percentUsed": 1, "percentRemaining": 99, "resetsAt": "2026-07-14T01:48:49.000Z", "windowSeconds": 604800 }
      ],
      "state": { "status": "fresh", "stale": false, "sourcesTried": ["oauth"], "refreshedAt": "2026-07-07T03:36:02.457Z" },
      "plan": "pro",
      "credits": { "remaining": 0, "unlimited": false, "unit": "credits" }
    }
  ]
}
```

## 7. Stale-cache fallback

Same cache, but run with an empty `$HOME` (no credentials), `CODEX_HOME` pointing at a nonexistent directory, and a `PATH` without the codex binary.
Codex falls back to the cached snapshot marked `stale`, and the process still exits 0.

```console
$ HOME=/tmp/fake-home CODEX_HOME=/tmp/fake-home/.codex PATH=/usr/bin:/bin quota-axi
...
providers[2]{provider,plan,source,status,refreshedAt}:
  claude,unknown,unavailable,auth_required,none
  codex,pro,cache,stale,"2026-07-07T03:36:02.457Z"
windows[2]{provider,id,label,percentRemaining,resetsAt,state}:
  codex,five_hour,session,97,"2026-07-07T08:03:31.000Z",stale
  codex,weekly,week,99,"2026-07-14T01:48:49.000Z",stale
...
$ echo $?
0
```

## 8. Exit codes: all providers failed, and usage errors

```console
$ HOME=/tmp/fake-home CODEX_HOME=/tmp/fake-home/.codex PATH=/usr/bin:/bin XDG_CACHE_HOME=/tmp/fake-home/empty-cache quota-axi
...
providers[2]{provider,plan,source,status,refreshedAt}:
  claude,unknown,unavailable,auth_required,none
  codex,unknown,unavailable,error,none
windows[0]:
...
$ echo $?
1

$ quota-axi --bogus-flag
error: "unknown argument: --bogus-flag"
code: usage
help[1]:
  Run `quota-axi --help` for supported commands and flags
$ echo $?
2
```

## 9. Claude fresh path (hermetic, real dist code, stubbed network)

The live machine cannot show a fresh Claude window without a Keychain prompt (on-disk token expired), so this run drives the built `dist/src/cli.js` with a fixture credential file in a fake `$HOME` and a stubbed `fetch` returning the repository's `test/fixtures/claude/oauth.json` payload.
Everything else (credential file discovery, expiry validation, normalization, TOON rendering, cache write) is the real shipped code.

```console
$ HOME=$HARNESS/home XDG_CACHE_HOME=$HARNESS/cache node run.mjs   # calls main(["--provider","claude"])
bin: quota-axi
description: Report local agent-provider quota windows for routing-aware agents
generatedAt: "2026-07-07T03:37:02.530Z"
providers[1]{provider,plan,source,status,refreshedAt}:
  claude,max,oauth,fresh,"2026-07-07T03:37:02.528Z"
windows[4]{provider,id,label,percentRemaining,resetsAt,state}:
  claude,five_hour,session,82,"2026-07-06T22:15:00Z",fresh
  claude,seven_day,week,64,"2026-07-10T16:00:00Z",fresh
  claude,seven_day_opus,opus week,93,"2026-07-11T09:30:00Z",fresh
  claude,extra_usage,extra usage,75,unknown,fresh
help[3]:
  ...
$ echo $?
0
```

## 10. npx install of the packed tarball (README Quick Start shape)

```console
$ npm pack
quota-axi-0.1.0.tgz
$ npx -y -p ./quota-axi-0.1.0.tgz quota-axi --version
quota-axi 0.1.0
$ npx -y -p ./quota-axi-0.1.0.tgz quota-axi auth
bin: ~/.npm/_npx/e8c87c2977205bc5/node_modules/.bin/quota-axi
description: Inspect local quota auth sources without printing secret values
auth[4]{provider,source,path,status,error}:
  claude,oauth-file,~/.claude/.credentials.json,expired,none
  claude,keychain,none,skipped,keychain_prompt_required
  codex,auth-json,~/.codex/auth.json,available,none
  codex,cli-rpc,none,available,none
help[1]:
  Run `quota-axi --allow-keychain-prompt auth` to permit macOS Keychain access
$ echo $?
0
```

## Not exercised live

`--allow-keychain-prompt` was deliberately not run: this validation session is unattended and the flag can pop a macOS GUI Keychain prompt.
Its skip/timeout/denied handling is covered by unit tests (`test/providers/claude-auth.test.ts`) and the default-skip behavior is visible in sections 2, 3, and 5 above.
The codex `cli-rpc` fallback path was not observed live because the oauth path succeeded first (as designed); its JSON-RPC merge logic is covered by `test/providers/codex.test.ts`.
