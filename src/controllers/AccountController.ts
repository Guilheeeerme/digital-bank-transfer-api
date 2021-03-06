import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as yup from "yup";

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
    const { name, cpf, balance } = request.body;

    const schema = yup
      .object()
      .shape({
        name: yup.string().required(),
        cpf: yup.string().length(11).required(),
        secret: yup.string().required(),
        balance: yup.number().required().default(0),
      })
      .noUnknown();

    try {
      if (!(await schema.isValid(request.body))) {
        return response.status(400).json({ error: "Validation failed" });
      }

      const repository = getRepository(AccountModel);
      const userAlreadyExists = await repository.findOne({ cpf });

      if (userAlreadyExists) {
        return response.status(400).json({ error: "User already exists" });
      }

      const account = repository.create(request.body);
      await repository.save(account);

      return response.status(201).json({ name, cpf, balance });
    } catch (error) {
      console.log(error);
      return response.status(400).send();
    }
  }
}

export default new Account();
