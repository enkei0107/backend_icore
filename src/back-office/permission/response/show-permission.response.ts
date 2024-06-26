import { ApiProperty } from '@nestjs/swagger';
import { ResponseMetaSwagger } from 'src/config/response/response-meta.swagger';
import { Permissions } from 'src/database/entities/permission.entity';

export class ShowPermissionItem {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: 'DELETE /api/user-contact/:id' })
  end_point: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
  constructor(data: Permissions) {
    this.id = data.id;
    this.end_point = data.end_point;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}

export class ShowPermissionItemSwagger {
  @ApiProperty({ type: ResponseMetaSwagger })
  meta: ResponseMetaSwagger;

  @ApiProperty({ type: [ShowPermissionItem] })
  data: [ShowPermissionItem];
}
