import React, { createContext, useContext, useState, useEffect } from 'react';

const WorkbookContext = createContext();

export const WorkbookProvider = ({ children }) => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('moontuner_canonical_v1');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('moontuner_canonical_v1', JSON.stringify(entries));
  }, [entries]);

  // Updated to support multi-volume state
  const updateEntry = (volumeId, entryId, value) => {
    setEntries(prev => ({
      ...prev,
      [volumeId]: {
        ...(prev[volumeId] || {}),
        [entryId]: value
      }
    }));
  };

  const clearVolume = (volumeId) => {
    if (window.confirm("This will dissolve this volume's reflections. Proceed?")) {
      setEntries(prev => {
        const newState = { ...prev };
        delete newState[volumeId];
        return newState;
      });
    }
  };

  return (
    <WorkbookContext.Provider value={{ entries, updateEntry, clearVolume }}>
      {children}
    </WorkbookContext.Provider>
  );
};

export const useWorkbook = () => useContext(WorkbookContext);