import { Request, Response } from "express";
import { getRepository } from "typeorm";

import TransferModel from "../models/Transfer";
import AccountModel from "../models/Account";

class Transfer {
  async show(request: Request, response: Response) {
    const repository = getRepository(TransferModel);

    try {
      const transfers = await repository.find({
        where: { account_id: request.userId },
      });

      return response.status(200).json(transfers);
    } catch (error) {
      return response.status(400).send();
    }
  }

  async create(request: Request, response: Response) {
    const accountRepository = getRepository(AccountModel);
    const transferRepository = getRepository(TransferModel);

    const { account_destination_id, amount } = request.body;

    try {
      const origem = await accountRepository.findOne(request.userId);
      const destino = await accountRepository.findOne(account_destination_id);

      if (origem.balance <= 0 || amount > origem.balance) {
        return response.status(400).json({ error: "Saldo insuficiente" });
      }

      await accountRepository.update(
        { id: request.userId },
        { balance: (origem.balance -= amount) }
      );
      await accountRepository.update(
        { id: account_destination_id },
        { balance: (destino.balance += amount) }
      );

      const transfer = transferRepository.create({
        account_id: request.userId,
        account_destination_id,
        amount,
      });

      await transferRepository.save(transfer);

      return response.status(201).json("Transferência realizada");
    } catch (error) {
      return response.status(400).send();
    }
  }
}

export default new Transfer();
