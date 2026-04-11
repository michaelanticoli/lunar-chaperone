import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { WorkbookProvider } from './context/WorkbookContext';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WorkbookProvider>
      <App />
    </WorkbookProvider>
  </StrictMode>
);