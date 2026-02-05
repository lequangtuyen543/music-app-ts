import express, { Express } from "express";
import { connect } from "./config/database";
import dotenv from "dotenv";
import clientRoutes from "./routes/client/index.route";

dotenv.config();

connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

clientRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});