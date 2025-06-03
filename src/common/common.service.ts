import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationRole } from './entities/application-role.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UserApplicationRole } from './entities/user-application-role.entity';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(ApplicationRole)
    private applicationRoleRepository: Repository<ApplicationRole>,
    @InjectRepository(UserApplicationRole)
    private userApplicationRoleRepository: Repository<UserApplicationRole>,
    private configService: ConfigService,
  ) {}

  async findRoles(): Promise<ApplicationRole[]> {
    return this.applicationRoleRepository.find({
      where: {
        application: {
          slug: this.configService.get<string>('APPLICATION_SLUG'),
        },
      },
      relations: ['application'],
    });
  }

  async findUserRoles(user_id: string): Promise<UserApplicationRole[]> {
    return this.userApplicationRoleRepository.find({
      where: {
        user: {
          id: user_id,
        },
        applicationRole: {
          application: {
            slug: this.configService.get<string>('APPLICATION_SLUG'),
          },
        },
      },
      relations: ['applicationRole'],
    });
  }
}
