import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  console.log("hello from express");
  res.status(200);
  res.json({ message: "hello" });
});

export default app;
