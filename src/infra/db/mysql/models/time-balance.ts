import { Optional, Model, DataTypes, Sequelize, BuildOptions, Association } from "sequelize";

import EmployeeFactory from './employees'

export interface TimeBalanceAttributes {
    id?: number;
    year: string;
    employee_id: number;
    balance: number;
}

export type TimeBalanceCreationAttributes = Optional<TimeBalanceAttributes, "id">;

export class TimeBalanceModel extends Model<TimeBalanceAttributes,TimeBalanceCreationAttributes> implements TimeBalanceAttributes{
    public id!:number
    public year!: string;
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
                type: DataTypes.STRING
            },
            employee_id: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            balance: {
                type: DataTypes.INTEGER.UNSIGNED
            },
        }
    )
    // TimeBalanceModel.belongsTo(EmployeeFactory(sequelize))
    return TimeBalanceModel
}

export default TimeBalanceFactory
