import * as express from "express";
import { Sequelize } from "sequelize";

import router from "./router";
import { routes, appConfig } from "./constants";

const sq = new Sequelize("postgres://qemgugnc:XUD1acSZjZFFRAjOV_020awlVuqJLoBd@rogue.db.elephantsql.com:5432/qemgugnc");

const app = express();

app.use(express.json());

app.use(routes.prefix, router);

app.listen(appConfig.port);