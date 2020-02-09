import { RequestHandler } from "express";
import { ValidatedRequest } from "express-joi-validation";
import * as createError from "http-errors";

import { UserSchema } from "./validation";
import { User } from "../models";
import { DataService } from "../data-access";


export class UserController {
    public static add: RequestHandler = async (req: ValidatedRequest<UserSchema>, res, next) => {
        const user: User = User.build(req.body);

        try {
            const created = await DataService.create(user);
            if (!created[1]) throw createError(500, "User was not created");
            return res.status(200).json(created[0]);
        } catch (e) {
            next(e);
        }
    }

    public static update: RequestHandler = async (req: ValidatedRequest<UserSchema>, res, next) => {
        const user: User = User.build(req.body);
        const id: string = req.params.id;

        user.id = id;

        try {
            const udpated = await DataService.update(user);
            if (!udpated) throw createError(500, "User was not updated");
            return res.status(200).json(udpated);
        } catch (e) {
            next(e);
        }
    }

    public static get: RequestHandler = async (req: ValidatedRequest<UserSchema>, res, next) => {
        const id: string = req.params.id;

        try {
            const user = await DataService.get(id);
            return res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }

    public static delete: RequestHandler = async (req: ValidatedRequest<UserSchema>, res, next) => {
        const id: string = req.params.id;

        try {
            const deleted = await DataService.delete(id);
            if (!deleted) throw createError(500, "User was not deleted");
            return res.status(200).json(deleted);
        } catch (e) {
            next(e);
        }
    }
}
