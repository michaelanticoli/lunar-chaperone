import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Library from './pages/Library';
import WorkbookPage from './pages/WorkbookPage';
import { Navigation } from './components/ui/Navigation';

function AppContent() {
  const location = useLocation();
  
  return (
    <>
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Library />} />
          <Route path="/workbook/:volumeId" element={<WorkbookPage />} />
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