import {Router} from "express"
import swagger from "./swagger.router"

const router = Router()

router.use('/', swagger)

export default router;