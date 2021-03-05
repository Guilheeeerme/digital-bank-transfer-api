import { Request, Response } from "express";
import { getRepository } from "typeorm";

import AccountModel from "../models/Account";

class Account {
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

      const repository = getRepository(AccountModel);

      const account = repository.create({
        name,
        cpf,
        secret,
        balance,
      });

      await repository.save(account);

      return response.status(201).json({ name, cpf, balance });
    } catch (error) {
      return response.status(400).send();
    }
  }
}

export default new Account();
