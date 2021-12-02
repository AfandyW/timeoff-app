require('dotenv').config();
import express from 'express'
import http from 'http'
import cors from 'cors'
import db from '../infra/db/mysql/models'
import morgan from 'morgan'
import router from './routes'

const app = express()
const server = http.createServer(app)

app.use(cors({
    origin: '*',
}))
app.use(express.json())

//only dev
app.use(morgan("tiny"))

//api-docs
app.use("/api/v1", router)

export default server;