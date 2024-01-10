import {
  Constructable,
  FactorizedAttrs,
  Factory,
} from '@jorgebodega/typeorm-factory';
import { Roles } from '../entities/role.entity';
import dataSource from '../data-source';
import { faker } from '@faker-js/faker';
import { UserAccountTypeEnum } from 'src/config/enum/user/user-account-type.enum';
export class RolesFactory extends Factory<Roles> {
  protected entity = Roles;
  protected dataSource = dataSource;
  private roleUnique(): string {
    const data = faker.helpers.enumValue(UserAccountTypeEnum);
    if (!this.currentRole.includes(data)) {
      this.currentRole.push(data);
      return data;
    }
    return this.roleUnique();
  }
  protected currentRole = [];

  protected attrs(): FactorizedAttrs<Roles> {
    return {
      name: this.roleUnique(),
    };
  }
}
