import { User } from './user.entity';
export type Weekday = 'Mon' | 'Tue' | 'Wen' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
export declare class Schedule {
    scheduleId: number;
    user: User;
    week: Weekday;
    startTime: number;
    endTime: number;
    title: string;
    content: string | null;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}
