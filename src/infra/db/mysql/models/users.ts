import {Optional, Model, DataTypes, Sequelize, BuildOptions, Association} from 'sequelize';
import EmployeeFactory, {EmployeeModel} from './employees'

export interface UserAttributes {
    id?: number;
    employee_id: number;
    username: string;
    password: string;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class UserModel extends Model<UserAttributes,UserCreationAttributes> implements UserAttributes{
    public id!:number
    public username!: string
    public password!: string
    public employee_id!: number

    public readonly createdAt!:Date
    public readonly updatedAt!:Date

    public static employee : EmployeeModel

    public static associations: {
        employeeDetail: Association<UserModel, EmployeeModel>
    };
}

export type TUser = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): UserModel;
};

const UserFactory = (sequelize: Sequelize): TUser => {
    const UserModel = <TUser>sequelize.define(
        "users", {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            employee_id: {
                type: DataTypes.INTEGER.UNSIGNED,
            },
            username: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
        }
    )
    UserModel.hasOne( EmployeeFactory(sequelize),{
        foreignKey: 'employee_id',
        as: 'employees'
    })
    return UserModel
}

export default UserFactory
