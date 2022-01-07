import { ITimeOff, TimeOff } from "./model";

export interface ITimeOffRepository {
    findAllByIdReviewer(id_reviewer:number): Promise<ITimeOff[]>;
    findAllByIdEmployee(employee_id:number): Promise<ITimeOff[]>;
    findAllByStatus(status:string): Promise<ITimeOff[]>;
    findByPk(id:number):Promise<ITimeOff|null>;
    save(data:{
        employee_id: number,
        start_date: string,
        end_date: string,
        remarks: string,
        status: string,
        reviewer_employee_id: number,
    }): Promise<ITimeOff>
    update(data:TimeOff): Promise<null>
    updateStatus(data:TimeOff): Promise<null>
}