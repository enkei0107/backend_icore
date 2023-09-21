import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRelationUserAndProfileTable1695313011223 implements MigrationInterface {
    name = 'ChangeRelationUserAndProfileTable1695313011223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD CONSTRAINT "UQ_8481388d6325e752cd4d7e26c6d" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD CONSTRAINT "FK_8481388d6325e752cd4d7e26c6d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP CONSTRAINT "FK_8481388d6325e752cd4d7e26c6d"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP CONSTRAINT "UQ_8481388d6325e752cd4d7e26c6d"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profileId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE RESTRICT`);
    }

}
