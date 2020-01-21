import * as express from "express";
import * as bodyParser from "body-parser";
import { ExpressJoiError, ContainerTypes } from "express-joi-validation";

import router from "./router";

const app = express();

app.use(bodyParser.json());

app.use("/api", router);

app.listen(3000);