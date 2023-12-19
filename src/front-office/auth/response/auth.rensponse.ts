import { ApiProperty } from '@nestjs/swagger';
import { UserAccountTypeEnum } from 'src/config/enum/user/user-account-type.enum';
import { string } from 'zod';

export class AuthDtoResponse {
  @ApiProperty({
    type: string,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNjUxNjRiZi01MmI5LTQyN2QtOWRhNi1kN2MxYmNmNTU5YTYiLCJpYXQiOjE3MDI5NTcyODEsImV4cCI6MTcwMjk2MDg4MX0.5HhRhvbWbDfIWcfBeEh74czI6vxfOdrFIIRagExw8Bw',
  })
  token: string;
  @ApiProperty({ enum: UserAccountTypeEnum })
  account_type: string;

  constructor(data) {
    this.token = data?.token || '';
    this.account_type = data?.user?.account_type || '';
  }
}
