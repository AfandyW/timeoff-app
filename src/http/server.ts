require('dotenv').config();
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express()
const server = http.createServer(app)

app.use(cors({
    origin: '*',
}))
app.use(bodyParser.json())

app.get("/ping", (req,res) => {
    return res.status(200).json("pong")
})

export default server;