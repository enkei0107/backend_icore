import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { Roles } from '../entities/role.entity';
import { RolesFactory } from '../factories/role.factory';

export class RoleSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    console.log('\n Running RoleSeeder');
    const role: Roles[] = await new RolesFactory().createMany(1);
    await dataSource.createEntityManager().save(Roles, role);
  }
}
