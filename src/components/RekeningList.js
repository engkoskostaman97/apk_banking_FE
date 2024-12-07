import React, { useEffect, useState } from 'react';
import { fetchRekening, deleteRekening } from './api';
import { useNavigate } from "react-router-dom";

const RekeningList = ({ setSelectedRekening }) => {
  const navigate = useNavigate();
  const [rekeningList, setRekeningList] = useState([]);

  useEffect(() => {
    const getRekening = async () => {
      try {
        const response = await fetchRekening();
        setRekeningList(response.data);
      } catch (error) {
        console.error('Gagal memuat data rekening', error);
      }
    };
    getRekening();
  }, []);

  const onEdit = (rekening) => {
    navigate(`/edit/${rekening.id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRekening(id);
      setRekeningList(rekeningList.filter(rekening => rekening.id !== id));
    } catch (error) {
      console.error('Gagal menghapus rekening', error);
      alert('Terjadi kesalahan saat menghapus rekening');
    }
  };

  return (
    <div>
      <h2>Daftar Rekening</h2>
      <table style={{ width: '100%', border: '1px solid #ddd', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nama Pemilik</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nomor Rekening</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Saldo</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tanggal Pembuatan</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rekeningList.length > 0 ? (
            rekeningList.map((rekening) => (
              <tr key={rekening.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{rekening.namaPemilik}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{rekening.nomorRekening}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{rekening.saldo}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{rekening.tanggalPembuatan}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button onClick={() => onEdit(rekening)} style={{ marginRight: '8px' }}>Edit</button>
                  <button onClick={() => handleDelete(rekening.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '8px' }}>Tidak ada rekening untuk ditampilkan</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RekeningList;
