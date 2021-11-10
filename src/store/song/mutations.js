export function addSongs (state, payload) {
    if(state.songs.length === 0){
        state.songs = payload;
    }
}

export function loadBookmarks(state, payload) {
    if(state.bookmarks.length === 0){
        state.bookmarks = payload;
    }
}

export function setMark(state, payload) {
    state.bookmarks.push(payload);
}

export function deleteMark(state, payload) {

    const { bookmarks } = state;
    // let current = bookmarks.filter(function(mark){
    //     return mark.songNumber == payload;
    // })
    // current = JSON.parse(JSON.stringify(current[0]))
    // let index = bookmarks.indexOf(current)
    
    bookmarks.forEach(function(mark){
        if(mark.songNumber == payload){
            let i = bookmarks.indexOf(mark);
            return bookmarks.splice(i, 1);
        }
    })

    console.log(bookmarks);
    state.bookmarks = bookmarks
    state.marked = false;
  }

export function setNumber(state, payload) {
    state.number = payload;
}

export function setMarked(state, payload) {
    state.marked = payload
}
