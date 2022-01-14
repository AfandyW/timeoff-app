import { EmployeeMap, IEmployeeDTO } from "./../../infra/domain/employee/model";
import { NotFoundError } from "./../../infra/helper/error";
import { employeeRepo } from "./../../infra/repository"

export class EmployeeService{
    async getAllEmployees(): Promise<IEmployeeDTO[]>{
        const result = await employeeRepo.findAll()

        const employees = result.map((data) => EmployeeMap.toDTO(data))

        return employees
    }

    async createNewEmployee(payload: {
        position_id: number,
        name: string,
        phone: string,
        email: string,
    }): Promise<IEmployeeDTO>{
        return await employeeRepo.save({
          position_id : payload.position_id,
          name : payload.name,
          phone : payload.phone,
          email : payload.email
        })
    }

    async updateEmployee(payload: {
        id: string,
        position_id: number,
        name: string,
        phone: string,
        email: string,
        direct_report_employee: string,
    }): Promise<void>{

        const id = parseInt(payload.id)
        const directReportEmployee = parseInt(payload.direct_report_employee)

        const employee = await employeeRepo.findByPk(id)

        if (!employee) throw new NotFoundError("Employee Not Found")

        employee.update({
            id: id,
            position_id : payload.position_id,
            name : payload.name,
            phone : payload.phone,
            email : payload.email,
            direct_report_employee: directReportEmployee,
        })

        await employeeRepo.update(employee)

        return
    }
}