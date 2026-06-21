import express from "express"

const app = express()

app.listen(3000, (err) => {
    if(err) {
        console.error(err)
    }
    console.log("server listening")
})