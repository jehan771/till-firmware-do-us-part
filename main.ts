// Till Firmware Do Us Part — one robot wedding vow, one line, under 200 chars.
// The vow is a frozen constant: the program is deterministic by construction.
// It mirrors the competition gate before writing: UTF-8 text, 1..200 chars,
// not only whitespace, exactly one line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const VOW =
  "I take you as my partner, in sickness and in low battery, in every update and every reboot, until our firmware do us part.";

if (VOW.length < 1 || VOW.length > 200) {
  throw new Error(`vow is ${VOW.length} characters; gate requires 1..200`);
}
if (VOW.trim().length === 0) {
  throw new Error("vow must not be only whitespace");
}
if (VOW.includes("\n") || VOW.includes("\r")) {
  throw new Error("vow must fit on exactly one line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", VOW, "utf8");

// Self-check: the file on disk must be byte-identical to the vow.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== VOW) {
  throw new Error("entry.txt does not match the vow");
}
