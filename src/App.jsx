import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListView from './pages/ListView';
import ProductView from './pages/ProductView';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Navbar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route path="/" element={<ListView />} />
            <Route path="/:id" element={<ProductView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
