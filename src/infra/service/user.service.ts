import { IUserDTO, UserMap } from "./../../infra/domain/user/model";
import { NotFoundError } from "./../../infra/helper/error";
import { userRepo } from "./../../infra/repository";

export class UserService{
    async getUsers(): Promise<IUserDTO[]> {
        
        const result = await userRepo.findAll()

        return result.map((data) => UserMap.toDTO(data))
    }

    async getUser(id:string): Promise<IUserDTO> {
        const employeeId: number = parseInt(id)
        const result = await userRepo.findByIdEmployee(employeeId)

        return UserMap.toDTO(result)
    }

    async createUserEmployee(payload: {
        employee_id: string,
        username: string,
        password: string
    }): Promise<IUserDTO> {
        const idEmployee: number = parseInt(payload.employee_id)

        const employeeHasUser = await userRepo.findByIdEmployee(idEmployee)

        if (employeeHasUser) throw new NotFoundError("Employee Already Have User")

        const result = await userRepo.save({
            employee_id : idEmployee,
            username: payload.username,
            password: payload.password
        })

        return UserMap.toDTO(result)
    }

    async updateUserEmployee(payload: {
        employee_id: string,
        username: string,
        password: string
    }): Promise<null> {
        const idEmployee: number = parseInt(payload.employee_id)

        const user = await userRepo.findByIdEmployee(idEmployee)

        if (!user) throw new NotFoundError("User Not Found")
        
        await userRepo.update({
            employee_id : idEmployee,
            username: payload.username,
            password: payload.password
        })

        return null
    }
}