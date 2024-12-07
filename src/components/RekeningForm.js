import React, { useState, useEffect } from 'react';
import { createRekening, updateRekening } from './api';

const RekeningForm = ({ currentRekening, setCurrentRekening, fetchRekening }) => {
  const [formData, setFormData] = useState({
    namaPemilik: '',
    nomorRekening: '',
    saldo: 0,
    tanggalPembuatan: '',
  });

  // Mengisi form jika currentRekening memiliki data
  useEffect(() => {
    if (currentRekening) {
      setFormData({
        namaPemilik: currentRekening.namaPemilik || '',
        nomorRekening: currentRekening.nomorRekening || '',
        saldo: currentRekening.saldo || 0,
        tanggalPembuatan: currentRekening.tanggalPembuatan || '',
      });
    }
  }, [currentRekening]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi data sebelum dikirim
    if (!formData.namaPemilik || !formData.nomorRekening || formData.saldo < 0) {
      alert('Harap isi semua kolom dengan benar!');
      return;
    }

    try {
      if (currentRekening) {
        // Jika mengedit rekening yang ada
        await updateRekening(currentRekening.id, formData);
        alert('Rekening berhasil diperbarui');
      } else {
        // Jika membuat rekening baru
        await createRekening(formData);
        alert('Rekening berhasil dibuat');
      }

      // Reset form hanya jika operasi berhasil
      setFormData({
        namaPemilik: '',
        nomorRekening: '',
        saldo: 0,
        tanggalPembuatan: '',
      });
      setCurrentRekening(null);

      // Perbarui daftar rekening di tampilan utama
      fetchRekening();
    } catch (error) {
      console.error('Ada kesalahan saat mengirim data:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{currentRekening ? 'Edit Rekening' : 'Tambah Rekening'}</h2>
      <div>
        <label>Nama Pemilik</label>
        <input
          type="text"
          name="namaPemilik"
          value={formData.namaPemilik}
          onChange={handleChange}
          placeholder="Masukkan nama pemilik"
          required
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
          required
        />
      </div>
      <br></br>
      <div>
        <label>Saldo</label>
        <input
          type="number"
          name="saldo"
          value={formData.saldo}
          onChange={handleChange}
          placeholder="Masukkan saldo"
          required
        />
      </div>
      <br></br>
      <div>
        <label>Tanggal Pembuatan</label>
        <input
          type="date"
          name="tanggalPembuatan"
          value={formData.tanggalPembuatan}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{currentRekening ? 'Update' : 'Tambah'}</button>
    </form>
  );
};

export default RekeningForm;
