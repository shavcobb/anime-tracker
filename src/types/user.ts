import type {UserAnimeEntry, WatchStatus} from './anime';

// User profile/settings
export interface User {
    id?: string; // For future backend integration
    username?: string;
    email?: string;
    preferences: UserPreferences;
    stats: UserQuickStats;
    createdAt: string;
    lastActive: string;
}

// User customization preferences
export interface UserPreferences {
    // Display preferences
    theme: 'light' | 'dark' | 'auto';
    defaultView: 'grid' | 'list';
    cardsPerRow: 2 | 3 | 4 | 'auto';
    showScores: boolean;
    showProgress: boolean;
    showNotes: boolean;

    // Anime detail page customization (your killer feature!)
    animePageSections: AnimePageSection[];

    // Rating preferences
    ratingSystem: 'stars' | 'decimal' | 'simple'; // 5-star, 1-10, or thumbs up/down
    allowHalfRatings: boolean;

    // List preferences
    defaultStatus: WatchStatus;
    showAdultContent: boolean;
    autoMarkCompleted: boolean; // Auto-mark as completed when episodes watched = total episodes

    // Notification preferences (for future)
    notifyNewEpisodes: boolean;
    notifySeasonReminders: boolean;
}

// For the customizable anime detail page
export interface AnimePageSection {
    id: string;
    name: string;
    visible: boolean;
    order: number;
    customizable: boolean;
}

// Quick stats for dashboard
export interface UserQuickStats {
    totalAnime: number;
    currentlyWatching: number;
    completed: number;
    totalEpisodes: number;
    averageRating?: number;
    favoriteGenres: string[];
}

// Local storage structure
export interface LocalStorageData {
    animeList: UserAnimeEntry[];
    user: User;
    lastSync?: string;
    version: string; // For data migration if needed
}

// App settings/configuration
export interface AppConfig {
    apiBaseUrl: string;
    itemsPerPage: number;
    maxSearchResults: number;
    cacheExpiration: number; // In milliseconds
    enableAnalytics: boolean;
}

// For managing app state
export interface AppState {
    user: User | null;
    animeList: UserAnimeEntry[];
    isLoading: boolean;
    error: string | null;
    lastSync: string | null;
}

// Form data types
export interface AddAnimeFormData {
    animeId: number;
    status: WatchStatus;
    episodesWatched?: number;
    userRating?: number;
    notes?: string;
    startDate?: string;
}

export interface EditAnimeFormData {
    status?: WatchStatus;
    episodesWatched?: number;
    userRating?: number;
    notes?: string;
    startDate?: string;
    finishDate?: string;
    isFavorite?: boolean;
}

// Search history for better UX
export interface SearchHistoryItem {
    query: string;
    timestamp: string;
    resultCount: number;
}

// Export/Import types for future backup functionality
export interface ExportData {
    version: string;
    exportDate: string;
    animeList: UserAnimeEntry[];
    userPreferences: UserPreferences;
    metadata: {
        totalAnime: number;
        totalEpisodes: number;
        averageRating?: number;
    };
}

// Default values
export const DEFAULT_USER_PREFERENCES: UserPreferences = {
    theme: 'dark',
    defaultView: 'grid',
    cardsPerRow: 'auto',
    showScores: true,
    showProgress: true,
    showNotes: false,
    animePageSections: [
        { id: 'header', name: 'Title & Cover', visible: true, order: 1, customizable: false },
        { id: 'synopsis', name: 'Synopsis', visible: true, order: 2, customizable: true },
        { id: 'details', name: 'Details', visible: true, order: 3, customizable: true },
        { id: 'genres', name: 'Genres', visible: true, order: 4, customizable: true },
        { id: 'recommendations', name: 'Recommendations', visible: true, order: 5, customizable: true },
        { id: 'reviews', name: 'Reviews', visible: false, order: 6, customizable: true },
    ],
    ratingSystem: 'decimal',
    allowHalfRatings: true,
    defaultStatus: 'plan-to-watch',
    showAdultContent: false,
    autoMarkCompleted: true,
    notifyNewEpisodes: false,
    notifySeasonReminders: false,
};

export const DEFAULT_APP_CONFIG: AppConfig = {
    apiBaseUrl: 'https://api.jikan.moe/v4',
    itemsPerPage: 20,
    maxSearchResults: 50,
    cacheExpiration: 1000 * 60 * 30, // 30 minutes
    enableAnalytics: false,
};
