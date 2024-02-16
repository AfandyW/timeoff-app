import { ITimeOffBalanceRepository } from "./../../infra/domain/timeoff-balance/repository";
import { ITimeOffBalance, TimeOffBalance, TimeOffBalanceMap } from "./../../infra/domain/timeoff-balance/model";
import model from "./../db/mysql/models"
import { NotFoundError } from "./../../infra/helper/error";

export class TimeOffBalanceRepository implements ITimeOffBalanceRepository{
    async findAllByIdEmployee(id: number): Promise<TimeOffBalance[]> {
        const result = await model.TimeBalance.findAll({
            where: {
                employee_id: id
            }
        })

        if (!result) throw new NotFoundError("TimeOff Balance Not Found")

        return result.map((data) => TimeOffBalanceMap.toDomain(data))
    }

    async findByPk(id: number): Promise<TimeOffBalance | null> {
        const result = await model.TimeBalance.findByPk(id)

        if (!result) return null

        return TimeOffBalanceMap.toDomain(result)
    }

    async save(data: { 
        employee_id: number; 
        year: string; 
        balance: number; 
    }): Promise<ITimeOffBalance> {

        const result = await model.TimeBalance.create({
            employee_id : data.employee_id,
            year: data.year,
            balance: data.balance,
        })
        
        return TimeOffBalanceMap.toDomain(result)
    }

    async update(data: ITimeOffBalance): Promise<null> {
        
        await model.TimeBalance.update({balance: data.balance},{
            where: {
                employee_id: data.employee_id
            }
        })
        
        return null
    }
}