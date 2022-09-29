import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { IReqUser, IUser } from "../interfaces/user";

export const createJwt = (user: IUser) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!
  );
  return token;
};

export const protect = (req: IReqUser, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Not Authorized!" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "Not a valid token!" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = user;
    next();
  } catch (err: unknown) {
    console.log(err);
    res.status(401);
    res.json({ message: "Not a valid token!" });
    return;
  }
};
