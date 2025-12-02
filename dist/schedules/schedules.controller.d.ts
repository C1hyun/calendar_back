import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
export declare class SchedulesController {
    private readonly schedulesService;
    constructor(schedulesService: SchedulesService);
    findAll(): Promise<import("../entities/schedule.entity").Schedule[]>;
    create(createScheduleDto: CreateScheduleDto): Promise<import("../entities/schedule.entity").Schedule>;
    update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<import("../entities/schedule.entity").Schedule>;
    remove(id: string): Promise<{
        scheduleId: number;
    }>;
}
