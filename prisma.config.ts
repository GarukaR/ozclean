import { existsSync } from "node:fs";
import { defineConfig } from "prisma/config";

// Prisma 6 skips its own .env loading when a config file is present, so the CLI (validate,
// migrate, db seed) would not see DATABASE_URL / DIRECT_URL. Load them here instead.
// Loaded highest-precedence first: loadEnvFile does not overwrite variables that are already
// set, so .env.local wins over .env, matching Next.js precedence.
for (const envFile of [".env.local", ".env"]) {
  if (existsSync(envFile)) {
    process.loadEnvFile(envFile);
  }
}

const config = {
  schema: "prisma/schema.prisma",
  seed: "node prisma/seed.js",
};

export default defineConfig(config);
