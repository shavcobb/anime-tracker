// Raw data structure from Jikan API
export interface JikanAnime {
    mal_id: number;
    title: string;
    title_english?: string;
    title_japanese?: string;
    images: {
        jpg: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
        webp: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
    };
    synopsis?: string;
    type: 'TV' | 'Movie' | 'OVA' | 'Special' | 'ONA' | 'Music';
    episodes?: number;
    status: 'Finished Airing' | 'Currently Airing' | 'Not yet aired';
    score?: number;
    scored_by?: number;
    rank?: number;
    popularity?: number;
    genres: Array<{
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }>;
    studios: Array<{
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }>;
    year?: number;
    season?: 'spring' | 'summer' | 'fall' | 'winter';
    aired: {
        from?: string;
        to?: string;
        string: string;
    };
    rating?: string;
    duration?: string;
}

// Simplified anime data for our app
export interface Anime {
    id: number;
    title: string;
    englishTitle?: string;
    japaneseTitle?: string;
    coverImage: string;
    largeCoverImage: string;
    synopsis?: string;
    type: AnimeType;
    totalEpisodes?: number;
    airingStatus: AiringStatus;
    averageScore?: number;
    popularity?: number;
    genres: string[];
    studios: string[];
    year?: number;
    season?: AnimeSeason;
    duration?: string;
    rating?: string;
}

// User's tracking data for an anime
export interface UserAnimeEntry {
    animeId: number;
    anime: Anime; // Include the anime data for easy access
    status: WatchStatus;
    episodesWatched: number;
    userRating?: number | null; // 1-10 scale
    notes?: string | null;
    startDate?: string | null; // ISO date string
    finishDate?: string | null; // ISO date string
    dateAdded: string; // ISO date string
    lastUpdated: string; // ISO date string
    isFavorite?: boolean | null;
    rewatchCount?: number | null;
}

// Enums for better type safety
export type AnimeType = 'TV' | 'Movie' | 'OVA' | 'Special' | 'ONA' | 'Music';

export type AiringStatus = 'Finished Airing' | 'Currently Airing' | 'Not yet aired';

export type AnimeSeason = 'spring' | 'summer' | 'fall' | 'winter';

export type WatchStatus =
    | 'watching'
    | 'completed'
    | 'plan-to-watch'
    | 'dropped'
    | 'on-hold';

export const WATCH_STATUS = {
    WATCHING: 'watching' as const,
    COMPLETED: 'completed' as const,
    PLAN_TO_WATCH: 'plan-to-watch' as const,
    DROPPED: 'dropped' as const,
    ON_HOLD: 'on-hold' as const,
} as const;

// For the status filter component
export interface StatusOption {
    value: WatchStatus;
    label: string;
    color: string; // Tailwind color class
    icon?: string; // For future icon support
}

// API response types
export interface JikanSearchResponse {
    data: JikanAnime[];
    pagination: {
        last_visible_page: number;
        has_next_page: boolean;
        current_page: number;
        items: {
            count: number;
            total: number;
            per_page: number;
        };
    };
}

export interface JikanAnimeResponse {
    data: JikanAnime;
}

// Search and filter types
export interface AnimeSearchParams {
    query?: string;
    type?: AnimeType;
    status?: AiringStatus;
    genres?: string[];
    year?: number;
    season?: AnimeSeason;
    limit?: number;
    page?: number;
}

export interface AnimeFilters {
    status?: WatchStatus[];
    genres?: string[];
    type?: AnimeType[];
    year?: number;
    rating?: {
        min?: number;
        max?: number;
    };
    sortBy?: 'title' | 'rating' | 'dateAdded' | 'lastUpdated' | 'episodesWatched';
    sortOrder?: 'asc' | 'desc';
}

// For stats/dashboard
export interface UserStats {
    totalAnime: number;
    totalEpisodes: number;
    averageRating: number;
    statusCounts: Record<WatchStatus, number>;
    topGenres: Array<{
        genre: string;
        count: number;
    }>;
    monthlyProgress: Array<{
        month: string;
        completed: number;
        episodesWatched: number;
    }>;
}

// Utility type for loading states
export interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}
