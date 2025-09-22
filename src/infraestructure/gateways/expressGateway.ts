import express from "express";
import cors from "cors";
import { PORT } from "../../shared/config/env";
import { CalculateDateExpressController } from "../controllers/express";
import { CalculateDateMiddleware } from "../middlewares/express";
import { ResponseHandler } from "../helpers/express";

const app = express();

app.use(cors());
app.use(express.json());

app.get(
  "/",
  [CalculateDateMiddleware],
  new CalculateDateExpressController().run
);
app.use((req, res) =>
  ResponseHandler.error(res, { message: "Page Not Found" }, 404)
);

app.listen(PORT, () => {
  console.log(`Service Running on Port: ${PORT}`);
});
