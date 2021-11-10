import {encode, decode} from 'html-entities';

import json from 'src/assets/storage/songs.json';

export const allSongs = json.map(function (item) {
    return {
        songNumber: item.songNumber,
        songWords: decode(item.songWords,{level: 'html5'})
    }
})