import { useState } from "react";
import type { Anime } from "../../types/anime";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (query: string) => {
        if (!query) {
            setSearchResults([]);
            return;
        }

        setSearchQuery(query);
        setSearchResults([]);
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);

            if (!response.ok) {
                throw new Error('Network error: Failed to fetch anime');
            }

            const data = await response.json();
            setSearchResults(data.data);
        } catch (error) {
            setError('Error fetching search results');
        } finally {
            setLoading(false);
        }
    };

    console.log(searchResults, searchQuery, error);

    const searchInput = (
        <input
            type="text"
            placeholder="Search for animrrre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
