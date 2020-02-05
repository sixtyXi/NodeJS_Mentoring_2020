import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class UserModel extends Model {
    @Column
    id: any;

    @Column
    login: string;

    @Column
    password: string;

    @Column
    age: Number;
}