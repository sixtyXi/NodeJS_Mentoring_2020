import * as express from "express";

import { userController, userValidationMiddleware } from "../logic";
import { routes } from "../constants";

const router = express.Router();

router
    .route(routes.users)
    .get(userController.get)
    .post(userValidationMiddleware, userController.addOrUpdate)
    .all((req, res) => res.status(405).send("Avalable methods: GET, POST"));

router
    .route(`${routes.users}/:id`)
    .get(userController.getById)
    .put(userValidationMiddleware, userController.addOrUpdate)
    .delete(userController.remove)
    .all((req, res) => res.status(405).send("Avalable methods: GET, PUT, DELETE"));

export default router;
