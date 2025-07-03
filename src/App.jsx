import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ComparisonPage from './pages/ComparisonPage';
import DetailsPage from './pages/DetailsPage';
import { ComparisonContext } from './context/ComparisonContext';

function App() {
  const [selectedProducts, setSelectedProducts] = useState(() => {
    try {
      const stored = localStorage.getItem('comparison');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('comparison', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  return (
    <ComparisonContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/compare" element={<ComparisonPage />} />
        <Route path="/product/:id" element={<DetailsPage />} />
      </Routes>
    </ComparisonContext.Provider>
  );
}

export default App;
