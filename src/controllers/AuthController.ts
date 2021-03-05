import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { compare } from "bcrypt";
import * as jwt from "jsonwebtoken";

import Account from "../models/Account";
import authConfig from "../config/auth";

class AuthController {
  async authenticate(request: Request, response: Response) {
    const repository = getRepository(Account);
    const { cpf, secret } = request.body;

    const account = await repository.findOne({ where: { cpf } });

    if (!account) {
      return response.sendStatus(401).json({ error: "Conta não encontrada" });
    }

    const isValidSecret = await compare(secret, account.secret);

    if (!isValidSecret) {
      return response.sendStatus(401).json({ error: "Senha inválida" });
    }

    const token = jwt.sign({ id: account.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return response.json({
      id: account.id,
      token,
    });
  }
}

export default new AuthController();
