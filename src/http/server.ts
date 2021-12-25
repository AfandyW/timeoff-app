require('dotenv').config();
import express from 'express'
import http from 'http'
import cors from 'cors'

import morgan from 'morgan'
import router from './routes'

import { errorHandler, notFoundErrorHandler } from './routes/error.route';

const app = express()

app.use(cors({
    origin: '*',
}))
app.use(express.json())

//only dev
app.use(morgan("tiny"))

//api-docs
app.use("/api/v1", router)

//catch if not route
app.use("*", notFoundErrorHandler)

//catch error
app.use(errorHandler)

const server = http.createServer(app)

export default server;