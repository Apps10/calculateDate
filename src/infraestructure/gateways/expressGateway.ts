import express from "express";
import cors from "cors";
import { CalculateDateExpressController } from "../controllers/express";
import { CalculateDateMiddleware } from "../middlewares/express";
import { ResourceNotFoundException } from "@/domain/exceptions/exceptions";
import { CustomExceptionHandler } from "../exceptions/customExceptionHandler";
import { PORT } from "../../../shared/config/env";

const app = express();

app.use(cors());
app.use(express.json());

app.get(
  "/",
  [CalculateDateMiddleware],
  new CalculateDateExpressController().run
);
app.use(() => {
  throw new ResourceNotFoundException('Page Not Found')
});

app.use(CustomExceptionHandler.catch)

app.listen(PORT, () => {
  console.log(`Service Running on Port: ${PORT}`);
});
