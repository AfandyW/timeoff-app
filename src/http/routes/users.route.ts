import { Router } from "express";
import {get, put, post}from "./../handlers/users"

const router = Router()

router.get('/', get)

router.put('/:id', put)

router.post('/', post)

export default router