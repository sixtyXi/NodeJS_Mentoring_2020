import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";
import * as uuid from "uuid";

const backup = [
  {
    id: uuid(),
    login: "user1",
    password: "11111",
    age: 15
  }
];

// const sq = new Sequelize(
//   "postgres://qemgugnc:XUD1acSZjZFFRAjOV_020awlVuqJLoBd@rogue.db.elephantsql.com:5432/qemgugnc",
//   {
//     define: {
//       timestamps: true,
//       paranoid: true
//     },
//     models: [User]
//   }
// );

const sq = new Sequelize(
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    username: "postgres",
    database: "nodejs_mentoring",
    password: "123",
    define: {
      timestamps: true,
      paranoid: true
    },
    models: [User]
  }
);

export const dbConnect = async () => {
  sq
    .sync()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));
}

export class DataService {
  public static create(user: User) {
    console.log(user);
    return User.create(user);
  }

  public static async update(user: User) {
    const foundUser = await User.findOne({ where: { id: user.id } });
    if (!foundUser) return null;
    return User.update(user, { where: { id: user.id }, returning: true });
  }

  public static get(id: any) {
    return id ? User.findOne({ where: { id } }) : User.findAll();
  }

  public static async delete(id: any) {
    const foundUser = await User.findOne({ where: { id } });
    if (!foundUser) return null;
    await foundUser.destroy();
    return foundUser;
  }
}