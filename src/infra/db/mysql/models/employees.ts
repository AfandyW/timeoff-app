import { Optional, Model, DataTypes, Sequelize, BuildOptions, Association } from "sequelize";

import UserFactory, {UserModel} from './users'
import PositionFactory, {PositionModel} from "./positions";
import TimeBalanceFactory from "./time-balance";
import TimeOffFactory from "./time-off";

export interface EmployeeAttributes {
    id?: number;
    user_id?: number;
    positition_id: number;
    name: string;
    phone: string;
    email: string;
    direct_report_employee: number;
}

export type EmployeeCreationAttributes = Optional<EmployeeAttributes, "id">;

export class EmployeeModel extends Model<EmployeeAttributes,EmployeeCreationAttributes> implements EmployeeAttributes{
    public id!:number
    public user_id!: number;
    public positition_id!: number;
    public name!: string;
    public phone!: string;
    public email!: string;
    public direct_report_employee!: number;

    public readonly createdAt!:Date
    public readonly updatedAt!:Date
}

export type TEmployee = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): EmployeeModel;
};

const EmployeeFactory = (sequelize: Sequelize): TEmployee => {
    const EmployeeModel = <TEmployee>sequelize.define(
        "users", {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            user_id: {
                type: DataTypes.INTEGER.UNSIGNED
            },
            positition_id: {
                type: DataTypes.INTEGER.UNSIGNED
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            phone: {
                allowNull: false,
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            direct_report_employee: {
                type: DataTypes.INTEGER.UNSIGNED
            },
        }
    )
    // EmployeeModel.belongsTo( UserFactory(sequelize))
    // EmployeeModel.belongsTo( PositionFactory(sequelize))
    // EmployeeModel.hasMany( TimeOffFactory(sequelize), {
    //     foreignKey: 'employee_id',
    //     as: 'employees'
    // })
    // EmployeeModel.hasMany( TimeBalanceFactory(sequelize), {
    //     foreignKey: 'employee_id',
    //     as: 'employees'
    // })
    return EmployeeModel
}

export default EmployeeFactory
