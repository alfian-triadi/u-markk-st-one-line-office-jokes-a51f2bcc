// One-Line Office Jokes — writes one original line to /output/entry.txt
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I hit reply-all to ask to be removed from the thread, and now I'm the thread's most active contributor.";

// Local gate: the scorer requires 1-199 UTF-8 characters, not only whitespace.
// Count code points, so multi-byte characters are counted as the scorer does.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 199 || LINE.trim().length === 0) {
  throw new Error(
    `Line length ${charCount} is outside the 1-199 character gate.`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Self-check: what was written must be byte-identical to the line,
// exactly one line with no trailing newline.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line.");
}
if (written.includes("\n")) {
  throw new Error("entry.txt must be exactly one line.");
}
console.log(`Wrote ${charCount} characters to /output/entry.txt`);
