import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: "Users", timestamps: true })
export class User extends Model<User> {
    @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    id: string;

    @Column({ unique: true, validate: { notEmpty: true } })
    login: string;

    @Column({ validate: { is: /[A-Za-z0-9]+/, notEmpty: true } })
    password: string;

    @Column({ validate: { min: 4, max: 160, notEmpty: true } })
    age: number;
}