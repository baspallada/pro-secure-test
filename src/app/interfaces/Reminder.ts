export interface Reminder {
    reminderId: number;
    title: string;
    dueDate: string;
    createdAt: Date | string;
    timeLeft?: string;
    inBot?: boolean;
    reason?: string;
}