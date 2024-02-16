import { ITimeOffBalance } from "./model";

export interface ITimeOffBalanceRepository {
    findAllByIdEmployee(id:number): Promise<ITimeOffBalance[]>;
    findByPk(id:number):Promise<ITimeOffBalance|null>;
    save(data:{
        employee_id: number,
        year: string,
        balance: number
    }): Promise<ITimeOffBalance>
    update(data:{
        employee_id: number,
        year: string,
        balance: number
    }): Promise<null>
}