import * as express from "express";

import { userController, userValidationMiddleware } from "../logic";

const router = express.Router();

router
    .route("/user")
    .post(userValidationMiddleware, userController.addOrUpdate)
    .put(userValidationMiddleware, userController.addOrUpdate)
    .get();

router
    .route("/user/:id")
    .get(userController.getById)
    .delete(userController.softDelete);

router
    .route("/users/:limit/:substr")
    .get(userController.get);

router
    .route("/users/:limit")
    .get(userController.get);

router
    .route("/users")
    .get(userController.get);

export default router;