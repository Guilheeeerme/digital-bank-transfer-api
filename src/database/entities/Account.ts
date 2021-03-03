import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";
import * as bcrypt from "bcrypt";

@Entity("accounts")
export default class Account {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  cpf: number;

  @Column()
  secret_hash: string;

  @Column()
  balance: number;

  @CreateDateColumn()
  created_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.secret_hash = await bcrypt.hash(this.secret_hash, 10);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.secret_hash);
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
