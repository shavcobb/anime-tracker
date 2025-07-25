import { useParams } from 'react-router-dom';

const AnimeDetail = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold text-purple-400 mb-4">
                    Anime Detail Page
                </h1>
                <p className="text-gray-400">
                    Anime ID: {id}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    Detailed anime view coming soon! 📺
                </p>
            </div>
        </div>
    );
};

export default AnimeDetail;
