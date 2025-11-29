import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
export declare class TodosService {
    private readonly todoRepository;
    private readonly userRepository;
    constructor(todoRepository: Repository<Todo>, userRepository: Repository<User>);
    create(createTodoDto: CreateTodoDto): Promise<Todo>;
    findAll(): Promise<Todo[]>;
    findOne(todoId: number): Promise<Todo>;
    update(todoId: number, updateTodoDto: UpdateTodoDto): Promise<Todo>;
    remove(todoId: number): Promise<{
        todoId: number;
    }>;
}
