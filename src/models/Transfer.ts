import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Account from "./Account";

@Entity("transfers")
export default class Transfer {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  account_id: string;

  @ManyToOne((type) => Account, (account) => account.transfers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "account_destination_id" })
  account_destination_id: Account;

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;
}
