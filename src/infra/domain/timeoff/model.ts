import {TimeOffModel} from "./../../../infra/db/mysql/models/time-off"
export interface ITimeOff{
    id?: number| null;
    employee_id: number|null;
    start_date: string;
    end_date: string;
    remarks: string;
    status: string;
    reviewer_employee_id: number|null;
}

export interface ITimeOffDTO{
    id?: number| null;
    employee_id: number|null;
    start_date: string;
    end_date: string;
    remarks: string;
    status: string;
    reviewer_employee_id: number|null;
}

export class TimeOff implements ITimeOff{
    public readonly id?: number | null;
    public employee_id: number | null;
    public start_date: string;
    public end_date: string;
    public remarks: string;
    public status: string;
    public reviewer_employee_id: number | null;

    constructor(data: ITimeOff) {
        const {id, employee_id, start_date, end_date, remarks, status, reviewer_employee_id} = data
        this.id = id
        this.employee_id = employee_id
        this.start_date = start_date
        this.end_date = end_date
        this.remarks = remarks
        this.status = status
        this.reviewer_employee_id = reviewer_employee_id
    }

    updateStatus(status: string) {
        this.status = status
    }

    update(start_date: string, end_date:string, remarks: string) {
        if (start_date) this.start_date = start_date
        if (end_date) this.end_date = end_date
        if (remarks) this.remarks = remarks
    }

    public static create(data:ITimeOff){
        return new TimeOff(data)
    }
}

export class TimeOffMap{
    public static ToDomain(data: TimeOffModel): TimeOff{
        return TimeOff.create({
            id: data.id,
            employee_id: data.employee_id,
            start_date: data.start_date,
            end_date: data.end_date,
            remarks: data.remarks,
            status: data.status,
            reviewer_employee_id: data.reviewer_employee_id,
        })
    }
    public static ToDTO(data: TimeOff): ITimeOffDTO{
        const timeoff: ITimeOffDTO = {
            id: data.id,
            employee_id: data.employee_id,
            start_date: data.start_date,
            end_date: data.end_date,
            remarks: data.remarks,
            status: data.status,
            reviewer_employee_id: data.reviewer_employee_id,
        }
        return timeoff;
    }
}