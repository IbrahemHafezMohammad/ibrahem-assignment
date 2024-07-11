import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1720688256967 implements MigrationInterface {
    name = ' $npmConfigName1720688256967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" integer NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ninjas" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "weapon" character varying NOT NULL, CONSTRAINT "PK_a8eca4e9d8779cfa88b43d1a745" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ninjas"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
