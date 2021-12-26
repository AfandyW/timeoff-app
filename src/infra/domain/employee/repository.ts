import { Employee, IEmployee } from "./model";

export interface IEmployeeRepository {
    findAll(): Promise<Employee[]>
    findByPk(id:number): Promise<Employee | null>
    save(employee: IEmployee): Promise<Employee>
    update(employee:IEmployee): Promise<null>
}