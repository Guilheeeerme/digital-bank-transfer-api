import { Request, Response } from "express";
import { getRepository } from "typeorm";

import AccountModel from "../models/Account";

export default class Account {
  async show(request: Request, response: Response) {
    const accounts = await getRepository(AccountModel).find();
    try {
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
      const repository = getRepository(AccountModel);
      const account = await repository.save(request.body);
      return response.status(201).json(account);
    } catch (error) {
      return response.status(400).send();
    }
  }
}
