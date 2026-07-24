import utils from "../utils.js";

await utils.cloneOrPullRepo({ repo: "https://github.com/supabase/supabase" });
await utils.copyDir("./repo/docker", "./code");

await utils.removeContainerNames("./code/docker-compose.yml");
await utils.removePorts("./code/docker-compose.yml");

await utils.searchReplace(
  "./code/.env.example",
  "SUPABASE_PUBLIC_URL=http://localhost:8000",
  "SUPABASE_PUBLIC_URL=https://$(PRIMARY_DOMAIN)"
);

await utils.searchReplace(
  "./code/.env.example",
  "API_EXTERNAL_URL=http://localhost:8000/auth/v1",
  "API_EXTERNAL_URL=https://$(PRIMARY_DOMAIN)/auth/v1"
);

await utils.searchReplace(
  "./code/.env.example",
  "SITE_URL=http://localhost:3000",
  "SITE_URL=https://$(PRIMARY_DOMAIN)"
);
