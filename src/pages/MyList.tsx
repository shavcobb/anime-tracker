import { useState, useEffect } from 'react';
import { getUserAnimeList, removeAnimeFromList } from '../services/localStorage';
import AnimeCard from '../components/anime/AnimeCard';
import type {Anime, UserAnimeEntry} from '../types/anime';

const MyList = () => {
    const [userAnimeList, setUserAnimeList] = useState<UserAnimeEntry[]>([]);

    const isListEmpty = userAnimeList.length === 0;
    const animeCount = userAnimeList.length || 0;

    useEffect(() => {
        const storedAnimeList = getUserAnimeList();
        setUserAnimeList(storedAnimeList);
    }, []);

    const handleRemoveFromList = (anime: Anime) => {
        removeAnimeFromList(anime.id);
        setUserAnimeList(getUserAnimeList());
        alert(`Removed "${anime.title}" from your list!`);
    };

    const emptyList = (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400 mb-4">Your anime list is empty!</p>
            <p className="text-sm text-gray-500">
                Start by searching for anime and adding them to your list
            </p>
        </div>
    );

    const renderList = (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {userAnimeList.map((animeListItem) => (
                <AnimeCard
                    key={animeListItem.animeId}
                    anime={animeListItem.anime}
                    showAddButton={false}
                    onRemoveFromList={handleRemoveFromList}
                />
            ))}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-purple-400">My Anime List</h1>
                <div className="text-sm text-gray-400">
                    {animeCount} anime tracked
                </div>
            </div>

            {
                isListEmpty
                    ? emptyList
                    : renderList
            }
        </div>
    );
};

export default MyList;
