import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import Account from "./Account";

@Entity("transfers")
export default class Transfer {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  account_id: string;

  @OneToOne(() => Transfer)
  @JoinColumn({ name: "account_destination_id" })
  account_destination_id: Account;

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
