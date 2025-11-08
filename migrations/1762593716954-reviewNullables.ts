import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewNullables1762593716954 implements MigrationInterface {
    name = 'ReviewNullables1762593716954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "UQ_019d74f7abcdcb5a0113010cb03"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "UQ_019d74f7abcdcb5a0113010cb03" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "description" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "description" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "title" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "resolved_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(320) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD CONSTRAINT "UQ_8e401deebbc662fa20f1599c2be" UNIQUE ("name", "service_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects" DROP CONSTRAINT "UQ_8e401deebbc662fa20f1599c2be"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "resolved_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "UQ_019d74f7abcdcb5a0113010cb03"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "UQ_019d74f7abcdcb5a0113010cb03" UNIQUE ("name")`);
    }

}
