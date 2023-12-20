import { ApiProperty } from '@nestjs/swagger';
import { url } from 'inspector';
import { GenderEnum } from 'src/config/enum/user/user-gender.enum';
import { ReligionEnum } from 'src/config/enum/user/user-religion.enum';
import { UserContacts } from 'src/front-office/user-contact/entities/user-contact.entity';
import { Users } from 'src/front-office/user/entities/user.entity';
import { number, string } from 'zod';

export class UserProfileAddressDtoResponse {
  @ApiProperty({ type: string })
  address: string;

  @ApiProperty({ type: string })
  postal_code: string;

  @ApiProperty({ type: string })
  sub_district: string;

  @ApiProperty({ type: string })
  district: string;

  constructor(data: Users['address']) {
    this.address = data?.address || '';
    this.postal_code = data?.postal_code || '';
    this.sub_district = data?.sub_district || '';
    this.district = data?.district || '';
  }
}

export class UserProfileContactsResponse {
  
  id: string;
  provider: string;
  is_primary: Boolean;
  is_verified: Boolean;
  created_at: Date;
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
  @ApiProperty({ type: url })
  avatar: string;

  @ApiProperty({ type: string })
  name: string;

  @ApiProperty({ enum: GenderEnum, type: string })
  gender: string;

  @ApiProperty({ type: string })
  place_of_birth: string;

  @ApiProperty({ type: number })
  date_of_birth: Date;

  @ApiProperty({ enum: ReligionEnum })
  religion: string;

  @ApiProperty({ type: JSON })
  properties: JSON;

  @ApiProperty({ type: UserProfileAddressDtoResponse })
  address: Object;

  @ApiProperty({ type: UserProfileContactsResponse })
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
