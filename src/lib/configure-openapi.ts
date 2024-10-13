import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenApi } from "./types";

import packageJson from "../../package.json";

export default function configureOpenApi(app: AppOpenApi) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJson.version,
      title: "Tasks Api",
    },
  });

  app.get("/reference", apiReference({
    theme: "kepler",
    defaultHttpClient: {
      targetKey: "node",
      clientKey: "undici",
    },
    spec: {
      url: "/doc",
    },
  }));
}
