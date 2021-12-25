import { Router } from "express";
import {get, put, post}from "../handlers/positions"

const router = Router()

router.get('/position', get)

router.put('/position/:id', put)

router.post('/position', post)

export default router