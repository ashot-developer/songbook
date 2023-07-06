export function getSongs (state) {
    return state.songs;
}

export function getSearchedSongs(state) {
    return state.searchedSongs
}

export function getKeyword(state) {
    return state.keywordS
}

export function getBookmarks(state) {
    return state.bookmarks;
}

export function isMarked(state) {
    return state.marked;
}