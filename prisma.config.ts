import { defineConfig } from "prisma/config";

const config = {
  schema: "prisma/schema.prisma",
  seed: "node prisma/seed.js",
};

export default defineConfig(config);