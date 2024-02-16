import { EmployeeModel } from "./../../../infra/db/mysql/models/employees";

export interface IEmployee {
    id?: number |null;
    position_id?: number |null;
    name: string;
    phone: string;
    email: string;
    direct_report_employee?: number|null;
}

export interface IEmployeeDTO {
    id?: number |null;
    position_id?: number |null;
    name: string;
    phone: string;
    email: string;
    direct_report_employee?: number|null;
}

export class Employee implements IEmployee {
    public readonly id?: number;
    public position_id?: number | null;
    public name: string;
    public phone: string;
    public email: string;
    public direct_report_employee?: number| null;
    constructor(data: IEmployee){
        const {id, position_id, name, phone, email, direct_report_employee} = data
        this.id = id!
        this.position_id = position_id!
        this.name = name
        this.phone = phone
        this.email = email
        this.email = email
        this.direct_report_employee = direct_report_employee!
    }

    static create(data: IEmployee): Employee{
        return new Employee(data)
    }

    getReviewer(): number{
        return this.direct_report_employee!
    }

    update(data: IEmployeeDTO){
        const {position_id, name, phone, email} = data
        if (position_id) this.position_id = position_id 
        if (name) this.name = name
        if (phone) this.phone = phone
        if (email) this.email = email 
    }
    updatePosition(position: number){
        if (position) this.position_id = position
    }
    updateDirectReport(employeeId: number){
        if (employeeId) this.direct_report_employee = employeeId
    }
}

export class EmployeeMap{
    public static toDomain(employee: EmployeeModel): Employee{
        return Employee.create({
            id: employee.id,
            position_id: employee.position_id,
            name: employee.name,
            phone: employee.phone,
            email: employee.email,
            direct_report_employee: employee.direct_report_employee,
        })
    }

    public static toDTO(employee:Employee): IEmployeeDTO{
        const employe: IEmployeeDTO = {
            id: employee.id,
            position_id: employee.position_id,
            name: employee.name,
            phone: employee.phone,
            email: employee.email,
            direct_report_employee: employee.direct_report_employee,
        }

        return employe
    }
}