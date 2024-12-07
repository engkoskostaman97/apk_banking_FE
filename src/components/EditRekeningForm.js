import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRekeningById, updateRekening } from './api';
import { useNavigate } from "react-router-dom";

const EditRekeningForm = ({ fetchRekening }) => {
  const navigate = useNavigate();
  const onEdit = () => {
    navigate(`/form-rekening`);
  };

  const { id } = useParams(); // Ambil ID dari URL
  const [formData, setFormData] = useState({
    namaPemilik: '',
    nomorRekening: '',
    saldo: '',
    tanggalPembuatan: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRekeningById(id);

        if (!response) {
          alert('Rekening tidak ditemukan');
          return;
        }

        // Set form data dengan nilai dari server
        setFormData({
          namaPemilik: response.namaPemilik || '',
          nomorRekening: response.nomorRekening || '',
          saldo: response.saldo || '',
          tanggalPembuatan: response.tanggalPembuatan
            ? response.tanggalPembuatan
            : new Date().toISOString().slice(0, 10),
        });
      } catch (error) {
        console.error('Gagal mengambil data rekening:', error);
        alert('Gagal memuat data rekening');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateRekening(id, formData);
      alert('Rekening berhasil diperbarui');
      fetchRekening();
    } catch (error) {
      console.error('Gagal memperbarui rekening:', error);
      alert('Terjadi kesalahan saat memperbarui data');
    }
  };

  if (isLoading) return <p>Loading data...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Rekening</h2>
      <div>
        <label>Nama Pemilik</label>
        <input
          type="text"
          name="namaPemilik"
          value={formData.namaPemilik}
          onChange={handleChange}
          placeholder="Masukkan nama pemilik"
        />
      </div>
      <div>
        <label>Nomor Rekening</label>
        <input
          type="text"
          name="nomorRekening"
          value={formData.nomorRekening}
          onChange={handleChange}
          placeholder="Masukkan nomor rekening"
        />
      </div>
      <div>
        <label>Saldo</label>
        <input
          type="number"
          name="saldo"
          value={formData.saldo}
          onChange={handleChange}
          placeholder="Masukkan saldo"
        />
      </div>
      <div>
        <label>Tanggal Pembuatan</label>
        <input
          type="date"
          name="tanggalPembuatan"
          value={formData.tanggalPembuatan}
          onChange={handleChange}
          placeholder="Masukkan tanggal pembuatan"
        />
      </div>
      <br />
      <button type="submit">Update Rekening</button>
      <button onClick={() => onEdit()} style={{ marginRight: '8px' }}>Kembali</button>

    </form>
  );
};

export default EditRekeningForm;
