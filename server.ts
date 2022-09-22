import express, { Application } from "express"
import { dataSource } from "./src/config/ormconfig"
import router from "./src/routes/routes"

const app: Application = express()

dataSource
.initialize()
.then(() => console.log("Connected"))
.catch((err) => console.log(err))

app.use(express.json())
app.use(router)

app.listen(8080, ()=>{
    console.log(8080)
})