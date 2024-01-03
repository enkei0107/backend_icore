import { ApiProperty } from '@nestjs/swagger';
import { UserAccountTypeEnum } from 'src/config/enum/user/user-account-type.enum';
import {
  ResponseDataSwagger,
  ResponseMetaSwagger,
} from 'src/config/response/response-meta.swagger';
import { string } from 'zod';

export class AuthDtoResponse {
  @ApiProperty({
    type: string,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNjUxNjRiZi01MmI5LTQyN2QtOWRhNi1kN2MxYmNmNTU5YTYiLCJpYXQiOjE3MDI5NTcyODEsImV4cCI6MTcwMjk2MDg4MX0.5HhRhvbWbDfIWcfBeEh74czI6vxfOdrFIIRagExw8Bw',
  })
  token: string;
  @ApiProperty({ enum: [Object.values(UserAccountTypeEnum)] })
  role: Array<string>;

  constructor(data) {
    this.token = data?.token || '';
    this.role = (data?.user?.role || []).map((item: any) => item.role?.name);
  }
}
export class AuthResponseSchema {
  @ApiProperty({ type: ResponseMetaSwagger })
  meta: ResponseMetaSwagger;
  @ApiProperty({ type: AuthDtoResponse })
  data: AuthDtoResponse;
}
