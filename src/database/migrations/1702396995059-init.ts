import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1702396995059 implements MigrationInterface {
    name = 'Init1702396995059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" character varying(50) NOT NULL, "address" character varying(100) NOT NULL, "is_primary" boolean NOT NULL DEFAULT true, "is_verified" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_bcb315d90de44a91f8cb2cfda04" UNIQUE ("address"), CONSTRAINT "PK_c7048d25b5fda1fa70501fac9ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "gender" character varying NOT NULL, "place_of_birth" character varying(50) NOT NULL, "date_of_birth" TIMESTAMP NOT NULL, "religion" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "REL_8481388d6325e752cd4d7e26c6" UNIQUE ("userId"), CONSTRAINT "PK_1ec6662219f4605723f1e41b6cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "password" character varying NOT NULL, "login_at" TIMESTAMP NOT NULL, "remember_token" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "postal_code" character varying(20) NOT NULL, "sub_district" character varying NOT NULL, "district" character varying NOT NULL, "country" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_29d6df815a78e4c8291d3cf5e5" UNIQUE ("user_id"), CONSTRAINT "PK_302d96673413455481d5ff4022a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_contacts" ADD CONSTRAINT "FK_30fcfbc780a02d200e0589b2886" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profiles" ADD CONSTRAINT "FK_8481388d6325e752cd4d7e26c6d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_address" ADD CONSTRAINT "FK_29d6df815a78e4c8291d3cf5e53" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_address" DROP CONSTRAINT "FK_29d6df815a78e4c8291d3cf5e53"`);
        await queryRunner.query(`ALTER TABLE "user_profiles" DROP CONSTRAINT "FK_8481388d6325e752cd4d7e26c6d"`);
        await queryRunner.query(`ALTER TABLE "user_contacts" DROP CONSTRAINT "FK_30fcfbc780a02d200e0589b2886"`);
        await queryRunner.query(`DROP TABLE "user_address"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_profiles"`);
        await queryRunner.query(`DROP TABLE "user_contacts"`);
    }

}
