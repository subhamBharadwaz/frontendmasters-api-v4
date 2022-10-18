import { Request, Response } from "express";
import prisma from "../db";
import { comparePasswords, createJwt, hashPassword } from "../modules/auth";

export const createNewUser = async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJwt(user);
  res.json({ token });
};

export const signIn = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  const isValid = await comparePasswords(req.body.password, user!.password);
  if (!isValid) {
    res.status(401).json({ message: "nope" });
    return;
  }
  const token = createJwt(user!);
  res.json({ token });
};
