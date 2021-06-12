const express = require("express")
const {createConnection} = require("typeorm")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

createConnection()
.then(() => {
    app.listen(8000, () => {
        console.log("server started.")
    })
})
.catch(err => {
    console.log(err.message)
})

