import { Component, Input, OnInit } from '@angular/core';
import { Feature } from '@clerq/interfaces/Feature';

@Component({
  selector: 'app-info-block',
  templateUrl: './info-block.component.html',
  styleUrls: ['./info-block.component.scss']
})
export class InfoBlockComponent implements OnInit {

  @Input() features: Feature[];
  constructor() { }

  ngOnInit() { }
}
