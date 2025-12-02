"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const schedule_entity_1 = require("../entities/schedule.entity");
const user_entity_1 = require("../entities/user.entity");
let SchedulesService = class SchedulesService {
    scheduleRepository;
    userRepository;
    constructor(scheduleRepository, userRepository) {
        this.scheduleRepository = scheduleRepository;
        this.userRepository = userRepository;
    }
    async create(createScheduleDto) {
        const user = await this.userRepository.findOne({
            where: { userId: createScheduleDto.userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
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
    async findOne(scheduleId) {
        const schedule = await this.scheduleRepository.findOne({
            where: { scheduleId },
        });
        if (!schedule) {
            throw new common_1.NotFoundException(`Schedule ${scheduleId} not found`);
        }
        return schedule;
    }
    async update(scheduleId, updateScheduleDto) {
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
    async remove(scheduleId) {
        const schedule = await this.findOne(scheduleId);
        await this.scheduleRepository.remove(schedule);
        return { scheduleId };
    }
};
exports.SchedulesService = SchedulesService;
exports.SchedulesService = SchedulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(schedule_entity_1.Schedule)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SchedulesService);
//# sourceMappingURL=schedules.service.js.map