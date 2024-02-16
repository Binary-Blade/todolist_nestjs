import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoriesTable1622549061720 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    const table = await queryRunner.getTable('categories');

    if (!table) {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categories";`);
  }
}
