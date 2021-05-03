import { Component, OnInit, Input } from '@angular/core';
import { Staff } from '@clerq/interfaces/Staff';

@Component({
  selector: 'app-staff-card',
  templateUrl: './staff-card.component.html',
  styleUrls: ['./staff-card.component.scss']
})
export class StaffCardComponent implements OnInit {

  @Input() staffMember: Staff;

  public description: string;
  constructor() { }

  ngOnInit() {
    if (this.staffMember?.description) {
      this.description = this.staffMember.description[Math.floor(Math.random() * this.staffMember.description.length)]
    }
  }
}
