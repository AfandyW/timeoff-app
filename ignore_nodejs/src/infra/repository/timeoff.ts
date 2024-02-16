import model from "./../db/mysql/models"
import { NotFoundError } from "./../../infra/helper/error";
import { ITimeOffRepository } from "./../../infra/domain/timeoff/repository";
import { TimeOff, TimeOffMap } from "./../../infra/domain/timeoff/model";

export class TimeOffRepository implements ITimeOffRepository{
    async findAllByIdReviewer(id: number): Promise<TimeOff[]> {
        const result = await model.TimeOff.findAll({
            where: {
                reviewer_employee_id: id
            }
        })

        if (!result) throw new NotFoundError("TimeOff Not Found")

        return result.map((data) => TimeOffMap.ToDomain(data))
    }

    async findAllByIdEmployee(id: number): Promise<TimeOff[]> {
        const result = await model.TimeOff.findAll({
            where: {
                employee_id: id
            }
        })

        if (!result) throw new NotFoundError("TimeOff Not Found")

        return result.map((data) => TimeOffMap.ToDomain(data))
    }

    async findAllByStatus(status: string): Promise<TimeOff[]> {
        const result = await model.TimeOff.findAll({
            where: {
                status: status
            }
        })

        if (!result) throw new NotFoundError("TimeOff Nof Found")

        return result.map((data) => TimeOffMap.ToDomain(data))
    }

    async findByPk(id: number): Promise<TimeOff | null> {
        const result = await model.TimeOff.findByPk(id)

        if (!result) return null

        return TimeOffMap.ToDomain(result)
    }

    async save(data: { 
        employee_id: number,
        start_date: string,
        end_date: string,
        remarks: string,
        status: string,
        reviewer_employee_id: number,
    }): Promise<TimeOff> {

        const result = await model.TimeOff.create({
            employee_id: data.employee_id,
            start_date: data.start_date,
            end_date: data.end_date,
            remarks: data.remarks,
            status: data.status,
            reviewer_employee_id: data.reviewer_employee_id,
        })
        
        return TimeOffMap.ToDomain(result)
    }

    async update(data: TimeOff): Promise<null> {
        
        await model.TimeOff.update({
            start_date: data.start_date,
            end_date: data.end_date,
            remarks: data.remarks,
        },{
            where: {
                id: data.id
            }
        })
        
        return null
    }

    async updateStatus(data: TimeOff): Promise<null> {
        
        await model.TimeOff.update({
            status: data.status,
        },{
            where: {
                id: data.id
            }
        })
        
        return null
    }
}