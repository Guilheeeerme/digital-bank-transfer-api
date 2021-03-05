import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

import { hash } from "bcrypt";

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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.secret = await hash(this.secret, 8);
  }
}
