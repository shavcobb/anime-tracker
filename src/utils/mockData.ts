// utils/mockData.ts
import type { Anime } from '../types/anime';

export const mockAnimeList: Anime[] = [
    {
        id: 16498,
        title: "Shingeki no Kyojin",
        englishTitle: "Attack on Titan",
        japaneseTitle: "進撃の巨人",
        coverImage: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
        largeCoverImage: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
        synopsis: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans, forcing humans to hide in fear behind enormous concentric walls.",
        type: "TV",
        totalEpisodes: 25,
        airingStatus: "Finished Airing",
        averageScore: 9.0,
        popularity: 1,
        genres: ["Action", "Drama", "Fantasy", "Military"],
        studios: ["Wit Studio"],
        year: 2013,
        season: "spring",
        duration: "24 min per ep",
        rating: "R - 17+ (violence & profanity)"
    },
    {
        id: 1535,
        title: "Death Note",
        englishTitle: "Death Note",
        japaneseTitle: "デスノート",
        coverImage: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
        largeCoverImage: "https://cdn.myanimelist.net/images/anime/9/9453l.jpg",
        synopsis: "A high school student discovers a supernatural notebook that allows him to kill anyone by writing their name in it.",
        type: "TV",
        totalEpisodes: 37,
        airingStatus: "Finished Airing",
        averageScore: 9.0,
        popularity: 2,
        genres: ["Supernatural", "Thriller", "Psychological"],
        studios: ["Madhouse"],
        year: 2006,
        season: "fall",
        duration: "23 min per ep",
        rating: "R - 17+ (violence & profanity)"
    },
    {
        id: 11061,
        title: "Hunter x Hunter (2011)",
        englishTitle: "Hunter x Hunter",
        japaneseTitle: "ハンター×ハンター",
        coverImage: "https://cdn.myanimelist.net/images/anime/11/33657.jpg",
        largeCoverImage: "https://cdn.myanimelist.net/images/anime/11/33657l.jpg",
        synopsis: "A young boy named Gon discovers that his father, who left him at a young age, is actually a world-renowned Hunter.",
        type: "TV",
        totalEpisodes: 148,
        airingStatus: "Finished Airing",
        averageScore: 9.0,
        popularity: 3,
        genres: ["Action", "Adventure", "Fantasy"],
        studios: ["Madhouse"],
        year: 2011,
        season: "fall",
        duration: "23 min per ep",
        rating: "PG-13 - Teens 13 or older"
    },
    {
        id: 40748,
        title: "Jujutsu Kaisen",
        englishTitle: "Jujutsu Kaisen",
        japaneseTitle: "呪術廻戦",
        coverImage: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
        largeCoverImage: "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
        synopsis: "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself.",
        type: "TV",
        totalEpisodes: 24,
        airingStatus: "Finished Airing",
        averageScore: 8.6,
        popularity: 4,
        genres: ["Action", "Supernatural", "School"],
        studios: ["MAPPA"],
        year: 2020,
        season: "fall",
        duration: "23 min per ep",
        rating: "R - 17+ (violence & profanity)"
    },
    {
        id: 38000,
        title: "Kimetsu no Yaiba",
        englishTitle: "Demon Slayer",
        japaneseTitle: "鬼滅の刃",
        coverImage: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
        largeCoverImage: "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
        synopsis: "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly.",
        type: "TV",
        totalEpisodes: 26,
        airingStatus: "Finished Airing",
        averageScore: 8.7,
        popularity: 5,
        genres: ["Action", "Historical", "Supernatural"],
        studios: ["Ufotable"],
        year: 2019,
        season: "spring",
        duration: "23 min per ep",
        rating: "R - 17+ (violence & profanity)"
    },
    {
        id: 54492,
        title: "Chainsaw Man",
        englishTitle: "Chainsaw Man",
        japaneseTitle: "チェンソーマン",
        coverImage: "https://cdn.myanimelist.net/images/anime/1806/126216.jpg",
        largeCoverImage: "https://cdn.myanimelist.net/images/anime/1806/126216l.jpg",
        synopsis: "Denji has a simple dream—to live a happy and peaceful life, spending time with a girl he likes. This is a far cry from reality, however.",
        type: "TV",
        totalEpisodes: 12,
        airingStatus: "Finished Airing",
        averageScore: 8.8,
        popularity: 6,
        genres: ["Action", "Supernatural"],
        studios: ["MAPPA"],
        year: 2022,
        season: "fall",
        duration: "23 min per ep",
        rating: "R - 17+ (violence & profanity)"
    }
];

// Helper function to get a single anime by ID
export const getAnimeById = (id: number): Anime | undefined => {
    return mockAnimeList.find(anime => anime.id === id);
};

// Helper function to get random anime for testing
export const getRandomAnime = (count: number = 3): Anime[] => {
    const shuffled = [...mockAnimeList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};
