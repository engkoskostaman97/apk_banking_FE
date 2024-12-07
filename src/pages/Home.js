import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container center'>
      <h1>Selamat Datang di Aplikasi Bank</h1>
      
      {/* Navigasi Tombol */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/form-rekening">
          <button>Form Rekening</button>
        </Link>
        <Link to="/form-transaksi">
          <button>Form Transaksi</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
