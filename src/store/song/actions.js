export function addSongs (context, payload) {
    context.commit('addSongs', payload)
}

export function loadBookmarks(context, payload) {
    context.commit('loadBookmarks', payload);
}

export function setMark(context, payload) {
    context.commit('setMark', payload);

}

export function deleteMark(context, payload) {
    context.commit('deleteMark', payload);
  }

export function setNumber(context, payload) {
    context.commit('setNumber', payload);
}

export function setMarked({commit, state}) {
    const { bookmarks } = state;
    const { number } = state
  
    let filtred = bookmarks.map(function (song) {
        return song.songNumber
    }); 

    if(filtred.includes(number + ''))
        {  

            commit('setMarked', true);
        }else{
            commit('setMarked', false);
        }
}
