import { Router } from "express";
import {get, put, post, getByEmployee}from "./../handlers/users"

const router = Router()

router.get('/', get)

router.get('/:employee_id', getByEmployee)

router.put('/:employee_id', put)

router.post('/', post)

export default router