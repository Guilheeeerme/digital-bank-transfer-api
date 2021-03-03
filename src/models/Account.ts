import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

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
}
