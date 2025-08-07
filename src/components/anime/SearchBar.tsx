import { useState } from "react";
import type {Anime} from "../../types/anime";
import {searchAnime} from "../../services/jikanApi.ts";

interface SearchBarProps {
    onSearch: (query: string, transformedResults: Anime[]) => void;
    onLoadingChange: (isLoading: boolean) => void;
}

const SearchBar = (props: SearchBarProps) => {
    const { onSearch, onLoadingChange } = props;

    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            onSearch("", []);
            return;
        }

        setSearchQuery(query);
        setLoading(true);
        onLoadingChange(true);

        const results = await searchAnime(query);
         onSearch(query, results);
         setLoading(false);
         onLoadingChange(false);
    };

    const searchInput = (
        <input
            type="text"
            placeholder="Search for anime..."
            value={searchQuery}
            onChange={(e) => {
                setSearchQuery(e.target.value);

                if (e.target.value.trim() === '') {
                    onSearch("", []);
                }
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch(searchQuery);
                }
            }}
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
        />
    );

    const searchButton = (
        <button
            onClick={() => handleSearch(searchQuery)}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
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
