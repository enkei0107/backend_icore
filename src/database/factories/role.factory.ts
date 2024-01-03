import {
  Constructable,
  FactorizedAttrs,
  Factory,
} from '@jorgebodega/typeorm-factory';
import { Roles } from '../entities/role.entity';
import dataSource from '../data-source';

export class RolesFactory extends Factory<Roles> {
  protected entity = Roles;
  protected dataSource = dataSource;
  protected attrs(): FactorizedAttrs<Roles> {
    return {
      name: 'admin',
    };
  }
}
