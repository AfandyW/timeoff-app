import server from './http/server'

const { API_PORT:PORT, API_HOST:HOST} = process.env

server.listen(Number(PORT),HOST)
server.on('listening', () => {
    console.log("server on", server.address())
})