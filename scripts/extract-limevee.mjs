import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const source = "src/assets/images/Frame18.jpg";
const output = "src/assets/images/limevee";

await mkdir(output, { recursive: true });

const crops = [
  ["cover", 0, 1200],
  ["research", 3000, 1800],
  ["survey", 4800, 7200],
  ["strategy", 12000, 3300],
  ["flow", 14700, 1500],
  ["sketches", 15800, 1800],
  ["wireframes-a", 17400, 2600],
  ["wireframes-b", 20000, 2700],
  ["final-ui", 22700, 2500],
];

for (const [name, top, height] of crops) {
  await sharp(source)
    .extract({ left: 0, top, width: 840, height })
    .webp({ quality: 84, effort: 5 })
    .toFile(`${output}/${name}.webp`);
}
