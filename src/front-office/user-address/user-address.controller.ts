import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAddressService } from './user-address.service';


@Controller('user-address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) { }


}
