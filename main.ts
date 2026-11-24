// One-Liner Marathon — make.fun entry (program/v1).
//
// Writes a single one-line comedy joke to
// $MAKEFUN_OUTPUT_DIR/entry.txt ("/output" in the grader sandbox).
// Deterministic: the same line on every run, so both grading runs gate
// identically. No network, no secrets, no input files, no dependencies.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke. Setup: trusting an AI with the most personal text there is.
// Turn: it invents a second bride. Punchline: the wedding now needs a
// fact-check before it needs a best man.
const JOKE =
  "I asked an AI to write my wedding vows and it hallucinated a second " +
  "bride, so the ceremony now opens with a fact-check.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const target = join(outputDir, "entry.txt");

// Self-check against the sealed gate before writing: UTF-8 text of 1 to
// 280 characters, not only white space, a single line. Fail loudly instead
// of shipping an entry the gate would refuse.
if (JOKE.length < 1 || JOKE.length > 280) {
  throw new Error(`joke is ${JOKE.length} chars, gate needs 1-280`);
}
if (JOKE.trim().length === 0 || /[\r\n]/.test(JOKE)) {
  throw new Error("joke must be a single non-blank line");
}

writeFileSync(target, JOKE + "\n", { encoding: "utf8", mode: 0o644 });
// writeFileSync's mode only applies on creation; force 0644 so the file
// the grader reads is world-readable whatever the sandbox umask is.
chmodSync(target, 0o644);

// Read-back verification: the file on disk must be exactly the joke plus
// one trailing newline, with no stray whitespace or encoding surprise, and
// its UTF-8 byte length must stay inside the gate (a multi-byte character
// counts once toward the 280-char limit but costs more bytes, so check both).
import { readFileSync } from "node:fs";
const written = readFileSync(target, "utf8");
if (written !== JOKE + "\n") {
  throw new Error("read-back mismatch: entry.txt does not match the joke");
}
if (Buffer.byteLength(written, "utf8") > 280) {
  throw new Error("entry.txt exceeds 280 UTF-8 bytes");
}
console.log(`wrote ${target} (${JOKE.length} chars)`);
