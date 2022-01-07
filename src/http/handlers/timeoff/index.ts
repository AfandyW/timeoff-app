import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import { responses } from './../../../infra/helper/response'
import { timeOffService } from './../../../infra/service'

export async function getByEmployee(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        const {employee_id} = req.params
        const timeOff = await timeOffService.getTimeOffByIdEmployee(employee_id)

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

export async function getByReviewer(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        const {employee_id} = req.params
        const timeOff = await timeOffService.getTimeOffByIdReviewer(employee_id)

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
        // todo get employee id from user login
        const {employee_id, start_date, end_date, remarks} = req.body

        //todo validate req.body
        const payload = {employee_id, start_date, end_date, remarks}

        const timeOff = await timeOffService.createNewTimeOff(payload)

        const response : responses = {
            code : 201,
            status: "Success Create New TimeOff",
            data: timeOff
        }

        res.status(201).json(response)
    }catch(error){
        next(error)
    }
}

export async function updateByEmployee(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        // todo get employee id from user login
        const {employee_id,start_date, end_date, remarks} = req.body
        const {id} = req.params

        //todo validate req.body

        const timeOff = await timeOffService.updateTimeOff(
            {
                id,
                employee_id,
                start_date,
                end_date,
                remarks
            }
        )

        const response : responses = {
            code : 201,
            status: "Success Update TimeOff",
            data: timeOff
        }

        res.status(201).json(response)
    }catch(error){
        next(error)
    }
}

export async function updateByReviewer(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        // todo get employee id from user login
        const {employee_id,status} = req.body
        const {id} = req.params

        //todo validate req.body

        const timeOff = await timeOffService.updateTimeOffStatus(
            {
                id,
                reviewer_id: employee_id,
                status,
            }
        )

        const response : responses = {
            code : 201,
            status: "Success Update TimeOff",
            data: timeOff
        }

        res.status(201).json(response)
    }catch(error){
        next(error)
    }
}