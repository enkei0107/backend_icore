import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { Roles } from '../entities/role.entity';
import { RolesFactory } from '../factories/role.factory';
import { UserAccountTypeEnum } from 'src/config/enum/user/user-account-type.enum';

export class RoleSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    console.log('\n Running RoleSeeder');
    const roleEnum = Object.values(UserAccountTypeEnum);
    const role: Roles[] = await new RolesFactory().createMany(roleEnum.length);
    await dataSource.createEntityManager().save(Roles, role);
  }
}
