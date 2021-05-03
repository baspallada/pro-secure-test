import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class TimeUtilsProvider {

  convertToFromNow(date: string | Date): string {
    return moment(date).fromNow();
  }
}
