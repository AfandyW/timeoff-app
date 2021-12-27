import { TimeBalanceModel } from "infra/db/mysql/models/time-balance";

export interface ITimeOffBalance {
    id?: number |null,
    employee_id: number|null,
    year: string,
    balance: number
}

export interface ITimeOffBalanceDTO {
    id?: number |null,
    employee_id: number|null,
    year: string,
    balance: number
}

export class TimeOffBalance implements ITimeOffBalance{
    public readonly id?: number | null;
    public employee_id: number | null;
    public year: string;
    public balance: number;

    constructor(data: ITimeOffBalance){
        const {id, employee_id, year, balance} = data
        this.id = id
        this.employee_id = employee_id
        this.year = year
        this.balance = balance
    }

    static create(data: ITimeOffBalance){
        return new TimeOffBalance(data)
    }

    //todo logic bisnis
}

export class TimeOffMap{
    public static toDomain(data: TimeBalanceModel): TimeOffBalance{
        return TimeOffBalance.create({
            id : data.id,
            employee_id : data.employee_id,
            year : data.year,
            balance: data.balance
        })
    }

    public static toDTO(data: TimeOffBalance): ITimeOffBalanceDTO{
        const timeOffBalance: ITimeOffBalanceDTO = {
            id : data.id,
            employee_id : data.employee_id,
            year : data.year,
            balance: data.balance
        }
        return timeOffBalance
    }
}
