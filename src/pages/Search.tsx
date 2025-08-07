// pages/Search.tsx
import { useState, useEffect } from 'react';
import AnimeCard from '../components/anime/AnimeCard';
import {type Anime, type UserAnimeEntry, WATCH_STATUS} from '../types/anime';
import SearchBar from "../components/anime/SearchBar.tsx";
import {addAnimeToList, getUserAnimeList} from "../services/localStorage";
import {getPopularAnime} from "../services/jikanApi.ts";

const Search = () => {
    const [searchResults, setSearchResults] = useState<Anime[]>([]);
    const [popularResults, setPopularResults] = useState<Anime[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userAnimeList, setUserAnimeList] = useState<UserAnimeEntry[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingPopular, setIsLoadingPopular] = useState(false);

    const hasSearched = searchQuery.length > 0;
    const hasResults = searchResults.length > 0;
    const showNoResults = hasSearched && !hasResults;
    const currentResultsShown = hasResults ? searchResults : popularResults;
    const isAlreadyInList = (anime: Anime) => userAnimeList.some((entry) => entry.anime.id === anime.id);


    useEffect(() => {
        const fetchPopularAnime = async () => {
            setIsLoadingPopular(true);

            try {
                const transformedData = await getPopularAnime();
                setPopularResults(transformedData);
            } catch (error) {
                console.error('Error fetching popular results:', error);
            } finally {
                setIsLoadingPopular(false);
            }
        };

        fetchPopularAnime();
    }, []);

    useEffect(() => {
        const storedAnimeList = getUserAnimeList();
        setUserAnimeList(storedAnimeList);
    }, []);

    const handleSearchStateChange = (query: string, results: Anime[]) => {
        setSearchQuery(query);
        setSearchResults(results);
    };

    const handleAddToList = (anime: Anime) => {
        addAnimeToList(anime, WATCH_STATUS.PLAN_TO_WATCH);
        
        const updatedList = getUserAnimeList();
    setUserAnimeList(updatedList);
    };

    const SkeletonCard = () => (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
            {/* Cover Image Skeleton */}
            <div className="aspect-[3/4] bg-gray-700"></div>

            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
                {/* Title */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-4/5"></div>
                    <div className="h-3 bg-gray-700 rounded w-3/5"></div>
                </div>

                {/* Info rows */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <div className="h-3 bg-gray-700 rounded w-16"></div>
                        <div className="h-3 bg-gray-700 rounded w-20"></div>
                    </div>
                    <div className="flex justify-between">
                        <div className="h-3 bg-gray-700 rounded w-12"></div>
                        <div className="h-3 bg-gray-700 rounded w-24"></div>
                    </div>
                </div>

                {/* Button skeleton */}
                <div className="h-10 bg-gray-700 rounded"></div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-red-400 mb-2">
                    Discover Your Next Anime
                </h1>
                <p className="text-gray-400">
                    Search for anime and add them to your personal tracking list
                </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
                <SearchBar onSearch={handleSearchStateChange} onLoadingChange={setIsLoading}/>
            </div>

            {/* Results */}
            <div>
                {
                    !showNoResults && (
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-white">
                                {hasResults ? 'Search Results' : 'Popular Anime'}
                            </h2>
                            <span className="text-sm text-gray-400">
                        {
                            hasResults
                                ? `${searchResults.length} results for "${searchQuery}"`
                                : `${popularResults.length} popular anime`
                        }
                    </span>
                        </div>
                    )
                }

                {/* Anime Grid */}
                {showNoResults ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
                        <p className="text-gray-500 text-sm mt-2">Try searching for something else</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {(isLoading || (!hasSearched && isLoadingPopular)) ? (
                            // Show skeleton cards while searching OR while loading popular anime
                            Array.from({ length: 12 }, (_, index) => (
                                <SkeletonCard key={`skeleton-${index}`} />
                            ))
                        ) : (
                            // Show actual results
                            currentResultsShown.map((anime) => (
                                <AnimeCard
                                    key={anime.id}
                                    anime={anime}
                                    onAddToList={handleAddToList}
                                    isAlreadyInList={isAlreadyInList(anime)}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
