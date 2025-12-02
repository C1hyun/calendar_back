import { Repository } from 'typeorm';
import { Schedule } from '../entities/schedule.entity';
import { User } from '../entities/user.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
export declare class SchedulesService {
    private readonly scheduleRepository;
    private readonly userRepository;
    constructor(scheduleRepository: Repository<Schedule>, userRepository: Repository<User>);
    create(createScheduleDto: CreateScheduleDto): Promise<Schedule>;
    findAll(): Promise<Schedule[]>;
    findOne(scheduleId: number): Promise<Schedule>;
    update(scheduleId: number, updateScheduleDto: UpdateScheduleDto): Promise<Schedule>;
    remove(scheduleId: number): Promise<{
        scheduleId: number;
    }>;
}
