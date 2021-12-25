import { IPosition, Position, PositionMap } from "./../../infra/domain/position/model";
import { IPositionRepository } from "./../../infra/domain/position/repository";
import model from "../db/mysql/models"

export class PositionRepo implements IPositionRepository{
    async findAll(): Promise<Position[]> {
        const result = await model.Position.findAll()

        return result.map((data) => PositionMap.toDomain(data) )
    }

    async findById(id: number): Promise<Position | null> {
        const result = await model.Position.findByPk(id)

        if (!result) return null

        return PositionMap.toDomain(result)
    }

    async save(name:string): Promise<Position>{
        const result = await model.Position.create({
            name: name
        })
        
        return PositionMap.toDomain(result)
    }

    async update(position: IPosition): Promise<null>{
        await model.Position.update({name: position.name}, {
            where: {
                id: position.id
            }
        })
        //todo cant return like this, have to check return
        return null
    }
}