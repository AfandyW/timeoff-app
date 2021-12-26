import { EmployeeModel } from "./../../../infra/db/mysql/models/employees";

export interface IEmployee {
    id?: number |null;
    position_id?: number |null;
    name: string;
    phone: string;
    email: string;
}

export interface IEmployeeDTO {
    id?: number |null;
    position_id?: number |null;
    name: string;
    phone: string;
    email: string;
}

export class Employee implements IEmployee {
    public readonly id?: number;
    public position_id?: number | null;
    public name: string;
    public phone: string;
    public email: string;
    constructor(data: IEmployee){
        const {id, position_id, name, phone, email} = data
        this.id = id!
        this.position_id = position_id
        this.name = name
        this.phone = phone
        this.email = email
    }

    static create(data: IEmployee): Employee{
        return new Employee(data)
    }

    update(data: IEmployeeDTO){
        const {position_id, name, phone, email} = data
        if (position_id) this.position_id = position_id 
        if (name) this.name = name
        if (phone) this.phone = phone
        if (email) this.email = email 
    }
}

export class EmployeeMap{
    public static toDomain(employee: EmployeeModel): Employee{
        return Employee.create({
            id: employee.id,
            position_id: employee.position_id,
            name: employee.name,
            phone: employee.phone,
            email: employee.email
        })
    }

    public static toDTO(employee:Employee): IEmployeeDTO{
        const employe: IEmployeeDTO = {
            id: employee.id,
            position_id: employee.position_id,
            name: employee.name,
            phone: employee.phone,
            email: employee.email
        }

        return employe
    }
}