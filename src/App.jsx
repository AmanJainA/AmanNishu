import { Navigate, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Card from './pages/Card';
import Arrangement from './pages/Arrangement';
import Video from './pages/Video';
import Admin from './pages/Admin';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Card />} />
        <Route path="/arrangement" element={<Arrangement mode="new" />} />
        <Route path="/edit-arrangement" element={<Arrangement mode="edit" />} />
        <Route path="/video" element={<Video />} />
        <Route path="/admin" element={<Admin />} />
        {/* Links already shared with guests used the old .php URLs */}
        <Route path="/index.php" element={<Navigate to="/" replace />} />
        <Route path="/card.php" element={<Navigate to="/card" replace />} />
        <Route path="/arrangement.php" element={<Navigate to="/arrangement" replace />} />
        <Route path="/editarrangement.php" element={<Navigate to="/edit-arrangement" replace />} />
        <Route path="/video.php" element={<Navigate to="/video" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}