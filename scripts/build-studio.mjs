/**
 * Builds the Sanity Studio into public/studio so it ships with the website at
 * neuroflutter.com/studio.
 *
 * Skipped entirely until NEXT_PUBLIC_SANITY_PROJECT_ID is set, so the site can
 * still be built and deployed before Sanity exists.
 */
import { spawnSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const studioDir = join(root, "studio");
const outDir = join(root, "public", "studio");

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "").trim();
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim();

if (!projectId) {
  console.log(
    "[studio] NEXT_PUBLIC_SANITY_PROJECT_ID is not set — skipping the editorial " +
      "dashboard build. The website itself is unaffected.",
  );
  if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
  process.exit(0);
}

const env = {
  ...process.env,
  SANITY_STUDIO_PROJECT_ID: projectId,
  SANITY_STUDIO_DATASET: dataset,
};

function run(command, args, cwd) {
  console.log(`[studio] ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, { cwd, env, stdio: "inherit", shell: false });
  if (result.status !== 0) {
    console.error(`[studio] "${command} ${args.join(" ")}" failed.`);
    process.exit(result.status ?? 1);
  }
}

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const npx = process.platform === "win32" ? "npx.cmd" : "npx";

if (!existsSync(join(studioDir, "node_modules"))) {
  run(npm, ["install", "--no-audit", "--no-fund"], studioDir);
}
run(npx, ["sanity", "build", "../public/studio", "-y"], studioDir);
console.log("[studio] Editorial dashboard built into public/studio.");
