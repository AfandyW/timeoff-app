import { Optional, Model, DataTypes, Sequelize, BuildOptions, Association } from "sequelize";

export interface PositionAttributes {
    id?: number;
    name: string;
}

export type PositionCreationAttributes = Optional<PositionAttributes, "id">;

export class PositionModel extends Model<PositionAttributes,PositionCreationAttributes> implements PositionAttributes{
    public id!:number
    public name!: string

    public readonly createdAt!:Date
    public readonly updatedAt!:Date
}

export type TPosition = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): PositionModel;
};

const PositionFactory = (sequelize: Sequelize): TPosition => {
    const PositionModel = <TPosition>sequelize.define(
        "Positions", {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            name: {
                type: DataTypes.STRING
            },
        }
    )
    // PositionModel.hasMany( EmployeeFactory(sequelize),{
    //     foreignKey: 'position_id',
    //     as: 'employees'
    // })
    return PositionModel
}

export default PositionFactory
