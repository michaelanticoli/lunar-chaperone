import React from 'react';
import { HashRouter, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Library from './pages/Library';
import WorkbookPage from './pages/WorkbookPage';
import { Navigation } from './components/ui/Navigation';
import { getVolumeById } from './data/volumes';

// Backward-compat redirect: /workbook/:volumeId → /cycle/:fortnight
function WorkbookRedirect() {
  const { volumeId } = useParams();
  const vol = getVolumeById(volumeId);
  if (!vol) return <Navigate to="/cycle" replace />;
  return <Navigate to={`/cycle/${vol.fortnight}`} replace />;
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/cycle" replace />} />
          <Route path="/cycle" element={<Library />} />
          <Route path="/cycle/:fortnight" element={<WorkbookPage />} />
          {/* Legacy URL support */}
          <Route path="/workbook/:volumeId" element={<WorkbookRedirect />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
