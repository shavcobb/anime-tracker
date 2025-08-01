import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    // Get page title based on current route
    const getPageTitle = () => {
        switch (location.pathname) {
            case '/':
            case '/search':
                return 'Search Anime';
            case '/my-list':
                return 'My List';
            case '/stats':
                return 'Stats';
            default:
                if (location.pathname.startsWith('/anime/')) {
                    return 'Anime Details';
                }
                return 'Tsugi';
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <Link
                        to="/"
                        className="flex items-center space-x-2 text-xl font-bold text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        <span className="text-2xl">⛩️</span>
                        <span className="hidden sm:inline">Tsugi</span>
                    </Link>

                    {/* Page Title - Shows on mobile */}
                    <h1 className="text-lg font-semibold sm:hidden">
                        {getPageTitle()}
                    </h1>

                    {/* Desktop Navigation */}
                    <nav className="hidden sm:flex items-center space-x-6">
                        <Link
                            to="/search"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                location.pathname === '/' || location.pathname === '/search'
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                            }`}
                        >
                            Search
                        </Link>
                        <Link
                            to="/my-list"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                location.pathname === '/my-list'
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                            }`}
                        >
                            My List
                        </Link>
                        <Link
                            to="/stats"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                location.pathname === '/stats'
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                            }`}
                        >
                            Stats
                        </Link>
                    </nav>

                    {/* Settings/Profile (Future) */}
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-sm">👤</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;