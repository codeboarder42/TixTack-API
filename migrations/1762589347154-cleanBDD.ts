import { MigrationInterface, QueryRunner } from "typeorm";

export class CleanBDD1762589347154 implements MigrationInterface {
    name = 'CleanBDD1762589347154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subjects" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_8798a589dc4c71b6d0e8c2b9fc3"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_47c3fba35bfcbb08e3445f57d6e"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_bdeeeb06bbdce2504a969f8540b"`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "assigned_to" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "subject_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "resolved_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_8798a589dc4c71b6d0e8c2b9fc3" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_47c3fba35bfcbb08e3445f57d6e" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_bdeeeb06bbdce2504a969f8540b" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_bdeeeb06bbdce2504a969f8540b"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_47c3fba35bfcbb08e3445f57d6e"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_8798a589dc4c71b6d0e8c2b9fc3"`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "resolved_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "subject_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "assigned_to" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_bdeeeb06bbdce2504a969f8540b" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_47c3fba35bfcbb08e3445f57d6e" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_8798a589dc4c71b6d0e8c2b9fc3" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subjects" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "description" DROP NOT NULL`);
    }

}
