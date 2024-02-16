import { Position } from "./model";

export interface IPositionRepository {
    findAll() : Promise<Array<Position>>;
    findById(id: number): Promise<Position | null>;
    save(name:string): Promise<Position>;
    update(position: Position): Promise<null>;
}