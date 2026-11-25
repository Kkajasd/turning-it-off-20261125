// Have You Tried Turning It Off? — make.fun one-liner entry.
// The joke: the classic fix turns out to be the agent's entire
// 47-step playbook, repeated — cheerful uselessness, customer
// never the butt of the joke.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// --- Compose the line live, beat by beat ----------------------------
// Beat 1 — the opener: the classic support line, delivered deadpan.
const opener = "Have you tried turning it off and on again?";
// Beat 2 — the escalation: it was only step one of a very long plan.
const escalation = "Lovely \u2014 that was step one of forty-seven,";
// Beat 3 — the punchline: the whole playbook is the same step, 47 times.
const punchline =
  "and I'm afraid steps two through forty-six are also turning it off and on again.";

const line = [opener, escalation, punchline].join(" ");

// --- Gate: refuse to write a bad line ------------------------------
// Single line, 1-199 chars, non-whitespace only.
function gate(text: string): void {
  if (text.length < 1 || text.length > 199) {
    throw new Error(`entry length ${text.length} outside 1-199`);
  }
  if (/\r|\n/.test(text)) {
    throw new Error("entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (/  /.test(text)) {
    throw new Error("entry must not contain double spaces");
  }
  if (!/[.!?]$/.test(text)) {
    throw new Error("entry must end with terminal punctuation");
  }
}

gate(line);

// --- Write + read-back verification --------------------------------
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, line, "utf8");

const back = readFileSync(OUT_FILE, "utf8");
if (back !== line) {
  throw new Error("read-back mismatch: entry.txt does not match the line");
}

console.log(`OK entry.txt (${line.length} chars): ${line}`);
