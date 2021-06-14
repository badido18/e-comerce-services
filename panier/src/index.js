const express = require("express")
const { createConnection, EntitySchema } = require("typeorm")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

createConnection({
    "type": "postgres", 
    "host": "database", 
    "port": 5432, 
    "username": "user", 
    "password": "password", 
    "database": "database",
    "synchronize": true, 
    "logging": false, 
    entities: [
        new EntitySchema(require("./entities/panier.json"))
    ]
})
.then(() => {
    const router = require("./routes")
    app.use("/", router)

    app.listen(8000, () => {
        console.log("server started.")
    })
})
.catch(err => {
    console.log(err.message)
})

