import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import { authService } from './../../../infra/service'
import { responses } from './../../../infra/helper/response'

export async function login(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        const {username, password} = req.body
        const token = await authService.login({username, password})

        const response : responses = {
            code : httpStatus.OK,
            status: "Success Login",
            data: token
        }

        res.status(httpStatus.OK).json(response)
    } catch(error){
        next(error)
    }
}