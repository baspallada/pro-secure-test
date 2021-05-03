import { Song } from './Song';
import * as moment from 'moment';

export class Playlist implements Playlist {
    playlistId: number;
    playlistName: string;
    imageLink: string;
    createdAt: Date;
    creatorId: string;
    songs: Song[];
    duration: number;
    durationString: string;

    public static createFromRawObj(obj: object): Playlist {
        if (obj['imageLink']) {
            if (!!!obj['imageLink'].match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi)) {
                obj['imageLink'] = null;
            }
        }

        if (obj['duration'] < 3600000) {
            obj['durationString'] = moment(obj['duration']).format('mm [min] ss [sec]');
        } else {
            obj['durationString'] = moment(obj['duration']).format('hh [hr] mm [min] ss [sec]');
        }

        for (const i in obj['songs']) {
            if (obj['songs'].hasOwnProperty(i)) {
                obj['songs'][i] = Song.createFromRawObj(obj['songs'][i]);
            }
        }
        return Object.assign(new Playlist(), obj);
    }
}
