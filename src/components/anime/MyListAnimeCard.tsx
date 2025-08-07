import { type Anime, statusOptions, type UserAnimeEntry, type WatchStatus } from '../../types/anime';
import {useEffect, useRef, useState} from "react";
import {Modal} from "../ui/Modal.tsx";
import {AnimeDetailModal} from "../ui/AnimeDetailModal.tsx";

interface MyListAnimeCardProps {
    anime: Anime;
    userEntry: UserAnimeEntry;
    onStatusChange?: (animeId: number, status: WatchStatus) => void;
    showProgressTracker: boolean;
}

const MyListAnimeCard = ({ anime, userEntry, onStatusChange, showProgressTracker }: MyListAnimeCardProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const totalEpisodes = userEntry.anime.totalEpisodes ?? 0;
    const watchedEpisodes = userEntry.episodesWatched || 0;
    const progressPercentage = watchedEpisodes / totalEpisodes * 100;

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

    const handleCardClick = () => {
        setShowModal(true);
    };

    const handleStatusClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleStatusOptionClick = (e: React.MouseEvent, optionValue: WatchStatus) => {
        e.stopPropagation();

        onStatusChange?.(anime.id, optionValue);
        setIsDropdownOpen(false);
    };

    const getWatchStatusColor = (status: string) => {
        const statusOption = statusOptions.find(option => option.value === status);
        return statusOption?.color ?? 'bg-gray-600';
    };

    const formatWatchStatus = (status: string) => {
        const statusOption = statusOptions.find(option => option.value === status);
        return statusOption?.label ?? 'Unknown';
    };

    return (
        <>
            <div onClick={handleCardClick}
                 className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group min-h-[350px] flex flex-col cursor-pointer">
                {/* Cover Image */}
                <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
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
                    <div className="absolute top-2 left-2" ref={dropdownRef}>
                        <button
                            onClick={handleStatusClick} // Updated
                            className={`${getWatchStatusColor(userEntry.status)} text-white px-2 py-1 rounded text-xs cursor-pointer`}
                        >
                            {formatWatchStatus(userEntry.status)}
                        </button>

                        {isDropdownOpen && (
                            <div
                                className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded text-xs z-10 min-w-32">
                                {statusOptions
                                    .filter((option) => option.value !== userEntry.status)
                                    .map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={(e) => handleStatusOptionClick(e, option.value)} // Updated
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
                        {showProgressTracker && (
                            <div>
                                <div className="w-full bg-gray-700 rounded-lg h-5 relative flex items-center justify-center">
                                    <div
                                        className="absolute left-0 top-0 bg-red-500 h-full rounded-lg transition-all"
                                        style={{ width: `${progressPercentage}%` }}
                                    />
                                    <span className="relative z-10 text-sm font-medium text-white">
                                    {watchedEpisodes}/{totalEpisodes} episodes
                                </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={anime.englishTitle ?? anime.title}
            >
                <AnimeDetailModal animeId={anime.id} />
            </Modal>
        </>
    );
};

export default MyListAnimeCard;
