import { Optional, Model, DataTypes, Sequelize, BuildOptions, Association } from "sequelize";

import EmployeeFactory from './employees'

export interface TimeBalanceAttributes {
    id?: number;
    name: string;
    year: number;
    employee_id: number;
    balance: number;
}

export type TimeBalanceCreationAttributes = Optional<TimeBalanceAttributes, "id">;

export class TimeBalanceModel extends Model<TimeBalanceAttributes,TimeBalanceCreationAttributes> implements TimeBalanceAttributes{
    public id!:number
    public name!: string
    public year!: number;
    public employee_id!: number;
    public balance!: number;

    public readonly createdAt!:Date
    public readonly updatedAt!:Date
}

export type TTimeBalance = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): TimeBalanceModel;
};

const TimeBalanceFactory = (sequelize: Sequelize): TTimeBalance => {
    const TimeBalanceModel = <TTimeBalance>sequelize.define(
        "users", {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            year: {
                type: DataTypes.INTEGER
            },
            employee_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            balance: {
                type: DataTypes.INTEGER
            },
        }
    )
    // TimeBalanceModel.belongsTo(EmployeeFactory(sequelize))
    return TimeBalanceModel
}

export default TimeBalanceFactory
