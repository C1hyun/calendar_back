import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const user = await this.userRepository.findOne({
      where: { userId: createTodoDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
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

  async findOne(todoId: number) {
    const todo = await this.todoRepository.findOne({
      where: { todoId },
    });

    if (!todo) {
      throw new NotFoundException(`Todo ${todoId} not found`);
    }

    return todo;
  }

  async update(todoId: number, updateTodoDto: UpdateTodoDto) {
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

  async remove(todoId: number) {
    const todo = await this.findOne(todoId);
    await this.todoRepository.remove(todo);
    return { todoId };
  }
}

