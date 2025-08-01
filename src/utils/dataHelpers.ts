import type {Anime, JikanAnime} from "../types/anime.ts";

export const transformJikanToAnime = (jikanAnime: JikanAnime): Anime => {
    return {
        id: jikanAnime.mal_id,
        title: jikanAnime.title,
        englishTitle: jikanAnime.title_english ?? undefined,
        japaneseTitle: jikanAnime.title_japanese ?? undefined,
        coverImage: jikanAnime.images.jpg.image_url,
        largeCoverImage: jikanAnime.images.jpg.large_image_url,
        synopsis: jikanAnime.synopsis ?? undefined,
        type: jikanAnime.type,
        totalEpisodes: jikanAnime.episodes ?? undefined,
        airingStatus: jikanAnime.status,
        averageScore: jikanAnime.score ?? undefined,
        popularity: jikanAnime.popularity ?? undefined,
        genres: jikanAnime.genres.map(genre => genre.name),
        studios: jikanAnime.studios.map(studio => studio.name),
        year: jikanAnime.year ?? undefined,
        season: jikanAnime.season ?? undefined,
        duration: jikanAnime.duration ?? undefined,
        rating: jikanAnime.rating ?? undefined
    };
};
