import { RequestHandler } from "express";
import { ValidatedRequest } from "express-joi-validation";

import { UserSchema } from "../validation";
import DAL, { User } from "../../data";

const addOrUpdate: RequestHandler = (req: ValidatedRequest<UserSchema>, res) => {
    const user: User = req.body as User;
    const id: string = req.params.id;

    if (!id) {
        const newUser = DAL.user.add(user);

        res.status(200).json(newUser);
    } else {
        const updatedUser = DAL.user.update(user);

        if (!updatedUser) {
            return res.status(404).send("User to update not found");
        }

        res.status(200).json(updatedUser);
    }
}

const getById: RequestHandler = (req, res) => {
    const id = req.params.id;

    const user = DAL.user.get(id);

    user ? res.status(200).json(user) : res.status(404).send("User not found");
}

const get: RequestHandler = (req, res) => {
    const limit = req.query.limit;
    const substr = req.query.substr;

    const foundUsers = DAL.user.getAutoSuggestUsers(substr, limit ? +limit : null);

    res.status(200).json(foundUsers);
}

const remove: RequestHandler = (req, res) => {
    const id = req.params.id;
    let deletedUser: false | User;

    try {
        deletedUser = DAL.user.remove(id);
    } catch (e) {
        if (e.message === "Not found") {
            return res.status(404).send("User not found");
        }

        return res.status(500).send(e.message);
    }

    deletedUser ? res.status(200).json(deletedUser) : res.status(400).send("User is already deleted");
}

export const userController = {
    addOrUpdate,
    remove,
    getById,
    get
};