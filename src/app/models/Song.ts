import * as moment from 'moment'

export class Song implements Song {
    songId?: number;
    songName: string;
    songYoutubeId: string;
    thumbnailUrl: string;
    originalUrl: string;
    playlistPlaylistId?: number;
    artist: string;
    duration: string;
    addedOn?: Date;
    addedOnFormatted?: string;
    sinceAdded?: string;

    public static createFromRawObj(obj: object): Song {
        const milliseconds = moment.duration(obj['duration']).asMilliseconds();
        // If the song is longer than an hour, format as hh:mm:ss, since moment adds an hour if the time is less than an hour
        if (milliseconds > 3600000) {
            obj['duration'] = moment(milliseconds).format('hh:mm:ss');
        } else {
            obj['duration'] = moment(milliseconds).format('mm:ss');
        }
        
        if(obj['addedOn'])
        {
            let addedMoment = moment(obj['addedOn']).utc(true);
            obj['sinceAdded'] = addedMoment.fromNow();
            obj['addedOnFormatted'] = addedMoment.local().format("L LT");
        }
        
        return Object.assign(new Song(), obj);
    }
}
