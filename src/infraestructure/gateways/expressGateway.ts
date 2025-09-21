import express from "express";
import cors from "cors";
import { PORT } from "../../shared/config/env";
import { DateExpressController } from "../controllers/express/date.express.controller";

const app = express()

app.use(cors())
app.use(express.json())

app.get('/date', [], DateExpressController)

app.listen(PORT, ()=> {
  console.log(`Service Running on Port: ${PORT}`)
})