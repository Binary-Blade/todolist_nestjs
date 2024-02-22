import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1622549061710 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    const table = await queryRunner.getTable("users");
    if (!table) {
      await queryRunner.query(`
                CREATE TABLE "users" (
                    "userId" SERIAL PRIMARY KEY,
                    "email" VARCHAR NOT NULL,
                    "password" VARCHAR NOT NULL,
                    "userRole" VARCHAR NOT NULL
                );
            `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users";`);
  }
}
