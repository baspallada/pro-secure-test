export class Reminder {
  reminderId: string;
  title: string;
  dueDate: Date;
  creatorId: string;
  createdAt: Date;

  public static createFromRawObj(obj: object) {
    return Object.assign(new Reminder(), obj);
  }
}
