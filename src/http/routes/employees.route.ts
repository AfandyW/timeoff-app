import { Router } from "express";
import {get, put, post}from "./../handlers/employees"

const router = Router()

router.get('/', get)

router.put('/:id', put)

router.post('/', post)

export default router