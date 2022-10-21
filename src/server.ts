import express, { Request, Response, NextFunction } from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signIn } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "hello" });
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signIn);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized!" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Invalid input!" });
  } else {
    res.status(500).json({ message: `Oops that's on us!` });
  }
});

export default app;
