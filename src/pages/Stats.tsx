const Stats = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-red-400">Your Stats</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Placeholder stat cards */}
                {[
                    { label: 'Total Anime', value: '0', icon: '📺' },
                    { label: 'Episodes Watched', value: '0', icon: '▶️' },
                    { label: 'Hours Watched', value: '0', icon: '⏱️' },
                    { label: 'Average Rating', value: 'N/A', icon: '⭐' },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-gray-800 rounded-lg p-4 text-center"
                    >
                        <div className="text-2xl mb-2">{stat.icon}</div>
                        <div className="text-xl font-bold text-red-400">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400">
                    Detailed stats and charts coming soon! 📊
                </p>
            </div>
        </div>
    );
};

export default Stats;
