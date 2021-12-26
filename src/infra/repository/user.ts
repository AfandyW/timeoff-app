import  model  from "./../db/mysql/models"
import { User, UserMap } from "./../../infra/domain/user/model";
import { IUserRepository } from "./../../infra/domain/user/repository";
import { NotFoundError } from "./../../infra/helper/error";

export class UserRepository implements IUserRepository{
    async findAll():Promise<User[]>{
        const result = await model.User.findAll()

        return result.map((data) => UserMap.toDomain(data))
    }

    async findByIdEmployee(id: number):Promise<User>{
        const result = await model.User.findOne({
            where: {
                id: id
            }
        })

        if (!result) throw new NotFoundError("Employee Not Found")

        return UserMap.toDomain(result)
    }

    async save(data: {
        employee_id: number,
        username: string,
        password: string,
    }):Promise<User>{
        const result = await model.User.create({
            employee_id: data.employee_id,
            username: data.username,
            password: data.password,
        })

        return UserMap.toDomain(result)
    }

    async update(data: {
        employee_id: number,
        username: string,
        password: string,
    }):Promise<null>{
        await model.User.update({
            username: data.username,
            password: data.password,
        }, {
            where: {
                employee_id: data.employee_id
            }
        })

        return null
    }

}