import index from "../src/routes/index.route";
import configureOpenApi from "./lib/configure-openapi";
import createApp from "./lib/create-app";
import tasks from "./routes/tasks/task.index";

const app = createApp();

const routes = [
  index,
  tasks,
] as const;

configureOpenApi(app);

routes.forEach((route) => {
  app.route("/api", route);
});

export type AppType = typeof routes[number];

export default app;
