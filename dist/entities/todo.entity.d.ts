import { User } from './user.entity';
export declare class Todo {
    todoId: number;
    user: User;
    title: string;
    content: string | null;
    startDate: string;
    endDate: string;
    completed: boolean;
    createdAt: Date;
    completedAt: Date | null;
    deletedAt: Date | null;
}
