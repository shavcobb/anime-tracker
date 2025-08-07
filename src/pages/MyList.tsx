import { useState, useEffect } from 'react';
import {getUserAnimeList, removeAnimeFromList, updateAnimeEntry} from '../services/localStorage';
import {type Anime, statusOptions, type UserAnimeEntry, WATCH_STATUS, type WatchStatus} from '../types/anime';
import MyListAnimeCard from "../components/anime/MyListAnimeCard.tsx";
import {StatusFilterDropdown} from "../components/ui/StatusFilterDropdown.tsx";

const MyList = () => {
    const [userAnimeList, setUserAnimeList] = useState<UserAnimeEntry[]>([]);
    const [activeFilter, setActiveFilter] = useState<WatchStatus | "all">("all");

    const isListEmpty = userAnimeList.length === 0;
    const animeCount = userAnimeList.length || 0;

    const filteredAnimeList = activeFilter === 'all'
        ? userAnimeList
        : userAnimeList.filter(entry => entry.status === activeFilter);

    const filteredCount = filteredAnimeList.length;

    useEffect(() => {
        const storedAnimeList = getUserAnimeList();
        setUserAnimeList(storedAnimeList);
    }, []);

    const handleRemoveFromList = (anime: Anime) => {
        removeAnimeFromList(anime.id);
        setUserAnimeList(getUserAnimeList());
    };

    const updateWatchStatus = (animeId: number, newStatus: WatchStatus) => {
        updateAnimeEntry(animeId, { status: newStatus });
        setUserAnimeList(getUserAnimeList());
    };

    const getStatusCount = (status: WatchStatus) => {
        return userAnimeList.filter(entry => entry.status === status).length;
    };

    const emptyList = (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400 mb-4">Your anime list is empty!</p>
            <p className="text-sm text-gray-500">
                Start by searching for anime and adding them to your list
            </p>
        </div>
    );

    const noFilterResults = (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-400 mb-4">No anime found with this status</p>
            <p className="text-sm text-gray-500">
                Try selecting a different filter
            </p>
        </div>
    );

    const renderList = (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAnimeList.map((animeListItem) => (
                <div key={animeListItem.anime.id} className="relative">
                    {/* Trash can - positioned over THIS specific card */}
                    <button
                        onClick={() => handleRemoveFromList(animeListItem.anime)}
                        className="absolute top-2 right-2 z-10 text-white p-1 rounded cursor-pointer transition-colors"
                    >
                        🗑️
                    </button>

                    <MyListAnimeCard
                        key={animeListItem.anime.id}
                        anime={animeListItem.anime}
                        userEntry={animeListItem}
                        onStatusChange={updateWatchStatus}
                        showProgressTracker={activeFilter === WATCH_STATUS.WATCHING}
                    />
                </div>
            ))}
        </div>
    );

    const content = () => {
        let myListContent = null;

        if (isListEmpty) {
            myListContent = emptyList;
        } else if (filteredCount === 0) {
            myListContent = noFilterResults;
        } else {
            myListContent = renderList;
        }

        return myListContent;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-red-400">My Anime List</h1>
            </div>

            {/* Filter Buttons - Only show if list is not empty */}
            {!isListEmpty && (
                <div className="space-y-4">
                    {/* Mobile-friendly dropdown instead of buttons */}
                    <StatusFilterDropdown
                        selectedStatus={activeFilter}
                        onStatusChange={setActiveFilter}
                        statusOptions={statusOptions}
                        getStatusCount={getStatusCount}
                        animeCount={animeCount}
                    />

                    {/* Results info */}
                </div>
            )}

            {/* Content */}
            {content()}
        </div>
    );
};

export default MyList;
