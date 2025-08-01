// pages/Search.tsx
import { useState, useEffect } from 'react';
import AnimeCard from '../components/anime/AnimeCard';
import type {Anime, JikanAnime} from '../types/anime';
import SearchBar from "../components/anime/SearchBar.tsx";
import {transformJikanToAnime} from "../utils/dataHelpers.ts";

const Search = () => {
    const [searchResults, setSearchResults] = useState<Anime[]>([]);
    const [popularResults, setPopularResults] = useState<Anime[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const hasSearched = searchQuery.length > 0;
    const hasResults = searchResults.length > 0;
    const showNoResults = hasSearched && !hasResults;
    const currentResultsShown = hasResults ? searchResults : popularResults;

    useEffect(() => {
        const fetchPopularAnime = async () => {
            try {
                const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=12&type=tv&filter=bypopularity');
                const data = await response.json();
                const transformedData = data.data.map((jikanAnime: JikanAnime) => transformJikanToAnime(jikanAnime));

                setPopularResults(transformedData);
            } catch (error) {
                console.error('Error fetching popular results:', error);
            }
        };

        fetchPopularAnime();
    }, []);

    const handleSearchStateChange = (query: string, results: Anime[]) => {
        setSearchQuery(query);
        setSearchResults(results);

        console.log('Search query:', query);
    };

    const handleAddToList = (anime: Anime) => {
        // For now, just log it - we'll implement localStorage later
        console.log('Adding to list:', anime.title);
        alert(`Added "${anime.title}" to your list!`);
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-purple-400 mb-2">
                    Discover Your Next Anime
                </h1>
                <p className="text-gray-400">
                    Search for anime and add them to your personal tracking list
                </p>
            </div>

            {/* Search Bar - Placeholder for now */}
            <div className="max-w-2xl mx-auto">
                <SearchBar onSearch={handleSearchStateChange} />
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
                        {currentResultsShown.map((anime) => (
                            <AnimeCard
                                key={anime.id}
                                anime={anime}
                                onAddToList={handleAddToList}
                                showAddButton={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
