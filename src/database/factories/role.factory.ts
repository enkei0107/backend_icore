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
  protected attrs(): FactorizedAttrs<Roles> {
    return {
      name: faker.helpers.enumValue(UserAccountTypeEnum),
    };
  }
}
