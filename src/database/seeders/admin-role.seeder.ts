import { Seeder } from "@jorgebodega/typeorm-seeding";
import { AdminRoleEnum } from "src/config/enum/admin/admin-role.enum";
import { DataSource } from "typeorm";
import { RoleAdmins } from "../entities/role-admin.entity";
import { AdminRoleFactory } from "../factories/admin-role.factory";

export class AdminRoleSeeder extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
        console.log('\n Running RoleSeeder');
        const roleEnum = Object.values(AdminRoleEnum);
        const role: RoleAdmins[] = await new AdminRoleFactory().createMany(roleEnum.length);
        await dataSource.createEntityManager().save(RoleAdmins, role);
    }
}