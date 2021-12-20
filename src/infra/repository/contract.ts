import {Position} from "../lib/position"

export interface IPositionRepo {
    findAll() : Promise<Array<Position>>
    findByPk(id: number): Promise<Position | null>
}