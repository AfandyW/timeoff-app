import { PositionModel } from "infra/db/mysql/models/positions";

// model return to api
export interface IPositionDTO {
    id? : number|null;
    name?: string
}

//domain for db
export interface IPosition {
    id? : number | null;
    name: string;
}

export class Position implements IPosition{
    public readonly id?: number;
    public name: string;
    constructor(data: IPosition){
        const { name, id } = data
        this.name = name
        this.id = id!
    }

    static create(data: IPosition): Position{
        return new Position(data)
    }

    // logic bisnis

    public changeName(name:string){
        this.name = name
    }    
}

//mapper model
export class PositionMap {
    public static toDomain(position: PositionModel): Position {
        return Position.create({
            id: position.id,
            name: position.name
        })
    }

    public static toDTO(position: Position): IPositionDTO {
        const Position: IPositionDTO = {
            id: position.id,
            name: position.name
        }
        return Position
    }
}