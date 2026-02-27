import { Express } from "express";
import { dashBoardRoutes } from "./dashboard.route";
import { systemConfig } from "../../config/config";
import { topicRoutes } from "./topic.route";

const adminRoutes = (app: Express): void => {
  const PATH_ADMIN = systemConfig.PREFIX_ADMIN;

  app.use(`${PATH_ADMIN}/dashboard`, dashBoardRoutes);

  app.use(`${PATH_ADMIN}/topics`, topicRoutes);
};

export default adminRoutes;