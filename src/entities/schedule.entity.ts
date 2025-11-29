import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export type Weekday =
  | 'Mon'
  | 'Tue'
  | 'Wen'
  | 'Thu'
  | 'Fri'
  | 'Sat'
  | 'Sun';

@Entity({ name: 'SCHEDULES' })
export class Schedule {
  @PrimaryGeneratedColumn({ name: 'schedule_id' })
  scheduleId: number;

  @ManyToOne(() => User, (user) => user.schedules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    name: 'week',
    type: 'enum',
    enum: ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'],
  })
  week: Weekday;

  @Column({ name: 'start_time', type: 'int' })
  startTime: number;

  @Column({ name: 'end_time', type: 'int' })
  endTime: number;

  @Column({ name: 'title', length: 100 })
  title: string;

  @Column({ name: 'content', type: 'text', nullable: true })
  content: string | null;

  @Column({ name: 'color', length: 7, default: '#3B82F6' })
  color: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

