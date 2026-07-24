import utils from "../utils.js";
import fs from "fs";

// appwrite.io/install/compose and /install/env now redirect to the docs
// site instead of serving raw files. The docs page renders its examples
// from this generator module, so we fetch and run it directly to produce
// the same docker-compose.yml / .env that the old endpoints used to serve.
const COMPOSE_DATA_URL =
  "https://raw.githubusercontent.com/appwrite/website/main/src/lib/components/compose-generator/composeData.ts";
const tempModule = "./compose-generator.mjs";

console.log(`Downloading ${COMPOSE_DATA_URL}`);
const response = await fetch(COMPOSE_DATA_URL);
const source = (await response.text())
  .replace(/^export type Database = .*;\n/m, "")
  .replace(/db: Database, assistant: boolean\): string/g, "db, assistant)")
  .replace("} as const;", "};");

await fs.promises.writeFile(tempModule, source);

const { generateCompose, generateEnv } = await import(tempModule);

await fs.promises.writeFile(
  "./code/docker-compose.yml",
  generateCompose("mariadb", false)
);
await fs.promises.writeFile("./code/.env.example", generateEnv("mariadb", false));

await fs.promises.unlink(tempModule);

await utils.removeContainerNames("./code/docker-compose.yml");
await utils.removePorts("./code/docker-compose.yml");
