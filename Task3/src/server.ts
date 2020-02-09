import * as express from "express";

import router from "./router";
import { routes, appConfig } from "./config/constants";
import { dbConnect } from "./data-access";

const app = express();

app.use(express.json());

app.use(routes.prefix, router);

app.listen(appConfig.port, async () => {
    await dbConnect();
});