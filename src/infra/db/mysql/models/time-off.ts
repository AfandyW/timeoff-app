import { Optional, Model, DataTypes, Sequelize, BuildOptions, Association } from "sequelize";
import EmployeeFactory from "./employees";

export interface TimeOffAttributes {
    id?: number;
    employee_id: number;
    start_date: string;
    end_date: string;
    remarks: string;
    status: string;
    reviewer_employee_id: number;
}

export type TimeOffCreationAttributes = Optional<TimeOffAttributes, "id">;

export class TimeOffModel extends Model<TimeOffAttributes,TimeOffCreationAttributes> implements TimeOffAttributes{
    public id!:number
    public employee_id!: number;
    public start_date!: string;
    public end_date!: string;
    public remarks!: string;
    public status!: string;
    public reviewer_employee_id!: number;

    public readonly createdAt!:Date
    public readonly updatedAt!:Date
}

export type TTimeOff = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): TimeOffModel;
};

const TimeOffFactory = (sequelize: Sequelize): TTimeOff => {
    const TimeOffModel = <TTimeOff>sequelize.define(
        "Timeoffs", {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            employee_id: {
                allowNull: false,
                type: DataTypes.INTEGER.UNSIGNED
            },
            start_date: {
                type: DataTypes.DATE
            },
            end_date: {
                type: DataTypes.DATE
            },
            remarks: {
                type: DataTypes.STRING
            },
            status: {
                type: DataTypes.STRING
            },
            reviewer_employee_id: {
                allowNull: false,
                type: DataTypes.INTEGER.UNSIGNED
            },
        }
    )
    // TimeOffModel.belongsTo(EmployeeFactory(sequelize))
    return TimeOffModel
}

export default TimeOffFactory
