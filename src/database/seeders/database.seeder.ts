import { Seeder } from '@jorgebodega/typeorm-seeding';
import { RoleSeeder } from './roles.seeder';
import { DataSource } from 'typeorm';
export default class InitialDatabaseSeed extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await new RoleSeeder().run(dataSource);
  }
}
