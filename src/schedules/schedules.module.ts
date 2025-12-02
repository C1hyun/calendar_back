import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import { Schedule } from '../entities/schedule.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, User])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
})
export class SchedulesModule {}

