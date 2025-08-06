import type { JikanAnime, Anime } from "../types/anime";
import {transformJikanToAnime} from "../utils/dataHelpers.ts";

const API_BASE_URL = "https://api.jikan.moe/v4";

export async function getPopularAnime(): Promise<Anime[]> {
    try {
        const url = `${API_BASE_URL}/top/anime?limit=18&type=tv&filter=bypopularity`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network error: Failed to fetch anime');
        }

        const data = await response.json();

        return data.data.map((jikanAnime: JikanAnime) => transformJikanToAnime(jikanAnime));

    } catch (error) {
        console.log(`Error searching for popular anime:`, error);
        return [];
    }
}

export async function searchAnime(query: string): Promise<Anime[]> {
    try {
        const url = `${API_BASE_URL}/anime?q=${query}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network error: Failed to fetch anime');
        }

        const data = await response.json();

        return data.data.map((jikanAnime: JikanAnime) => transformJikanToAnime(jikanAnime));

    } catch (error) {
        console.log(`Error searching for ${query}:`, error);
        return [];
    }
}

export async function getAnimeById(id: number): Promise<Anime | null> {
    try {
        const url = `${API_BASE_URL}/anime/${id}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network error: Failed to fetch anime');
        }

        const data = await response.json();
        return transformJikanToAnime(data.data);
    } catch (error) {
        console.log(`Error fetching anime with ID ${id}:`, error);
        return null;
    }
}
