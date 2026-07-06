import { describe, expect, it } from "vitest";
import { parseArgs } from "../src/cli.js";
import { redactedResponse } from "../src/render.js";
import type { QuotaAxiResponse } from "../src/types.js";

describe("CLI argument parsing", () => {
  it("defaults to both v1 providers", () => {
    expect(parseArgs([]).providers).toEqual(["claude", "codex"]);
  });

  it("scopes comma-separated providers", () => {
    expect(parseArgs(["--provider", "claude"]).providers).toEqual(["claude"]);
    expect(parseArgs(["--provider=claude,codex"]).providers).toEqual(["claude", "codex"]);
  });

  it("rejects providers outside v1 scope", () => {
    expect(() => parseArgs(["--provider", "gemini"])).toThrow("unsupported provider");
  });
});

describe("response redaction", () => {
  it("hides account identity and attempts unless --full is set", () => {
    const response: QuotaAxiResponse = {
      generatedAt: "2026-07-06T18:10:00Z",
      schemaVersion: 1,
      providers: [
        {
          provider: "claude",
          label: "Claude",
          source: "oauth",
          account: { email: "person@example.invalid" },
          windows: [],
          state: { status: "fresh", stale: false, sourcesTried: ["oauth"] },
          attempts: [{ source: "oauth", status: "success" }],
        },
      ],
    };

    expect(redactedResponse(response, false).providers[0].account).toBeUndefined();
    expect(redactedResponse(response, false).providers[0].attempts).toBeUndefined();
    expect(redactedResponse(response, true).providers[0].account?.email).toBe("person@example.invalid");
  });
});
