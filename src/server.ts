import express, { Request, Response, NextFunction } from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  console.log("hello from express");
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", protect, router);

export default app;
