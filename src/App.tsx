// App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Page components (we'll create these next)
import Search from './pages/Search';
import MyList from './pages/MyList';
import AnimeDetail from './pages/AnimeDetail';
import Stats from './pages/Stats';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Redirect root to search */}
                    <Route index element={<Navigate to="/search" replace />} />

                    {/* Main pages */}
                    <Route path="search" element={<Search />} />
                    <Route path="my-list" element={<MyList />} />
                    <Route path="stats" element={<Stats />} />

                    {/* Dynamic route for individual anime */}
                    <Route path="anime/:id" element={<AnimeDetail />} />

                    {/* Catch all - redirect to search */}
                    <Route path="*" element={<Navigate to="/search" replace />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
