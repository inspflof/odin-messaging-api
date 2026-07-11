import express from "express"
import routes from "./routes/index.js"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.js"
import cors, { type CorsOptions } from "cors"
import { createServer } from "http"
import { Server } from "socket.io"
import { chatHandlers } from "./sockets/chat.handler.js"

const port = Number(process.env["PORT"]) || 3000
const app = express()
const httpServer = createServer(app)

const corsOptions: CorsOptions = {
    origin: [
        "http://localhost:5173"
    ],
    credentials: true,
    methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE"
    ]
} 

export const io = new Server(httpServer, {
    cors: corsOptions
})

io.on("connection", (socket) => {
    console.log(`Utilisateur connecté : ${socket.id}`)

    chatHandlers(io, socket)

    socket.on("disconnect", () => {
        console.log("Utilisateur déconnecté")
    })
})

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(routes)

app.use(errorMiddleware)

httpServer.listen(port, () => {
    console.log(`Server listening on ${port}`)
})