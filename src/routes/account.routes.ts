import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import Account from "../models/Account";

const accountRouter = Router();

accountRouter.post("/", async (request: Request, response: Response) => {
  try {
    const repository = getRepository(Account);
    const account = await repository.save(request.body);
    return response.status(201).json(account);
  } catch (error) {
    console.log("err.message ===> ", error.message);
    return response.status(400).send();
  }
});

export default accountRouter;
