import * as express from "express";
import * as bodyParser from "body-parser";
import * as uuid from "uuid";

type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

const users: User[] = [];

const getAutoSuggestUsers = (loginSubstring?: string, limit?: number) => {
    let tmpUsers = [...users];
    loginSubstring && (tmpUsers = tmpUsers.filter(x => x.login.indexOf(loginSubstring) !== -1));
    tmpUsers = tmpUsers.sort((a, b) => a.login.localeCompare(b.login));
    limit && (tmpUsers = tmpUsers.splice(0, limit));
    return tmpUsers;
}

const addOrUpdate: express.RequestHandler = (req, res) => {
    const user: User = req.body;

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

const getById: express.RequestHandler = (req, res) => {
    const id = req.params.id;

    const user = users.find(x => x.id === id);

    user ? res.status(200).json(user) : res.status(404).send("User not found");
}

const get: express.RequestHandler = (req, res) => {
    const limit = req.params.limit;
    const substr = req.params.substr;

    const foundUsers = getAutoSuggestUsers(substr, limit ? +limit : null);

    foundUsers && foundUsers.length ? res.status(200).json(foundUsers) : res.status(404).send("Users not found");
}

const softDelete: express.RequestHandler = (req, res) => {
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

const app = express();
app.use(bodyParser.json());
const router = express.Router();

router
    .route("/user")
    .post(addOrUpdate)
    .put(addOrUpdate)
    .get();

router
    .route("/user/:id")
    .get(getById)
    .delete(softDelete);

router
    .route("/users/:limit/:substr")
    .get(get);

router
    .route("/users/:limit")
    .get(get);

router
    .route("/users")
    .get(get);

app.use("/api", router);
app.listen(3000);