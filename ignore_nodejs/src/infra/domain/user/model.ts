import { UserModel } from "./../../../infra/db/mysql/models/users";

export interface IUser {
    id? : number | null,
    employee_id?: number |null,
    username: string,
    password: string,
}

export interface IUserDTO {
    id? : number | null,
    employee_id?: number |null,
    username: string,
}

export class User implements IUser{
    public readonly id: number | null;
    public employee_id?: number | null;
    public username: string;
    public password: string;

    constructor(data: IUser){
        const {id, employee_id, username, password } = data

        this.id = id!
        this.employee_id = employee_id
        this.username = username
        this.password = password
    }

    static create(data: IUser): User{
        return new User(data)
    }

    // list logic, { has password}
}

export class UserMap{
    static toDomain(data: UserModel): User {
        return User.create({
            id: data.id!,
            employee_id: data.employee_id,
            username: data.username,
            password: data.password
        })
    }

    static toDTO(data: User): IUserDTO{
        const user: IUserDTO = {
            id: data.id,
            employee_id: data.employee_id,
            username: data.username
        }
        return user
    }
}