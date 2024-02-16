import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTable1622549061730 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    const table = await queryRunner.getTable('tasks');
    if (!table) {
      await queryRunner.query(`
            CREATE TABLE "tasks" (
                "taskId" SERIAL PRIMARY KEY,
                "userId" INT NOT NULL,
                "categoryId" INT NOT NULL,
                "title" VARCHAR NOT NULL,
                "description" TEXT,
                "status" VARCHAR NOT NULL,
                "deadline" TIMESTAMP,
                FOREIGN KEY ("userId") REFERENCES "users"("userId"),
                FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId")
            );
        `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tasks";`);
  }
}
