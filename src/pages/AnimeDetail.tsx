import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserAnimeList, updateAnimeEntry } from '../services/localStorage';
import {statusOptions, WATCH_STATUS} from '../types/anime';
import type { UserAnimeEntry, WatchStatus } from '../types/anime';

const AnimeDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [userEntry, setUserEntry] = useState<UserAnimeEntry | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        // Find the anime in user's list
        const userAnimeList = getUserAnimeList();
        const foundEntry = userAnimeList.find(entry => entry.anime.id === parseInt(id));

        setUserEntry(foundEntry || null);
        setLoading(false);
    }, [id]);

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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-400">Loading anime details...</div>
            </div>
        );
    }

    if (!userEntry) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl text-gray-400 mb-4">Anime not found</h2>
                <p className="text-gray-500 mb-6">This anime is not in your list.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const { anime } = userEntry;

    return (
        <div className="space-y-6">
            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
                <span>←</span>
                <span>Back</span>
            </button>

            {/* Anime title */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                    {anime.englishTitle ?? anime.title}
                </h1>
                {anime.englishTitle && anime.title !== anime.englishTitle && (
                    <p className="text-xl text-gray-400">{anime.title}</p>
                )}
            </div>

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
                </div>

                {/* Right Column - Details and Management */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Status and Progress Management */}
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Your Progress</h3>

                        <div className="space-y-4">
                            {/* Status */}
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">Status:</span>
                                <div className="flex items-center space-x-2">
                                    {statusOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleStatusChange(option.value)}
                                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                                userEntry.status === option.value
                                                    ? `${option.color} text-white`
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Episode Management */}
                            {(anime.totalEpisodes && userEntry.status === WATCH_STATUS.WATCHING) && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Episodes:</span>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => handleEpisodeChange(-1)}
                                                disabled={userEntry.episodesWatched <= 0}
                                                className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white w-8 h-8 rounded flex items-center justify-center"
                                            >
                                                -
                                            </button>
                                            <span className="text-white font-medium min-w-[80px] text-center">
                                    {userEntry.episodesWatched} / {anime.totalEpisodes}
                                </span>
                                            <button
                                                onClick={() => handleEpisodeChange(1)}
                                                disabled={userEntry.episodesWatched >= anime.totalEpisodes}
                                                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-800 disabled:text-gray-500 text-white w-8 h-8 rounded flex items-center justify-center"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full bg-gray-700 rounded-lg h-3 relative">
                                        <div
                                            className="bg-red-500 h-full rounded-lg transition-all duration-300"
                                            style={{
                                                width: `${(userEntry.episodesWatched / anime.totalEpisodes) * 100}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

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
                            <p className="text-gray-300 leading-relaxed">{anime.synopsis}</p>
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

export default AnimeDetail;
