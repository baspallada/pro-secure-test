import { Component, Input, OnInit } from '@angular/core';
import { Appointment } from '@clerq/models/Appointment';
import { Reminder } from '@clerq/models/Reminder';
import { TimeUtilsProvider } from '@clerq/providers/timeUtils.provider';

@Component({
  selector: 'app-next-card',
  templateUrl: './next-card.component.html',
  providers: [TimeUtilsProvider],
  styleUrls: ['./next-card.component.scss']
})
export class NextCardComponent implements OnInit {
  @Input() nextAppointment?: Appointment;
  @Input() nextReminder?: Reminder;

  constructor(private timeUtils: TimeUtilsProvider) { }

  ngOnInit() { }

  convertTimeToFromNow(date: string | Date): string {
    return this.timeUtils.convertToFromNow(date);
  }
}
