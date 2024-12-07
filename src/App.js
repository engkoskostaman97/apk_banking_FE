import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FormRekeningPage from './pages/FormRekeningPage';
import FormRekeningEditPage from './pages/FornRekeningEditPage';
import FormTransaksiPage from './pages/FormTransaksiPage';
import './style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form-rekening" element={<FormRekeningPage />} />
        <Route path="/edit/:id" element={<FormRekeningEditPage />} />
        <Route path="/form-transaksi" element={<FormTransaksiPage />} />
      </Routes>
    </Router>
  );
}

export default App;
