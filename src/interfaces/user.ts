import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
export interface IUser {
  id: string;
  username: string;
  password: string;
}

export interface IReqUser extends Request {
  user?: any;
}

export interface IReqUserJwt extends Request {
  user?: string | JwtPayload;
}
