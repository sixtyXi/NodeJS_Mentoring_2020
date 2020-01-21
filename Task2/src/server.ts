import * as express from "express";

import router from "./router";
import { routes, appConfig } from "./constants";

const app = express();

app.use(express.json());

app.use(routes.prefix, router);

app.listen(appConfig.port);