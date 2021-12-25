require('dotenv').config();
import express from 'express'
import http from 'http'
import cors from 'cors'

import morgan from 'morgan'
import router from './routes'

import { errorHandler, notFoundErrorHandler } from './routes/error.route';

const app = express()
const server = http.createServer(app)

app.use(cors({
    origin: '*',
}))
app.use(express.json())

//only dev
app.use(morgan("tiny"))

//catch if not route
app.use("*", notFoundErrorHandler)

//api-docs
app.use("/api/v1", router)

//catch error
router.use(errorHandler)

export default server;