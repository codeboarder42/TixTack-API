import { Controller, Get, Param } from '@nestjs/common';
import { CommonService } from './common.service';
import { ApplicationRole } from './entities/application-role.entity';
import { UserApplicationRole } from './entities/user-application-role.entity';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('roles')
  async findRolesByApp(): Promise<ApplicationRole[]> {
    return this.commonService.findRoles();
  }

  @Get('roles/:user_id')
  async findUserRoles(
    @Param('user_id') user_id: string,
  ): Promise<UserApplicationRole[]> {
    return this.commonService.findUserRoles(user_id);
  }
}
