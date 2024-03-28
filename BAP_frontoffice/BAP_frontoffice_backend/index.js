import express from "express";
import cors from "cors";
import router from './router.js'
import bodyParser from "body-parser";

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(router)

app.listen(4000, () => {
    console.log(`Server is running on port 4000`)
})