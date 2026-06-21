import express from "express"

import { errorMiddleware } from "./middlewares/error.js"

const app = express()

app.use(errorMiddleware)

app.listen(3000, (err) => {
    if(err) {
        console.error(err)
    }
    console.log("server listening")
})