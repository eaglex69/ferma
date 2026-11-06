import { build } from "esbuild";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { mkdir, readFile, writeFile, cp, rm } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const root = process.cwd();
const out = path.join(root, "php");
await mkdir(path.join(out, "assets"), { recursive: true });
await mkdir(path.join(out, "data"), { recursive: true });

await build({
  entryPoints: [path.join(root, "src/php-client.tsx")],
  outfile: path.join(out, "assets/app.js"),
  bundle: true,
  minify: true,
  sourcemap: false,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  tsconfig: path.join(root, "tsconfig.json"),
  define: { "process.env.NODE_ENV": '"production"' },
  legalComments: "none",
});

for (const [source, target] of [["src/app/globals.css", "game.css"], ["src/app/admin/admin.css", "admin.css"]]) {
  const css = await readFile(path.join(root, source), "utf8");
  const result = await postcss([tailwind()]).process(css, { from: path.join(root, source) });
  await writeFile(path.join(out, "assets", target), result.css);
}

// Снимок всей конфигурации игры для PHP: тот же контент и цены, что в Next.js.
const configEntry = path.join(out, "data/config-entry.ts");
await writeFile(configEntry, `
export { ITEMS, CROPS, POND_SPECIES, CAGE_SPECIES, ANIMALS, RECIPES, MINES, JOBS, SHOP_KEYS, UPGRADES, GLOBALS, PROMOTIONS, NEWS, BLESSINGS } from "${path.join(root, "src/lib/game-config.ts").replaceAll("\\", "/")}";
export { AVATARS, DEFAULT_AVATARS } from "${path.join(root, "src/lib/avatars.ts").replaceAll("\\", "/")}";
export { COVERS, DEFAULT_COVERS, COVER_UPLOAD_GEMS } from "${path.join(root, "src/lib/covers.ts").replaceAll("\\", "/")}";
export { WORKER_TYPES } from "${path.join(root, "src/lib/workers-config.ts").replaceAll("\\", "/")}";
export { ACHIEVEMENTS } from "${path.join(root, "src/lib/game-engine.ts").replaceAll("\\", "/")}";
`);
const configBundle = path.join(out, "data/config.cjs");
await build({ entryPoints: [configEntry], outfile: configBundle, bundle: true, platform: "node", format: "cjs", target: "node20", tsconfig: path.join(root, "tsconfig.json") });
const config = require(configBundle);
const json = {};
for (const [key, value] of Object.entries(config)) if (!key.startsWith("__") && typeof value !== "function") json[key] = value;
await writeFile(path.join(out, "data/config.json"), JSON.stringify(json, null, 2));
await rm(configEntry, { force: true });
await rm(configBundle, { force: true });
await rm(path.join(out, "images"), { recursive: true, force: true });
await cp(path.join(root, "public/images"), path.join(out, "images"), { recursive: true });
console.log("PHP client, CSS, images and game config built");
