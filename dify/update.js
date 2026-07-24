import utils from "../utils.js";

await utils.cloneOrPullRepo({ repo: "https://github.com/langgenius/dify.git" });
await utils.copyDir("./repo/docker", "./code");
await utils.removeContainerNames("./code/docker-compose.yaml");
await utils.removePorts("./code/docker-compose.yaml");

// Public-facing URLs must point at the domain Easypanel assigns.
// SERVER_CONSOLE_API_URL and INTERNAL_FILES_URL are intentionally left
// untouched: the Dify docs say to keep those internal defaults.
await utils.searchReplace(
  "./code/.env.example",
  "\nCONSOLE_API_URL=\n",
  "\nCONSOLE_API_URL=https://$(PRIMARY_DOMAIN)\n"
);
await utils.searchReplace(
  "./code/.env.example",
  "\nCONSOLE_WEB_URL=\n",
  "\nCONSOLE_WEB_URL=https://$(PRIMARY_DOMAIN)\n"
);
await utils.searchReplace(
  "./code/.env.example",
  "\nSERVICE_API_URL=\n",
  "\nSERVICE_API_URL=https://$(PRIMARY_DOMAIN)\n"
);
await utils.searchReplace(
  "./code/.env.example",
  "\nTRIGGER_URL=http://localhost\n",
  "\nTRIGGER_URL=https://$(PRIMARY_DOMAIN)\n"
);
await utils.searchReplace(
  "./code/.env.example",
  "\nAPP_API_URL=\n",
  "\nAPP_API_URL=https://$(PRIMARY_DOMAIN)\n"
);
await utils.searchReplace(
  "./code/.env.example",
  "\nAPP_WEB_URL=\n",
  "\nAPP_WEB_URL=https://$(PRIMARY_DOMAIN)\n"
);
await utils.searchReplace(
  "./code/.env.example",
  "\nFILES_URL=\n",
  "\nFILES_URL=https://$(PRIMARY_DOMAIN)\n"
);
await utils.searchReplace(
  "./code/.env.example",
  "\nENDPOINT_URL_TEMPLATE=http://localhost/e/{hook_id}\n",
  "\nENDPOINT_URL_TEMPLATE=https://$(PRIMARY_DOMAIN)/e/{hook_id}\n"
);
await utils.searchReplace(
  "./code/.env.example",
  "\nNEXT_PUBLIC_SOCKET_URL=ws://localhost\n",
  "\nNEXT_PUBLIC_SOCKET_URL=wss://$(PRIMARY_DOMAIN)\n"
);
