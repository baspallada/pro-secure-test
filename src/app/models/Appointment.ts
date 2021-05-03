export class Appointment implements Appointment {
  appointmentId: number;
  createdAt: string;
  dateEnd: string;
  dateStart: string;
  location: string;
  title: string;
  attendees: string[];
  note: string;
  creatorId: number;

  public static createFromRawObj(obj: object): Appointment {
    return Object.assign(new Appointment(), obj);
  }
}
