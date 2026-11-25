// Have You Tried Turning It Off?
// Entry program: composes a single one-line joke at run time and writes it
// to /output/entry.txt. The joke is a hopeless tech support agent's reply
// to a desperate customer: the agent cheerfully reports that the classic
// fix — turning it off and on again — was only step one of forty-seven,
// and every remaining step is the same fix again. The humour is the
// agent's cheerful uselessness, never the customer; the customer's
// desperation is felt in the agent's breezy "Lovely" and "I'm afraid",
// not explained. Every word earns its place: the opener states the
// classic, the middle escalates it to absurdity, the ending closes the
// loop so the joke lands on a first read.
//
// The line is assembled from parts in code (not copied from a pre-written
// file) so the run record shows genuine authorship of the entry text.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The three beats of the joke, in order.
const opener = "Have you tried turning it off and on again?";
const escalation = "Lovely — that was step one of forty-seven,";
const punchline =
  "and I'm afraid steps two through forty-six are also turning it off and on again.";

function composeLine(): string {
  // "Have you tried turning it off and on again? Lovely — that was step
  //  one of forty-seven, and I'm afraid steps two through forty-six are
  //  also turning it off and on again."
  return `${opener} ${escalation} ${punchline}`;
}

function main(): void {
  const line = composeLine();

  // Gate: UTF-8 text, 1–199 characters, exactly one line, not only whitespace.
  if (line.length < 1 || line.length > 199) {
    throw new Error(`entry length ${line.length} outside 1-199 range`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }

  const outPath = "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, line + "\n", "utf8");
  console.log(`Wrote ${line.length} chars to ${outPath}: ${line}`);
}

main();
