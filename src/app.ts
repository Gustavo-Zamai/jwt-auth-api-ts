import express from "express";
import jwtAuthenticationMiddleware from "./routes/authorization.route";
import errorHandler from "./middlewares/error-handler.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";

function createApp() {
  const app = express();

  app.use(express.json()); //middleware
  app.use(express.urlencoded({ extended: true }));

  //Route configuration
  app.use(statusRoute);
  app.use(authorizationRoute);

  app.use(jwtAuthenticationMiddleware);
  app.use(usersRoute);
  //Error Handler configuration
  app.use(errorHandler);

  return app;
}

export default createApp;
