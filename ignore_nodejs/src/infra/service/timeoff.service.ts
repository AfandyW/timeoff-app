import { TimeOffMap,ITimeOffDTO } from "./../../infra/domain/timeoff/model";
import { NotFoundError, ForbidenError } from "./../../infra/helper/error";
import { timeOffRepo, employeeRepo } from "./../../infra/repository";

export class TimeOffService{
    async createNewTimeOff(payload: {
        employee_id: string,
        start_date: string,
        end_date: string,
        remarks: string,
    }): Promise<ITimeOffDTO>{
        const employeeId: number = parseInt(payload.employee_id)
        const {start_date, end_date, remarks} = payload

        const employee = await employeeRepo.findByPk(employeeId)
        
        if (!employee) throw new NotFoundError("Employee Not Found")

        const reviewerId = employee.getReviewer()

        if (reviewerId == 0) throw new NotFoundError("No Reviewers Available")

        const status = "requested"

        const result = await timeOffRepo.save({
            employee_id: employeeId,
            start_date,
            end_date,
            remarks,
            status,
            reviewer_employee_id: reviewerId
        })

        return TimeOffMap.ToDTO(result)
    }

    async getTimeOffByIdReviewer(
        reviewer_employee_id: string,
    ): Promise<ITimeOffDTO[]>{
        //todo by jwt token id
        const reviewerId: number = parseInt(reviewer_employee_id)
        const result = await timeOffRepo.findAllByIdReviewer(reviewerId)

        return result.map((data) => TimeOffMap.ToDTO(data))
    }

    async getTimeOffByIdEmployee(
        employee_id: string,
    ): Promise<ITimeOffDTO[]>{
        //todo by jwt token id
        const reviewerId: number = parseInt(employee_id)
        const result = await timeOffRepo.findAllByIdEmployee(reviewerId)

        return result.map((data) => TimeOffMap.ToDTO(data))
    }

    async updateTimeOff(payload:{
        id: string,
        employee_id: string,
        start_date: string,
        end_date: string,
        remarks: string,
    }): Promise<null>{
        const id: number = parseInt(payload.id)
        const employeeId: number = parseInt(payload.employee_id)

        //todo check employee 
        const timeOff = await timeOffRepo.findByPk(id)

        if (!timeOff) throw new NotFoundError("TimeOff Not Found")

        if (timeOff.employee_id != employeeId) throw new ForbidenError("Sorry, You Dont Have Permission For This")

        const {start_date, end_date, remarks} = payload
        timeOff.update(start_date, end_date, remarks)

        await timeOffRepo.update(timeOff)

        return null
    }

    async updateTimeOffStatus(payload:{
        id: string,
        status: string,
        reviewer_id: string,
    }): Promise<null>{
        const id: number = parseInt(payload.id)
        const reviewerId : number = parseInt(payload.reviewer_id)

        const timeOff = await timeOffRepo.findByPk(id)

        if (!timeOff) throw new NotFoundError("TimeOff Not Found")

        if (timeOff.reviewer_employee_id != reviewerId) throw new ForbidenError("Sorry, You Dont Have Permission For This")

        const {status} = payload
        timeOff.updateStatus(status)

        await timeOffRepo.update(timeOff)

        return null
    }
}