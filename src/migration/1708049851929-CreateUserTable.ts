import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1708049851929 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "userId" SERIAL PRIMARY KEY,
                "username" VARCHAR NOT NULL,
                "email" VARCHAR NOT NULL,
                "password" VARCHAR NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users";`);
  }
}
