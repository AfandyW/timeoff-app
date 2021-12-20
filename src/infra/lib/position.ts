interface IPosition {
    id: number
    name: string;
}

export class Position {
    public readonly id: number;
    public name: string;

    constructor(data: IPosition){
        const { id, name } = data
        this.id = id
        this.name = name
    }
}