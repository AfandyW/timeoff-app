import { Router } from "express";
import {getByEmployee, post, updateByEmployee, getByReviewer, updateByReviewer}from "./../handlers/timeoff"

const router = Router()

//employee
router.get('/', getByEmployee)

router.post('/', post)

router.put('/:employee_id', updateByEmployee)

// reviewer
router.get('/requested', getByReviewer)

router.put('/requested/:employee_id', updateByReviewer)

export default router