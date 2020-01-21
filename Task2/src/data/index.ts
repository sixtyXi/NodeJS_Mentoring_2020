import { User } from "../types";

export const users: User[] = [];

export const getAutoSuggestUsers = (loginSubstring?: string, limit?: number) => {
    let tmpUsers = [...users];
    loginSubstring && (tmpUsers = tmpUsers.filter(x => x.login.indexOf(loginSubstring) !== -1));
    tmpUsers = tmpUsers.sort((a, b) => a.login.localeCompare(b.login));
    limit && (tmpUsers = tmpUsers.splice(0, limit));
    return tmpUsers;
}