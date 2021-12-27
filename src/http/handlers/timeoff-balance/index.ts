import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import { responses } from './../../../infra/helper/response'
import { timeoffBalanceService } from './../../../infra/service'

export async function get(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        const {employee_id} = req.params
        const timeOff = await timeoffBalanceService.getTimeOffBalance(employee_id)

        const response : responses = {
            code : httpStatus.OK,
            status: "Success Get Data",
            data: timeOff
        }

        res.status(httpStatus.OK).json(response)
    } catch(error){
        next(error)
    }
}

export async function post(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        const {year, balance} = req.body
        const {employee_id} = req.params

        const timeOffBalance = await timeoffBalanceService.createNewTimeOffBalance({
            employee_id, year, balance
        })

        const response : responses = {
            code : 201,
            status: "Success Create New TimeOff Balance",
            data: timeOffBalance
        }

        res.status(201).json(response)
    }catch(error){
        next(error)
    }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        const {year, balance} = req.body
        const {employee_id} = req.params

        await timeoffBalanceService.updateTimeOffBalance({
            employee_id, year, balance
        })

        const response : responses = {
            code : 201,
            status: "Success Update TimeOff Balance",
        }

        res.status(201).json(response)
    }catch(error){
        next(error)
    }
}