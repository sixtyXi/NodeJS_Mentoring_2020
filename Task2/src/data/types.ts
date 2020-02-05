export type User = {
  id: string;
  login: string;
  password?: string;
  age: number;
  isDeleted: boolean;
}

export interface IEntityDAL<T> {
  add: (item: T) => T | false;
  update: (item: T) => T | false;
  remove: (id: string | number) => T | false;
  get: (id?: string | number) => T[] | T | undefined;
}

export interface IUserDAL extends IEntityDAL<User> {
  getAutoSuggestUsers: (loginSubstring?: string, limit?: number) => User[];
}