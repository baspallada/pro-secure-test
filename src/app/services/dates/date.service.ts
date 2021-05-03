import * as moment from 'moment';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateService {

    isInBot(dueDate): any {
        const currentHour = moment().format('YYYY-MM-DDTHH:00:00') + '.000';
        const nextHour = moment().add(1, 'hour').format('YYYY-MM-DDTHH:00:00') + '.000';
        const endNextHour = moment().add(2, 'hour').format('YYYY-MM-DDTHH:00:00') + '.000';
        dueDate = moment(dueDate);

        if (dueDate.isBefore(moment())) {
            return { reason: 'This reminder has been sent already.', inBot: true };
        } else if (moment().minute() >= 55 && moment(dueDate).isBetween(nextHour, endNextHour)) {
            return { reason: 'This reminder has loaded into the bot already.', inBot: true };
        } else if (dueDate.isBetween(currentHour, nextHour)) {
            return { reason: 'This reminder has loaded into the bot already.', inBot: true };
        } else {
            return { reason: '', inBot: false };
        }
    }

}
