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

router.get('/employees', async (req, res) => {
    try{
        const employees = await model.Employee.findAll()

        const response: responses = {
            code: 200,
            status: "Success Get Data",
            data: employees
        }

        res.status(200).json(response)
    } catch{
        res.status(500)
        res.json({
                "code": 500,
                "status": "Internal Server Error"
        })
    }
})

router.post('/employees', async (req, res) => {
    try{
        const { position_id, name, phone, email } = req.body

        await model.Employee.create({
            position_id: position_id,
            name: name,
            phone: phone,
            email: email
        })

        const response: responses = {
            code: 201,
            status: "Success Create New Employee",
        }

        res.status(201).json(response)
    } catch(err){
        console.log(err)
        res.status(500)
        res.json({
                "code": 500,
                "status": "Internal Server Error"
        })
    }
})

router.put('/employees/:id', async (req, res) => {
    try{
        const { position_id, name, phone, email, direct_report_employee } = req.body
        const {id} = req.params

        const employeeId = parseInt(id)

        const employee = await model.Employee.findByPk(employeeId)

        if (!employee) {
            const err = new NotFoundError("Employee Not Found")
            const response: responses = {
                code: err.code,
                status: err.message
            }
            res.status(404).json(response)
            return
        }

        await model.Employee.update({
            position_id: position_id,
            name: name,
            phone: phone,
            email: email,
            direct_report_employee: direct_report_employee
        }, {
            where: {
                id: id
            }
        })

        const response: responses = {
            code: 201,
            status: "Success Update data employee",
        }

        res.status(201).json(response)
    } catch{
        res.status(500)
        res.json({
                "code": 500,
                "status": "Internal Server Error"
        })
    }
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
        res.status(500)
        res.json({
                "code": 500,
                "status": "Internal Server Error"
        })
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
        const response : responses = {
            code : 500,
            status: "Internal Server Error"
        }
        res.status(500).json(response)
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
            status: "Internal Server Error"
        }
        res.status(500).json(response)
    }
})

export default router;