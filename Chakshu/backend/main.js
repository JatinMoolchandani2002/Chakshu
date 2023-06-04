const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const path = require('path')
const {connectDB} = require('./utils/database')
const http = require('http')
const socketIO = require('socket.io')
const { fileParser }  = require('express-multipart-file-parser')
dotenv.config()

const app = express()
const PORT = 4000

const server = http.createServer(app);
const io = socketIO(server)

io.on('connection', (socket)=>{
    console.log(`${socket.id} just connected to server.`)
    socket.on('disconnect', ()=>{
        console.log(`${socket.id} just disconnected from server.`)
    })
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileParser({rawBodyOptions: {limit: '50mb'}}))
app.use('/getStatic', express.static(path.join(process.env.ROOTPATH, '')))

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/crime', require('./routes/crimeRoutes'))

app.all('*', (req, res)=>{
    const error = new Error(
        `Resource ${req.originalUrl} not found`
    )
    error.statusCode = 404
    throw error
})

app.use((error, req, res, next) => {
    let status = error.statusCode || 500
    let message = error.message || 'Server Error. Something went wrong.'
    res.status(status).json({ message: message});
});

connectDB()

server.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
})