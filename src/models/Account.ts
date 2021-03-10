import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { hash } from "bcrypt";
import Transfer from "./Transfer";

@Entity("accounts")
export default class Account {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  secret: string;

  @Column()
  balance: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Transfer, (transfer) => transfer.account_destination_id)
  transfers: Transfer[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.secret = await hash(this.secret, 8);
  }
}

// name
// cpf
// secret
// balance
