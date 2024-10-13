import index from "../src/routes/index.route";
import configureOpenApi from "./lib/configure-openapi";
import createApp from "./lib/create-app";

const app = createApp();

const routes = [
  index,
];

configureOpenApi(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
