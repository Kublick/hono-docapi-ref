import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";

import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppBindings, AppRouteHandler } from "../../lib/types";
import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from "./tasks.route";

import db from "../../db";
import { tasks } from "../../db/schema";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  c.var.logger.info("Listing tasks");
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  c.var.logger.info("Creating task");
  const { name, done } = c.req.valid("json");

  const [task] = await db.insert(tasks).values({
    name,
    done,
  }).returning();

  return c.json(task, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  c.var.logger.info("Getting task by id");

  const { id } = c.req.valid("param");

  const task = await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!task) {
    return c.json({
      message: HttpStatusPhrases.NOT_FOUND,
    }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(task, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  c.var.logger.info("Getting task by id");

  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");

  const [task] = await db.update(tasks)
    .set(updates)
    .where(eq(tasks.id, id))
    .returning();

  if (!task) {
    return c.json({
      message: HttpStatusPhrases.NOT_FOUND,
    }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(task, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  c.var.logger.info("Getting task by id");

  const { id } = c.req.valid("param");

  const result = await db.delete(tasks).where(eq(tasks.id, id));

  if (result.rowsAffected === 0) {
    return c.json({
      message: HttpStatusPhrases.NOT_FOUND,
    }, HttpStatusCodes.NOT_FOUND);
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
