import {Router} from "express"
import swagger from "./swagger.router"
import model from "../../infra/db/mysql/models"
import { responses } from "../../infra/helper/response"
import { NotFoundError } from "../../infra/helper/error/not-found-error"

const router = Router()

router.use('/', swagger)

router.get('/ping', async (req,res) => {
    res.json('message :pong')
})

router.get('/position', async (req,res) => {
    try{
        const positions = await model.Position.findAll()

        const response : responses = {
            code : 200,
            status: "Success Get Data",
            data: positions
        }

        res.status(200).json(response)
    } catch{
        const response : responses = {
            code : 200,
            status: "Success Get Data",
        }
        res.status(500).json(response)
    }
})

router.put('/position/:id', async (req,res) => {
    try{
        const {name} = req.body
        const {id} = req.params
        let positionId =  parseInt(id)
        
        const position = await model.Position.findByPk(positionId)

        if (!position) {
            const err = new NotFoundError("Position Not Found")
            const response: responses = {
                code: err.code,
                status: err.message
            }
            res.status(404).json(response)
            return
        }

        await model.Position.update({name: name}, {
            where: {
                id: id
            }
        })

        const response : responses = {
            code : 201,
            status: "Success Update Position",
        }

        res.status(201).json(response)
    }catch{
        res.status(500)
        res.json({
                "code": 500,
                "status": "Internal Server Error"
        })
    }
})

router.post('/position', async (req,res) => {
    try{
        const {name} = req.body

        await model.Position.create({
            name : name
        })

        const response : responses = {
            code : 201,
            status: "Success Create New Position",
        }

        res.status(201).json(response)
    }catch{
        const response : responses = {
            code : 500,
            status: "Success Get Data",
        }
        res.status(500).json(response)
    }
})

export default router;