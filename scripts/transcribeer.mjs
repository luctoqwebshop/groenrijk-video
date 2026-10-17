// Transcribeert public/raw/<videonaam>.wav met whisper.cpp (Nederlands) naar src/captions/<videonaam>.json
// Gebruik: node scripts/transcribeer.mjs <videonaam>
import { transcribe, toCaptions } from "@remotion/install-whisper-cpp";
import { writeFileSync } from "node:fs";
import path from "node:path";

const naam = process.argv[2];
if (!naam) {
  throw new Error("Gebruik: node scripts/transcribeer.mjs <videonaam>");
}
const whisperPath = path.join(process.cwd(), "whisper.cpp");

const uitvoer = await transcribe({
  inputPath: path.join(process.cwd(), "public/raw", `${naam}.wav`),
  whisperPath,
  whisperCppVersion: "1.7.6",
  model: "large-v3-turbo",
  modelFolder: whisperPath,
  language: "nl",
  tokenLevelTimestamps: true,
  splitOnWord: true,
  printOutput: false,
});

const { captions } = toCaptions({ whisperCppOutput: uitvoer });
const bestand = path.join(process.cwd(), "src/captions", `${naam}.json`);
writeFileSync(bestand, JSON.stringify(captions, null, 2));
console.log(`${captions.length} woorden -> ${bestand}`);
console.log(captions.map((c) => c.text).join(""));
