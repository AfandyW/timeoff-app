import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import { userService } from './../../../infra/service'
import { responses } from './../../../infra/helper/response'

export async function get(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        const users = await userService.getUsers()

        const response : responses = {
            code : httpStatus.OK,
            status: "Success Get Data",
            data: users
        }

        res.status(httpStatus.OK).json(response)
    } catch(error){
        next(error)
    }
}


export async function put(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        const {username, password} = req.body
        const {employee_id} = req.params

        await userService.updateUserEmployee({
            employee_id,
            username,
            password,
        })

        const response : responses = {
            code : 201,
            status: "Success Update User",
        }

        res.status(201).json(response)
    }catch(error){
        next(error)
    }
}

export async function post(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        const {username, password} = req.body
        const {employee_id} = req.params

        const user = await userService.createUserEmployee({
            employee_id,
            username,
            password,
        })

        const response : responses = {
            code : 201,
            status: "Success Create New User",
            data: user
        }

        res.status(201).json(response)
    }catch(error){
        next(error)
    }
}