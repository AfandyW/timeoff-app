import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'
import { positionRepo } from 'infra/repository'
import { responses } from 'infra/helper/response'
import { IPosition, IPositionDTO } from 'infra/domain/position/model'
import { positionService } from 'infra/service'

export async function get(req: Request, res: Response, next: NextFunction): Promise<void>{
    try{
        const positions = positionService.getAllPosition()

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
        
        positionService.updateNamePosition({
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
        const {name}: IPositionDTO = req.body

        const response : responses = {
            code : 201,
            status: "Success Create New Position",
        }

        res.status(201).json(response)
    }catch(error){
        next(error)
    }
}