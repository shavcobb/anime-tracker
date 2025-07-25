import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();

    const navItems = [
        {
            path: '/search',
            label: 'Search',
            icon: '🔍',
            activeIcon: '🔍'
        },
        {
            path: '/my-list',
            label: 'My List',
            icon: '📋',
            activeIcon: '📋'
        },
        {
            path: '/stats',
            label: 'Stats',
            icon: '📊',
            activeIcon: '📊'
        }
    ];

    const isActive = (path: string) => {
        if (path === '/search') {
            return location.pathname === '/' || location.pathname === '/search';
        }
        return location.pathname === path;
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 sm:hidden">
            <div className="grid grid-cols-3 h-16">
                {navItems.map((item) => {
                    const active = isActive(item.path);

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                                active
                                    ? 'text-purple-400'
                                    : 'text-gray-400 hover:text-gray-200'
                            }`}
                        >
              <span className="text-xl">
                {active ? item.activeIcon : item.icon}
              </span>
                            <span className="text-xs font-medium">
                {item.label}
              </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navigation;
