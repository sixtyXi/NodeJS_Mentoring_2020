import * as uuid from "uuid";
import { RequestHandler } from "express";
import { ValidatedRequest } from "express-joi-validation";

import { getAutoSuggestUsers, users } from "../../data";
import { User } from "../../types";
import { UserSchema } from "../validation";

const addOrUpdate: RequestHandler = (req: ValidatedRequest<UserSchema>, res) => {
    const user: User = req.body as User;

    if (user.id == null) {
        user.id = uuid(user);
        user.isDeleted = false;
        users.push(user);
        res.status(200).json(user);
    } else {
        const index = users.findIndex(x => x.id === user.id);

        if (index === -1) {
            res.status(404).send("User to update not found");
        }

        users[index] = user;
        res.status(200).json(user);
    }
}

const getById: RequestHandler = (req, res) => {
    const id = req.params.id;

    const user = users.find(x => x.id === id);

    user ? res.status(200).json(user) : res.status(404).send("User not found");
}

const get: RequestHandler = (req, res) => {
    const limit = req.params.limit;
    const substr = req.params.substr;

    const foundUsers = getAutoSuggestUsers(substr, limit ? +limit : null);

    foundUsers && foundUsers.length ? res.status(200).json(foundUsers) : res.status(404).send("Users not found");
}

const softDelete: RequestHandler = (req, res) => {
    const id = req.params.id;

    const user = users.find(x => x.id === id);

    if (user) {
        if (user.isDeleted) {
            res.status(400).send("User already deleted");
        } else {
            user.isDeleted = true;
            res.status(200).json(user);
        }
    } else {
        res.status(404).send("User not found");
    }
}

export const userController = {
    addOrUpdate,
    softDelete,
    getById,
    get
};