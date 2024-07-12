import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateTables1720807946409 implements MigrationInterface {
    name = 'GenerateTables1720807946409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255), "username" character varying(50) NOT NULL, "email" character varying(320) NOT NULL, "password" character varying(255) NOT NULL, "role" integer NOT NULL DEFAULT '2', CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
