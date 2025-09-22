import express from "express";
import cors from "cors";
import { PORT } from "../../shared/config/env";
import { CalculateDateExpressController } from "../controllers/express";
import { CalculateDateHttpDtoMiddleware } from "../httpDto/express";

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', [CalculateDateHttpDtoMiddleware], new CalculateDateExpressController().run)

app.listen(PORT, ()=> {
  console.log(`Service Running on Port: ${PORT}`)
})