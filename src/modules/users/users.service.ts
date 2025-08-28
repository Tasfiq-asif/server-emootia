import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.databaseService.user.create({
        data: createUserDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'User with this email or username already exists',
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.databaseService.user.findMany({
      include: {
        posts: true,
      },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.databaseService.user.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.databaseService.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.databaseService.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      if (error.code === 'P2002') {
        throw new ConflictException(
          'User with this email or username already exists',
        );
      }
      throw error;
    }
  }

  async remove(id: string): Promise<User> {
    try {
      return await this.databaseService.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }
}
