import { ApiProperty } from '@nestjs/swagger';
import { UserContactProviderEnum } from 'src/config/enum/user/user-contact-provider.enum';
import { GenderEnum } from 'src/config/enum/user/user-gender.enum';
import { ReligionEnum } from 'src/config/enum/user/user-religion.enum';
import { ResponseMetaSwagger } from 'src/config/response/response-meta.swagger';
import { UserContacts } from 'src/front-office/user-contact/entities/user-contact.entity';
import { Users } from 'src/front-office/user/entities/user.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class UserProfileAddressDtoResponse {
  @ApiProperty({ type: String })
  address: string;

  @ApiProperty({ type: String })
  postal_code: string;

  @ApiProperty({ type: String })
  sub_district: string;

  @ApiProperty({ type: String })
  district: string;

  constructor(data: Users['address']) {
    this.address = data?.address || '';
    this.postal_code = data?.postal_code || '';
    this.sub_district = data?.sub_district || '';
    this.district = data?.district || '';
  }
}

export class UserProfileContactsResponse {
  @ApiProperty({ type: UUID, format: 'uuid' })
  id: string;

  @ApiProperty({ enum: UserContactProviderEnum })
  provider: string;

  @ApiProperty({ type: Boolean })
  is_primary: Boolean;

  @ApiProperty({ type: Boolean })
  is_verified: Boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  constructor(data: UserContacts) {
    this.id = data?.id || '';
    this.provider = data?.provider || '';
    this.is_primary = data?.is_primary || false;
    this.is_verified = data?.is_verified || false;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }
}

export class UserProfileDtoResponse {
  @ApiProperty({ type: String })
  avatar: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ enum: GenderEnum })
  gender: string;

  @ApiProperty({ type: String })
  place_of_birth: string;

  @ApiProperty({ type: Number })
  date_of_birth: Date;

  @ApiProperty({ enum: ReligionEnum })
  religion: string;

  @ApiProperty({ type: JSON })
  properties: JSON;

  @ApiProperty({ type: UserProfileAddressDtoResponse })
  address: Object;

  @ApiProperty({ type: [UserProfileContactsResponse] })
  contacts: UserProfileContactsResponse[];

  constructor(data: Users) {
    this.avatar = data?.avatar || '';
    this.name = data?.profile?.name || '';
    this.gender = data?.profile?.gender || '';
    this.place_of_birth = data?.profile?.place_of_birth || '';
    this.date_of_birth = data?.profile?.date_of_birth;
    this.address = data['address']
      ? new UserProfileAddressDtoResponse(data['address'])
      : {};
    this.contacts = data['contacts']
      ? data['contacts'].map(
        (contact) => new UserProfileContactsResponse(contact),
      )
      : [];
  }
}
export class UserProfileResponseSchema {
  @ApiProperty({ type: ResponseMetaSwagger })
  meta:ResponseMetaSwagger
  @ApiProperty({ type: UserProfileDtoResponse })
  data: UserProfileDtoResponse;
}