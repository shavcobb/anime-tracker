const MyList = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-purple-400">My Anime List</h1>
                <div className="text-sm text-gray-400">
                    0 anime tracked
                </div>
            </div>

            {/* Filter and anime grid will go here */}
            <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400 mb-4">Your anime list is empty!</p>
                <p className="text-sm text-gray-500">
                    Start by searching for anime and adding them to your list
                </p>
            </div>
        </div>
    );
};

export default MyList;
