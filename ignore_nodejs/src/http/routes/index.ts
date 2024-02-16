import {Router} from "express"
import swagger from "./swagger.router"
import positionsRouter from "./../routes/positions.route"
import employeesRouter from "./../routes/employees.route"
import usersRouter from "./../routes/users.route"
import timeoffBalanceRouter from "./../routes/timeoff-balance.route"
import timeOffRouter from "./../routes/timeoff.route"
import authRouter from "./../routes/auth.route"

const router = Router()

router.use('/', swagger)

router.get('/ping', async (req,res) => {
    res.json('message :pong')
})

router.use('/auth', authRouter)

router.use('/positions', positionsRouter)
router.use('/employees', employeesRouter)

router.use('/employees/:employee_id/users', usersRouter)
router.use('/employees/:employee_id/timeoff-balance', timeoffBalanceRouter)

router.use('/timeoff', timeOffRouter)

export default router;