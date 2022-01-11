import { User } from "./model";

export interface IUserRepository {
    findAll(): Promise<User[]>,
    findByIdEmployee(id: number): Promise<User>,
    findByUsername(username: string): Promise<User>,
    save(data:{
        employee_id: number,
        username: string,
        password: string,
    }): Promise<User>,
    update(data:{
        username: string,
        password: string,
    }): Promise<null>,
}