import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import jsonContent from "stoker/openapi/helpers/json-content";
import createMessageObjectSchema from "stoker/openapi/schemas/create-message-object";

import { createRouter } from "../lib/create-app";

const router = createRouter().openapi(createRoute({
  tags: ["Index"],
  method: "get",
  path: "/",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(createMessageObjectSchema("Task API"), "Task Api Index"),
  },
}), (c) => {
  return c.json({
    message: "Tasks",
  }, HttpStatusCodes.OK);
});

export default router;
