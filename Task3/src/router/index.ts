import * as express from "express";

import { UserController, userValidationMiddleware } from "../controllers";
import { routes } from "../config/constants";
import { defaultErrorHandler } from "./heplers";

const router = express.Router();

router
    .route(routes.users)
    .get(UserController.get, defaultErrorHandler)
    .post(userValidationMiddleware, UserController.add, defaultErrorHandler)
    .all((req, res) => res.status(405).send("Avalable methods: GET, POST"));

router
    .route(`${routes.users}/:id`)
    .get(UserController.get, defaultErrorHandler)
    .put(userValidationMiddleware, UserController.update, defaultErrorHandler)
    .delete(UserController.delete, defaultErrorHandler)
    .all((req, res) => res.status(405).send("Avalable methods: GET, PUT, DELETE"));

export default router;
