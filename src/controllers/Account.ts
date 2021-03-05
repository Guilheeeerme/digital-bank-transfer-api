import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { hash } from "bcrypt";

import AccountModel from "../models/Account";

export default class Account {
  async show(request: Request, response: Response) {
    try {
      const repository = getRepository(AccountModel);
      const accounts = await repository.find({
        select: ["id", "name", "cpf", "balance", "created_at"],
      });

      return response.status(200).json(accounts);
    } catch (error) {
      return response.status(400).send();
    }
  }

  async balance(request: Request, response: Response) {
    const id = request.params.id;

    try {
      const { balance } = await getRepository(AccountModel).findOne(id);
      return response.status(200).json({
        id,
        balance,
      });
    } catch (error) {
      return response.status(400).send();
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { name, cpf, secret, balance } = request.body;
      const hashedSecret = await hash(secret, 8);

      const repository = getRepository(AccountModel);

      const account = repository.create({
        name,
        cpf,
        secret: hashedSecret,
        balance,
      });

      await repository.save({ name, cpf, balance });

      return response.status(201).json(account);
    } catch (error) {
      return response.status(400).send();
    }
  }
}
