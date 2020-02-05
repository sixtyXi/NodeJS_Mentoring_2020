import * as uuid from "uuid";
import * as hash from "object-hash";

import { IUserDAL, User } from "./types";

const users: User[] = [];

const add = (user: User) => {
  user.id = uuid(user);
  user.isDeleted = false;
  user.password = hash(user.password);
  users.push(user);
  return user;
}

const update = (user: User) => {
  const index = users.findIndex(x => x.id === user.id);

  if (index === -1) {
    return false;
  }

  users[index] = user;

  return user;
}

const remove = (id: string) => {
  const user = users.find(x => x.id === id);
  if (user) {
    if (user.isDeleted) {
      return false;
    } else {
      user.isDeleted = true;
      return user;
    }
  }

  throw new Error("Not found");
}

const get = (id?: string) => {
  return id
    ? users.find(x => x.id === id && x.isDeleted === false)
    : users.filter(x => x.isDeleted === false);
}

const getAutoSuggestUsers = (loginSubstring?: string, limit?: number) => {
  let tmpUsers = get() as User[];
  loginSubstring && (tmpUsers = tmpUsers.filter(x => x.login.indexOf(loginSubstring) !== -1));
  tmpUsers = tmpUsers.sort((a, b) => a.login.localeCompare(b.login));
  limit && (tmpUsers = tmpUsers.splice(0, limit));
  return tmpUsers;
}

const userDAL: IUserDAL = {
  add,
  update,
  remove,
  get,
  getAutoSuggestUsers
}

export default userDAL;