import { useState } from "react";
import type {Anime, JikanAnime} from "../../types/anime";
import {transformJikanToAnime} from "../../utils/dataHelpers.ts";

interface SearchBarProps {
    onSearch: (query: string, transformedResults: Anime[]) => void;
}

const SearchBar = (props: SearchBarProps) => {
    const { onSearch } = props;

    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (query: string) => {
        // Always update parent with current query state
        if (!query.trim()) {
            onSearch("", []);
            return;
        }

        setSearchQuery(query);
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);

            if (!response.ok) {
                throw new Error('Network error: Failed to fetch anime');
            }

            const data = await response.json();
            const transformedData = data.data.map((jikanAnime: JikanAnime) => transformJikanToAnime(jikanAnime));

            onSearch(query, transformedData);
        } catch (error) {
            setError('Error fetching search results');
            onSearch(query, []); // Tell parent search failed but query exists
        } finally {
            setLoading(false);
        }
    };

    console.log(error);

    const searchInput = (
        <input
            type="text"
            placeholder="Search for anime..."
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value);
                // Real-time empty detection
                if (e.target.value.trim() === '') {
                    onSearch("", []);
                }
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch(searchQuery);
                }
            }}
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
    );

    const searchButton = (
        <button
            onClick={() => handleSearch(searchQuery)}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
            {loading ? (
                <>
                    <span className="animate-spin">⏳</span>
                    <span>Searching...</span>
                </>
            ) : (
                <>
                    <span>🔍</span>
                    <span>Search</span>
                </>
            )}
        </button>
    );

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                { searchInput }
                { searchButton }
            </div>
        </div>
    )
}

export default SearchBar;
