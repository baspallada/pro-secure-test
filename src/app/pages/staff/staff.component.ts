import { Component, OnInit } from '@angular/core';
import { GeneralProvider } from '@clerq/providers/general.provider';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  providers: [GeneralProvider]
})
export class StaffComponent implements OnInit {
  staff;

  constructor(private readonly generalProvider: GeneralProvider) { }

  ngOnInit() {
    this.generalProvider.getStaffFromJSON().subscribe(data => {
      this.staff = data['staff'];
      this.staff.sort(() => Math.random() - 0.5);
    });
  }
}
