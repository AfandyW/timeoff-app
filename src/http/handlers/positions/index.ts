import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import { responses } from 'infra/helper/response'
import { IPositionDTO } from './../../../infra/domain/position/model'
import { positionService } from './../../../infra/service'

export async function get(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        const positions = await positionService.getAllPosition()

        const response : responses = {
            code : httpStatus.OK,
            status: "Success Get Data",
            data: positions
        }

        res.status(httpStatus.OK).json(response)
    } catch(error){
        next(error)
    }
}


export async function put(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        const {name} = req.body
        const {id} = req.params
        
        await positionService.updateNamePosition({
            id, name
        })

        const response : responses = {
            code : 201,
            status: "Success Update Position",
        }

        res.status(201).json(response)
    }catch(error){
        next(error)
    }
}

export async function post(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        const {name} = req.body

        await positionService.createNewPosition({name})

        const response : responses = {
            code : 201,
            status: "Success Create New Position",
        }

        res.status(201).json(response)
    }catch(error){
        next(error)
    }
}