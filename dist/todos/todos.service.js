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
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("../entities/todo.entity");
const user_entity_1 = require("../entities/user.entity");
let TodosService = class TodosService {
    todoRepository;
    userRepository;
    constructor(todoRepository, userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }
    async create(createTodoDto) {
        const user = await this.userRepository.findOne({
            where: { userId: createTodoDto.userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const todo = this.todoRepository.create({
            title: createTodoDto.title,
            content: createTodoDto.content ?? null,
            startDate: createTodoDto.startDate,
            endDate: createTodoDto.endDate,
            completed: false,
            user,
        });
        return this.todoRepository.save(todo);
    }
    findAll() {
        return this.todoRepository.find({
            order: {
                startDate: 'ASC',
            },
        });
    }
    async findOne(todoId) {
        const todo = await this.todoRepository.findOne({
            where: { todoId },
        });
        if (!todo) {
            throw new common_1.NotFoundException(`Todo ${todoId} not found`);
        }
        return todo;
    }
    async update(todoId, updateTodoDto) {
        const todo = await this.findOne(todoId);
        if (updateTodoDto.title !== undefined) {
            todo.title = updateTodoDto.title;
        }
        if (updateTodoDto.content !== undefined) {
            todo.content = updateTodoDto.content;
        }
        if (updateTodoDto.startDate !== undefined) {
            todo.startDate = updateTodoDto.startDate;
        }
        if (updateTodoDto.endDate !== undefined) {
            todo.endDate = updateTodoDto.endDate;
        }
        if (updateTodoDto.completed !== undefined) {
            todo.completed = updateTodoDto.completed;
            todo.completedAt = updateTodoDto.completed ? new Date() : null;
        }
        return this.todoRepository.save(todo);
    }
    async remove(todoId) {
        const todo = await this.findOne(todoId);
        await this.todoRepository.remove(todo);
        return { todoId };
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.Todo)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TodosService);
//# sourceMappingURL=todos.service.js.map