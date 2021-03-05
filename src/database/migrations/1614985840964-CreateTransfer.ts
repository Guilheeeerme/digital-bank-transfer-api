import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransfer1614985840964 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transfers",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "account_id",
            type: "varchar",
          },
          {
            name: "account_destination_id",
            type: "uuid",
          },
          {
            name: "amount",
            type: "serial",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FK_Account",
            referencedTableName: "accounts",
            referencedColumnNames: ["id"],
            columnNames: ["account_destination_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transfers");
  }
}
