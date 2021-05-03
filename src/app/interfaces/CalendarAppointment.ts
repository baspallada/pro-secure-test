import { CalendarEvent } from 'angular-calendar';

export interface CalendarAppointment extends CalendarEvent {
    appointmentId: number;
    location: string;
    createdAt: string;
    dateStart: string;
    dateEnd: string;
    attendees?: string[];
    note?: string;
    creatorId: number;
}