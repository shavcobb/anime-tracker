import { useParams } from 'react-router-dom';
import { AnimeDetailModal } from '../components/ui/AnimeDetailModal';

const AnimeDetailWrapper = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <h2 className="text-xl text-gray-400 mb-4">Invalid anime ID</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <AnimeDetailModal animeId={parseInt(id)} />
        </div>
    );
};

export default AnimeDetailWrapper;
