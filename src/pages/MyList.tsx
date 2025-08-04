import { useState, useEffect } from 'react';
import {getUserAnimeList, removeAnimeFromList, updateAnimeEntry} from '../services/localStorage';
import type {Anime, UserAnimeEntry, WatchStatus} from '../types/anime';
import MyListAnimeCard from "../components/anime/MyListAnimeCard.tsx";

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

    const updateWatchStatus = (animeId: number, newStatus: WatchStatus) => {
        updateAnimeEntry(animeId, { status: newStatus });
        setUserAnimeList(getUserAnimeList());
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userAnimeList.map((animeListItem) => (
                <div key={animeListItem.anime.id} className="relative">
                    {/* Trash can - positioned over THIS specific card */}
                    <div
                        onClick={() => handleRemoveFromList(animeListItem.anime)}
                        className="absolute top-2 right-2 z-10 text-white p-1 rounded cursor-pointer transition-colors"
                    >
                        🗑️
                    </div>

                    <MyListAnimeCard
                        key={animeListItem.anime.id}
                        anime={animeListItem.anime}
                        userEntry={animeListItem}
                        onStatusChange={updateWatchStatus}
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-red-400">My Anime List</h1>
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
