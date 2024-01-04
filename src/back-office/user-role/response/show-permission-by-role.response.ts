import { ApiProperty } from '@nestjs/swagger';
import { ResponseMetaSwagger } from 'src/config/response/response-meta.swagger';
import { Roles } from 'src/database/entities/role.entity';

export class PermissionItemDtoResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  end_point: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  constructor(data: any) {
    this.id = data?.id;
    this.end_point = data?.permission?.end_point;
    this.created_at = data?.created_at;
    this.updated_at = data?.updated_at;
  }
}
export class RolePermissionDtoResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [PermissionItemDtoResponse] })
  permission: PermissionItemDtoResponse[];

  constructor(data: any) {
    this.id = data?.id;
    this.name = data?.name;
    this.permission = data?.user_roles
      ? data?.user_roles.map(
          (user_role) => new PermissionItemDtoResponse(user_role),
        )
      : [];
  }
}
export class RolePermissionDtoResponseSwagger {
  @ApiProperty({ type: ResponseMetaSwagger })
  meta: ResponseMetaSwagger;

  @ApiProperty({ type: RolePermissionDtoResponse })
  data: RolePermissionDtoResponse;
}
