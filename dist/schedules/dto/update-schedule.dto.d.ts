export declare class UpdateScheduleDto {
    week?: 'Mon' | 'Tue' | 'Wen' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
    startTime?: number;
    endTime?: number;
    title?: string;
    content?: string | null;
    color?: string;
}
