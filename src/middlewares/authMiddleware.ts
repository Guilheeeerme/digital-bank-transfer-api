import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import authConfig from "../config/auth";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ error: "Token não encontrado" });
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, authConfig.secret);
    const { id } = data as TokenPayload;

    request.userId = id;

    return next();
  } catch {
    return response.sendStatus(401).json({ error: "Token inválido" });
  }
}
