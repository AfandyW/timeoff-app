import model from "../db/mysql/models"
import { Employee, EmployeeMap, IEmployee } from "./../../infra/domain/employee/model";
import { IEmployeeRepository } from "./../../infra/domain/employee/repository";

export class EmployeeRepository implements IEmployeeRepository{
    async findAll(): Promise<Employee[]> {

        const result = await model.Employee.findAll()

        return result.map((data) => EmployeeMap.toDomain(data))
    }

    async findByPk(id: number): Promise<Employee | null> {
        const result = await model.Employee.findByPk(id)

        if (!result) return null

        return EmployeeMap.toDomain(result!)
    }

    async save(data: IEmployee): Promise<Employee>{
        const {position_id, name, phone, email } = data
        const result = await model.Employee.create({
            position_id: position_id!,
            name: name,
            phone: phone,
            email: email
        })

        return EmployeeMap.toDomain(result)
    }

    async update(data: IEmployee): Promise<null>{
        const {id, position_id, name, phone, email } = data
        await model.Employee.update({
            position_id: position_id!,
            name: name,
            phone: phone,
            email: email
        }, {
            where: {
                id:id
            }
        })

        return null
    }
}