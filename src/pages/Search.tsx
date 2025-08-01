// pages/Search.tsx
import { useState } from 'react';
import AnimeCard from '../components/anime/AnimeCard';
import { mockAnimeList } from '../utils/mockData';
import type { Anime } from '../types/anime';
import SearchBar from "../components/anime/SearchBar.tsx";

const Search = () => {
    const [searchResults] = useState<Anime[]>(mockAnimeList); // Using mock data for now

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
                <SearchBar />
            </div>

            {/* Results */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">
                        Popular Anime
                    </h2>
                    <span className="text-sm text-gray-400">
            {searchResults.length} results
          </span>
                </div>

                {/* Anime Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {searchResults.map((anime) => (
                        <AnimeCard
                            key={anime.id}
                            anime={anime}
                            onAddToList={handleAddToList}
                            showAddButton={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
