import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskTable1708049870638 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "tasks" (
                "taskId" SERIAL PRIMARY KEY,
                "userId" INT NOT NULL,
                "categoryId" INT NOT NULL,
                "title" VARCHAR NOT NULL,
                "description" TEXT,
                "status" VARCHAR NOT NULL,
                "deadline" TIMESTAMP,
                FOREIGN KEY ("userId") REFERENCES "users"("UserId"),
                FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId")
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tasks";`);
  }
}
