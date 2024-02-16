import { Request, Response, NextFunction } from "express"
import httpStatus from "http-status"
import { responses } from "./../../../infra/helper/response"
import { employeeService } from "./../../../infra/service"
export async function get(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try{
        const employees = await employeeService.getAllEmployees()

        const response : responses = {
            code : httpStatus.OK,
            status: "Success Get Data",
            data: employees
        }

        res.status(httpStatus.OK).json(response)
    }catch(error){
        next(error)
    }
}

export async function post(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try{
        const {position_id, name, phone, email} = req.body 
        const employee = await employeeService.createNewEmployee({
            position_id,
            name,
            phone,
            email
        })

        const response : responses = {
            code : httpStatus.CREATED,
            status: "Success Create New Employee",
            data: employee
        }

        res.status(httpStatus.CREATED).json(response)
    }catch(error){
        next(error)
    }
}

export async function put(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try{
        const {position_id, name, phone, email, direct_report_employee} = req.body 
        const {id} = req.params

        await employeeService.updateEmployee({
            id,
            position_id,
            name,
            phone,
            email,
            direct_report_employee,
        })

        const response : responses = {
            code : httpStatus.CREATED,
            status: "Success Update Data Employee",
        }

        res.status(httpStatus.CREATED).json(response)
    }catch(error){
        next(error)
    }
}