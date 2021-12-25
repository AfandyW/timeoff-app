import { IPositionDTO, PositionMap } from "./../../infra/domain/position/model"
import { NotFoundError } from "./../../infra/helper/error"
import { positionRepo } from "./../../infra/repository"

export class PositionService{
    async getAllPosition(): Promise<IPositionDTO[]>{
        const result = await positionRepo.findAll()

        return result.map((data) => PositionMap.toDTO(data))
    }

    async createNewPosition(payload: {
        name:string,
    }): Promise<IPositionDTO>{
        const result = await positionRepo.save(payload.name)
        return PositionMap.toDTO(result)
    }

    async updateNamePosition(payload: {
        id:string,
        name:string,
    }): Promise<void>{
        const id: number = parseInt(payload.id)
        const position = await positionRepo.findById(id)

        if (!position) throw new NotFoundError("Position Not Found")

        position.changeName(payload.name)

        //todo positionrepo.update return null, need check
        await positionRepo.update(position)
    }
}