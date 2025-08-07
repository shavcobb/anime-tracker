import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { EpisodeCounter } from './EpisodeCounter';
import {type Anime, statusOptions, type UserAnimeEntry, WATCH_STATUS, type WatchStatus} from "../../types/anime.ts";
import {getUserAnimeList, removeAnimeFromList, updateAnimeEntry} from "../../services/localStorage.ts";
import {getAnimeById} from "../../services/jikanApi.ts";

interface AnimeDetailModalProps {
    animeId: number;
    onAddToList?: (anime: Anime) => void;
}

export const AnimeDetailModal: React.FC<AnimeDetailModalProps> = ({ animeId, onAddToList }) => {
    const [userEntry, setUserEntry] = useState<UserAnimeEntry | null>(null);
    const [animeData, setAnimeData] = useState<Anime | null>(null);
    const [isInUserList, setIsInUserList] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const anime = isInUserList ? userEntry?.anime : animeData;

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

    useEffect(() => {
        const fetchAnimeData = async () => {
            setLoading(true); // Start loading

            const userAnimeList = getUserAnimeList();
            const foundEntry = userAnimeList.find(entry => entry.anime.id === animeId);

            if (foundEntry) {
                setUserEntry(foundEntry);
                setIsInUserList(true);
                setAnimeData(null); // Clear any previous API data
            } else {
                setUserEntry(null);
                setIsInUserList(false);

                try {
                    const anime = await getAnimeById(animeId);
                    setAnimeData(anime || null);
                } catch (error) {
                    console.error('Error fetching anime details:', error);
                    setAnimeData(null);
                }
            }

            setLoading(false); // End loading
        };

        fetchAnimeData();
    }, [animeId]);

    const handleAddClick = (e: React.MouseEvent, animeData: Anime) => {
        e.stopPropagation();

        if (onAddToList && animeData) {
            onAddToList(animeData);

            const userAnimeList = getUserAnimeList();
            const foundEntry = userAnimeList.find(entry => entry.anime.id === animeId);

            if (foundEntry) {
                setUserEntry(foundEntry);
                setIsInUserList(true);
                setAnimeData(null);
            }
        }
    };

    const handleStatusChange = (newStatus: WatchStatus) => {
        if (!userEntry) return;

        updateAnimeEntry(userEntry.anime.id, { status: newStatus });
        setUserEntry({ ...userEntry, status: newStatus });
    };

    const handleEpisodeChange = (increment: number) => {
        if (!userEntry) return;

        const newEpisodeCount = Math.max(0, Math.min(
            userEntry.episodesWatched + increment,
            userEntry.anime.totalEpisodes ?? userEntry.episodesWatched + increment
        ));

        updateAnimeEntry(userEntry.anime.id, { episodesWatched: newEpisodeCount });
        setUserEntry({ ...userEntry, episodesWatched: newEpisodeCount });
    };

    const handleRemoveFromList = (anime: Anime) => {
        removeAnimeFromList(anime.id);

        setUserEntry(null);
        setIsInUserList(false);
        setAnimeData(anime); // Keep the anime data so we can still show details
        
        // Notify other components
    window.dispatchEvent(new CustomEvent('animeListUpdated'));
    };

    const AnimeDetailModalSkeleton = () => (
        <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Cover Art Skeleton */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-700 rounded-lg aspect-[3/4]"></div>
                </div>

                {/* Right Column - Details Skeleton */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Progress/Add section skeleton */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <div className="h-6 bg-gray-700 rounded w-32 mb-4"></div>
                        <div className="h-4 bg-gray-700 rounded w-48 mb-4"></div>
                        <div className="h-12 bg-gray-700 rounded"></div>
                    </div>

                    {/* Information section skeleton */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <div className="h-6 bg-gray-700 rounded w-24 mb-4"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-700 rounded"></div>
                                <div className="h-4 bg-gray-700 rounded"></div>
                                <div className="h-4 bg-gray-700 rounded"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-700 rounded"></div>
                                <div className="h-4 bg-gray-700 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* Synopsis skeleton */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <div className="h-6 bg-gray-700 rounded w-20 mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-700 rounded"></div>
                            <div className="h-4 bg-gray-700 rounded"></div>
                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <AnimeDetailModalSkeleton />
        );
    }

    if (!anime) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl text-gray-400 mb-4">Anime not found</h2>
                <p className="text-gray-500">Could not load anime details.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Cover Art */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                        <img
                            src={anime.largeCoverImage || anime.coverImage}
                            alt={anime.title}
                            className="w-full h-auto"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/300x400/4A5568/CBD5E0?text=No+Image';
                            }}
                        />
                    </div>

                    {/* Only show remove button when anime is in user's list */}
                    {isInUserList && (
                        <button
                            onClick={() => handleRemoveFromList(anime)}
                            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-medium text-sm transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                            <span>🗑️</span>
                            <span>Remove from List</span>
                        </button>
                    )}
                </div>

                {/* Right Column - Details and Management */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Status and Progress Management */}
                    {
                        isInUserList ? (
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>

                                <div className="space-y-4">
                                    {/* Status */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Status:</span>
                                        <div className="relative inline-block">
                                            <button
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className={`min-w-36 flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                    statusOptions.find(opt => opt.value === userEntry?.status)?.color ?? 'bg-gray-700'
                                                } text-white`}
                                            >
                                                <span>{statusOptions.find(opt => opt.value === userEntry?.status)?.label ?? 'Select Status'}</span>
                                                <ChevronDownIcon
                                                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                                />
                                            </button>

                                            {isDropdownOpen && (
                                                <div className="absolute top-full right-0 mt-2 min-w-36 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
                                                    <div className="py-1">
                                                        {statusOptions.map((option) => (
                                                            <button
                                                                key={option.value}
                                                                onClick={() => {
                                                                    handleStatusChange(option.value);
                                                                    setIsDropdownOpen(false);
                                                                }}
                                                                className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors text-sm ${
                                                                    userEntry?.status === option.value
                                                                        ? `${option.color}/20 text-white border-l-4`
                                                                        : 'text-gray-300'
                                                                }`}
                                                                style={userEntry?.status === option.value ? { borderLeftColor: option.color.replace('bg-', '').replace('-500', '') } : {}}
                                                            >
                                                                {option.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Episode Management */}
                                    {(anime.totalEpisodes && userEntry?.status === WATCH_STATUS.WATCHING) && (
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-400">Episodes:</span>
                                                <EpisodeCounter
                                                    currentEpisode={userEntry?.episodesWatched}
                                                    totalEpisodes={anime.totalEpisodes}
                                                    onEpisodeChange={(newEpisode) => {
                                                        updateAnimeEntry(userEntry?.anime.id, { episodesWatched: newEpisode });
                                                        setUserEntry({ ...userEntry, episodesWatched: newEpisode });
                                                    }}
                                                    onDecrement={() => handleEpisodeChange(-1)}
                                                    onIncrement={() => handleEpisodeChange(1)}
                                                    canDecrement={userEntry?.episodesWatched > 0}
                                                    canIncrement={userEntry?.episodesWatched < anime.totalEpisodes}
                                                />
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="w-full bg-gray-700 rounded-lg h-3 relative">
                                                <div
                                                    className="bg-red-500 h-full rounded-lg transition-all duration-300"
                                                    style={{
                                                        width: `${(userEntry?.episodesWatched / anime.totalEpisodes) * 100}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Add to Your List</h3>
                                <p className="text-gray-400 mb-4">Track your progress with this anime</p>
                                <button
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                                    onClick={(e: React.MouseEvent) => {handleAddClick(e, anime)}}
                                >
                                    Add to My List
                                </button>
                            </div>
                        )
                    }

                    {/* Anime Information */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Type:</span>
                                    <span className="text-gray-300">{anime.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Episodes:</span>
                                    <span className="text-gray-300">{anime.totalEpisodes || 'Unknown'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Status:</span>
                                    <span className="text-gray-300">{anime.airingStatus}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {anime.year && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Year:</span>
                                        <span className="text-gray-300">{anime.year}</span>
                                    </div>
                                )}
                                {anime.averageScore && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Score:</span>
                                        <span className="text-gray-300">⭐ {anime.averageScore.toFixed(1)}</span>
                                    </div>
                                )}
                                {anime.duration && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Duration:</span>
                                        <span className="text-gray-300">{anime.duration}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Synopsis */}
                    {anime.synopsis && (
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Synopsis</h3>
                            <p className="text-gray-300 leading-relaxed max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                                {anime.synopsis}
                            </p>
                        </div>
                    )}

                    {/* Genres */}
                    {anime.genres && anime.genres.length > 0 && (
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Genres</h3>
                            <div className="flex flex-wrap gap-2">
                                {anime.genres.map((genre, index) => (
                                    <span
                                        key={index}
                                        className="bg-red-500 text-white px-3 py-1 rounded-full text-sm"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
