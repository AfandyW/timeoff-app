import { Router } from "express";
import { login }from "./../handlers/auth"

const router = Router()

router.get('/login', login)

export default router