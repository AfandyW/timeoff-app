import { Optional, Model, DataTypes, Sequelize, BuildOptions, Association } from "sequelize";

export interface EmployeeAttributes {
    id?: number;
    position_id: number;
    name: string;
    phone: string;
    email: string;
    direct_report_employee?: number;
}

export type EmployeeCreationAttributes = Optional<EmployeeAttributes, "id">;

export class EmployeeModel extends Model<EmployeeAttributes,EmployeeCreationAttributes> implements EmployeeAttributes{
    public id!:number
    public position_id!: number;
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
        "Employees", {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            position_id: {
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
    return EmployeeModel
}

export default EmployeeFactory