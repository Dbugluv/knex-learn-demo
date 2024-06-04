import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from '../knex/lib';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findAll() {
    try {
      const users = await this.knex.table('user');
      console.log('....users', users);
      return { users };
    } catch (error) {
      console.log('....error', error);
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const users = await this.knex.table('user').insert({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
      });

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('User ID does not exist');
    }
    const users = await this.knex.table('user').where('id', id);
    return { users };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const users = await this.knex.table('user').where('id', id).update({
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
      });

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new NotFoundException('User ID does not exist');
    }
    const users = await this.knex.table('user').where('id', id).del();
    return { users };
  }
}
