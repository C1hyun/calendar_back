import { Todo } from './todo.entity';
import { Schedule } from './schedule.entity';
export declare class User {
    userId: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    todos: Todo[];
    schedules: Schedule[];
}
