import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("transfers")
export default class Transfer {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  account_id: string;

  @Column()
  account_destination_id: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;
}
