import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeEmailUniqueToUserContactsTable1695443146746 implements MigrationInterface {
    name = 'ChangeEmailUniqueToUserContactsTable1695443146746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_contacts" ADD "is_primary" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user_contacts" ADD CONSTRAINT "UQ_bcb315d90de44a91f8cb2cfda04" UNIQUE ("address")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_contacts" DROP CONSTRAINT "UQ_bcb315d90de44a91f8cb2cfda04"`);
        await queryRunner.query(`ALTER TABLE "user_contacts" DROP COLUMN "is_primary"`);
    }

}
