import {Router} from "express"
import swagger from "./swagger.router"
import positionRouter from "./../routes/positions.route"
import employeeRouter from "./../routes/employees.route"

const router = Router()

router.use('/', swagger)

router.get('/ping', async (req,res) => {
    res.json('message :pong')
})

router.use('/position', positionRouter)
router.use('/employee', employeeRouter)

export default router;