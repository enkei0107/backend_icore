import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveAccountType1704255536676 implements MigrationInterface {
    name = 'RemoveAccountType1704255536676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "account_type"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "account_type" character varying(50) NOT NULL`);
    }

}
