import { execFileSync } from "node:child_process";
import { mkdir, rm, cp } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const downloads = path.join(root, "downloads");
await mkdir(downloads, { recursive: true });
await rm(path.join(downloads, "valley-next.zip"), { force: true });
await rm(path.join(downloads, "valley-php.zip"), { force: true });

const nextFiles = [
  "src", "public/images", "scripts", "package.json", "package-lock.json", "tsconfig.json",
  "next.config.ts", "postcss.config.mjs", "drizzle.config.json", "eslint.config.mjs", ".env.example", "README-NEXT.md",
];
// PHP-пакет содержит исходники Next.js для кнопки «Скачать Next.js» в PHP-админке.
const nextSource = path.join(root, "php/next-source");
await rm(nextSource, { recursive: true, force: true });
await mkdir(nextSource, { recursive: true });
for (const file of nextFiles) await cp(path.join(root, file), path.join(nextSource, file), { recursive: true });
execFileSync("zip", ["-q", "-r", path.join(downloads, "valley-next.zip"), ...nextFiles], { cwd: root, stdio: "inherit" });
execFileSync("zip", ["-q", "-r", path.join(downloads, "valley-php.zip"), "php", "-x", "php/downloads/*", "-x", "php/config.local.php"], { cwd: root, stdio: "inherit" });
console.log("Archives created: downloads/valley-next.zip and valley-php.zip");
