import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="pb-20 pt-16"> {/* pb-20 for bottom nav, pt-16 for header */}
                <div className="container mx-auto px-4 max-w-7xl pt-12">
                    <Outlet />
                </div>
            </main>

            {/* Bottom Navigation for Mobile */}
            <Navigation />
        </div>
    );
};

export default Layout;
