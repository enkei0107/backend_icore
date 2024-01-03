import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';
import { Users } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<Users>> {
    return paginate(query, this.userRepository, {
      defaultLimit: 10,
      sortableColumns: ['created_at'],
      defaultSortBy: [['created_at', 'DESC']],
      searchableColumns:['username'],
      filterableColumns: {
        username: true,
      },
    });
  }
}
