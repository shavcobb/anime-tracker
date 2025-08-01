import type { Anime } from '../../types/anime';

interface AnimeCardProps {
    anime: Anime;
    onAddToList?: (anime: Anime) => void;
    onRemoveFromList?: (anime: Anime) => void;
    showAddButton?: boolean;
}

const AnimeCard = ({ anime, onAddToList, onRemoveFromList, showAddButton = true}: AnimeCardProps) => {
    const handleAddClick = () => {
        if (onAddToList) {
            onAddToList(anime);
        }
    };

    const handleRemoveClick = () => {
        if (onRemoveFromList) {
            onRemoveFromList(anime);
        }
    };

    // Helper function to format episode count
    const formatEpisodes = () => {
        if (!anime.totalEpisodes) return 'Unknown episodes';
        return `${anime.totalEpisodes} episode${anime.totalEpisodes === 1 ? '' : 's'}`;
    };

    // Helper function to get status color
    const getStatusColor = () => {
        switch (anime.airingStatus) {
            case 'Currently Airing':
                return 'text-green-400';
            case 'Finished Airing':
                return 'text-blue-400';
            case 'Not yet aired':
                return 'text-yellow-400';
            default:
                return 'text-gray-400';
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
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

                {/* Score overlay */}
                {anime.averageScore && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                        ⭐ {anime.averageScore.toFixed(1)}
                    </div>
                )}

                {/* Type badge */}
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium uppercase">
                    {anime.type}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Title */}
                <div>
                    <h3 className="font-semibold text-white text-sm line-clamp-2 leading-tight">
                        {anime.title}
                    </h3>
                    {anime.englishTitle && anime.englishTitle !== anime.title && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                            {anime.englishTitle}
                        </p>
                    )}
                </div>

                {/* Info */}
                <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-400">Episodes:</span>
                        <span className="text-gray-300">{formatEpisodes()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={getStatusColor()}>{anime.airingStatus}</span>
                    </div>

                    {anime.year && (
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400">Year:</span>
                            <span className="text-gray-300">{anime.year}</span>
                        </div>
                    )}
                </div>

                {/* Genres */}
                {anime.genres && anime.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {anime.genres.slice(0, 3).map((genre, index) => (
                            <span
                                key={index}
                                className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                            >
                {genre}
              </span>
                        ))}
                        {anime.genres.length > 3 && (
                            <span className="text-gray-400 text-xs py-1">
                +{anime.genres.length - 3} more
              </span>
                        )}
                    </div>
                )}

                {/* Add to List Button */}
                {showAddButton ? (
                    <button
                        onClick={handleAddClick}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded font-medium text-sm transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                        <span>➕</span>
                        <span>Add to List</span>
                    </button>
                ) : (
                    <button
                        onClick={handleRemoveClick}
                        className="w-full bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded text-sm font-medium transition-colors duration-200"
                    >
                        Remove
                    </button>
                )}
            </div>
        </div>
    )
};

export default AnimeCard;
