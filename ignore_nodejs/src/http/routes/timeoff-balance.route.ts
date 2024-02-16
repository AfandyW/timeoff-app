import { Router } from "express";
import {get, post}from "./../handlers/timeoff-balance"

const router = Router()

router.get('/:employee_id', get)

router.post('/', post)
router.put('/:employee_id')

export default router