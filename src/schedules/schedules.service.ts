import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../entities/schedule.entity';
import { User } from '../entities/user.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const user = await this.userRepository.findOne({
      where: { userId: createScheduleDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const schedule = this.scheduleRepository.create({
      week: createScheduleDto.week,
      startTime: createScheduleDto.startTime,
      endTime: createScheduleDto.endTime,
      title: createScheduleDto.title,
      content: createScheduleDto.content ?? null,
      color: createScheduleDto.color ?? '#3B82F6',
      user,
    });

    return this.scheduleRepository.save(schedule);
  }

  findAll() {
    return this.scheduleRepository.find({
      order: {
        week: 'ASC',
        startTime: 'ASC',
      },
    });
  }

  async findOne(scheduleId: number) {
    const schedule = await this.scheduleRepository.findOne({
      where: { scheduleId },
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule ${scheduleId} not found`);
    }

    return schedule;
  }

  async update(scheduleId: number, updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.findOne(scheduleId);

    if (updateScheduleDto.week !== undefined) {
      schedule.week = updateScheduleDto.week;
    }
    if (updateScheduleDto.startTime !== undefined) {
      schedule.startTime = updateScheduleDto.startTime;
    }
    if (updateScheduleDto.endTime !== undefined) {
      schedule.endTime = updateScheduleDto.endTime;
    }
    if (updateScheduleDto.title !== undefined) {
      schedule.title = updateScheduleDto.title;
    }
    if (updateScheduleDto.content !== undefined) {
      schedule.content = updateScheduleDto.content;
    }
    if (updateScheduleDto.color !== undefined) {
      schedule.color = updateScheduleDto.color;
    }

    return this.scheduleRepository.save(schedule);
  }

  async remove(scheduleId: number) {
    const schedule = await this.findOne(scheduleId);
    await this.scheduleRepository.remove(schedule);
    return { scheduleId };
  }
}

