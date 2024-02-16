import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryTable1708049822093 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "categories" (
                "categoryId" SERIAL PRIMARY KEY,
                "userId" INT NOT NULL,
                "name" VARCHAR NOT NULL,
                "description" TEXT,
                FOREIGN KEY ("userId") REFERENCES "users"("userId")
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categories";`);
  }
}
