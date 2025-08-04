import { type Anime, statusOptions, type UserAnimeEntry, WATCH_STATUS, type WatchStatus } from '../../types/anime';
import {useEffect, useRef, useState} from "react";

interface MyListAnimeCardProps {
    anime: Anime;
    userEntry: UserAnimeEntry;
    onStatusChange?: (animeId: number, status: WatchStatus) => void;
}

const MyListAnimeCard = ({ anime, userEntry, onStatusChange }: MyListAnimeCardProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const getWatchStatusColor = (status: string) => {
        const statusOption = statusOptions.find(option => option.value === status);
        return statusOption?.color ?? 'bg-gray-600';
    };

    const formatWatchStatus = (status: string) => {
        const statusOption = statusOptions.find(option => option.value === status);
        return statusOption?.label ?? 'Unknown';
    };

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group min-h-[350px] flex flex-col">
            {/* Cover Image */}
            <div className="relative aspect-[3/4] overflow-hidden">
                <img
                    src={anime.coverImage}
                    alt={anime.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/300x400/4A5568/CBD5E0?text=No+Image';
                    }}
                />

                {/* Status overlay with dropdown */}
                <div className="absolute top-2 left-2">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`${getWatchStatusColor(userEntry.status)} text-white px-2 py-1 rounded text-xs cursor-pointer`}
                    >
                        {formatWatchStatus(userEntry.status)}
                    </button>

                    {isDropdownOpen && (
                        <div
                            ref={dropdownRef}
                            className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded text-xs z-10 min-w-32">
                            {statusOptions
                                .filter((option) => option.value !== userEntry.status)
                                .map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        onStatusChange?.(anime.id, option.value);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="w-full px-2 py-1 text-white hover:bg-gray-600 text-left first:rounded-t last:rounded-b"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-end">
                {/* Title */}
                <div>
                    <h3 className="font-semibold text-white text-sm line-clamp-2 leading-tight">
                        {anime.englishTitle ?? anime.title}
                    </h3>
                </div>

                {/* Minimal Info */}
                <div className="space-y-1 text-xs">
                    {userEntry?.status === WATCH_STATUS.WATCHING && (
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400">Episodes watched:</span>
                            <span className="text-gray-300">{userEntry.episodesWatched}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyListAnimeCard;
