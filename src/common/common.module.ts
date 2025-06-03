import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { ApplicationRole } from './entities/application-role.entity';
import { UserApplicationRole } from './entities/user-application-role.entity';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Application,
      ApplicationRole,
      UserApplicationRole,
      User,
    ]),
  ],
  providers: [CommonService],
  controllers: [CommonController],
})
export class CommonModule {}
