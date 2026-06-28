import express from "express"
import routes from "./routes/index.js"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.js"
import cors, { type CorsOptions } from "cors"

const port = Number(process.env["PORT"]) || 3000
const app = express()

const corsOptions: CorsOptions = {
    origin: [
        "http://localhost:5173"
    ],
    credentials: true,
} 

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(routes)

app.use(errorMiddleware)

app.listen(port, (err) => {
    if(err) {
        console.error(err)
    }
    console.log(`Server listening on ${port}`)
})