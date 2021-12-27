import { Router } from "express";
import {get, put, post}from "./../handlers/employees"
import userRouter from "./users.route"
import timeOffBalanceRoute from "./timeoff-balance.route"

const router = Router()

router.get('/', get)

router.post('/', post)

router.put('/:id', put)

export default router