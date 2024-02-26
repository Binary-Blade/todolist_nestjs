import { Logger } from "@nestjs/common";
import datasource from '../config/typeorm-cli.config';

export async function runMigrations() {
  const logger = new Logger('migrationRunner');

  try {
    logger.log('Running migration...');
    await datasource.initialize();
    await datasource.runMigrations();
  } catch (err) {
    logger.error('Cannot start the app. Migration have failed!', err);
    process.exit(0);
  }
}
