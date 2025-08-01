import {type Anime, type UserAnimeEntry, WATCH_STATUS, type WatchStatus} from "../types/anime";

// Save data (key-value pairs)
//localStorage.setItem('key', 'value')

// Load data
//const value = localStorage.getItem('key')

// Remove data
//localStorage.removeItem('key')

// Clear everything
//localStorage.clear()

export const getUserAnimeList = (): UserAnimeEntry[] => {
    const data = localStorage.getItem('userAnimeList');

    if (data) {
        try {
            return JSON.parse(data) as UserAnimeEntry[];
        } catch (error) {
            console.error('Error parsing userAnimeList:', error);
            return [];
        }
    } else {
        return [];
    }
};

export const saveUserAnimeList = (userAnimeList: UserAnimeEntry[]) => {
    try {
        localStorage.setItem('userAnimeList', JSON.stringify(userAnimeList));
    } catch (error) {
        console.error('Error saving userAnimeList:', error);
    }
}

export const removeAnimeFromList = (animeId: number) => {
    const userAnimeList = getUserAnimeList();
    const updatedList = userAnimeList.filter(entry => entry.animeId !== animeId);
    saveUserAnimeList(updatedList);
}

export const addAnimeToList = (anime: Anime, status: WatchStatus) : UserAnimeEntry => {
    const userAnimeList = getUserAnimeList();
    const existingEntry = userAnimeList.find(entry => entry.animeId === anime.id);

    if (existingEntry) {
        return existingEntry;
    }

    const newEntry: UserAnimeEntry = {
        animeId: anime.id,
        anime: anime,
        status: status || WATCH_STATUS.PLAN_TO_WATCH,
        episodesWatched: 0,
        userRating: null,
        notes: null,
        startDate: null,
        finishDate: null,
        dateAdded: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        isFavorite: null,
        rewatchCount: null,
    };

    userAnimeList.push(newEntry);
    saveUserAnimeList(userAnimeList);
    return newEntry;
}

