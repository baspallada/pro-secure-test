import { Component, OnInit, Input } from '@angular/core';
import { Command } from '@clerq/interfaces/Command';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {
  @Input() command: Command;

  PREFIX = ';';
  id;

  constructor() { }

  ngOnInit() {
    this.id = this.command.name.replace(/[ \[\]\,\?]*/g, '');
  }
}
