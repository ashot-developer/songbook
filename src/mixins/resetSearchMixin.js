import { mapActions } from "vuex";

export default {
    methods: {
        ...mapActions({
            setSearchedSongs: 'song/setSearchedSongs',
            setKeyword: 'song/setKeyword'
        }),
        resetSearch() {
            this.setSearchedSongs([]);
            this.setKeyword('');
        },
    },
};