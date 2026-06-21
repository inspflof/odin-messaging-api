import express from "express"
import routes from "./routes/index.js"
import { errorMiddleware } from "./middlewares/error.js"

const app = express()

app.use(routes)

app.use(errorMiddleware)

app.listen(3000, (err) => {
    if(err) {
        console.error(err)
    }
    console.log("server listening")
})