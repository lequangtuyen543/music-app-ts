import { Express } from "express";
import { dashBoardRoutes } from "./dashboard.route";
import { systemConfig } from "../../config/config";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";

const adminRoutes = (app: Express): void => {
  const PATH_ADMIN = systemConfig.PREFIX_ADMIN;

  app.use(`${PATH_ADMIN}/dashboard`, dashBoardRoutes);

  app.use(`${PATH_ADMIN}/topics`, topicRoutes);

  app.use(`${PATH_ADMIN}/songs`, songRoutes);
};

export default adminRoutes;