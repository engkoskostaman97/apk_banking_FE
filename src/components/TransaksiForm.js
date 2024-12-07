import React, { useState, useEffect } from 'react';
import { createTransaksi, updateTransaksi } from './api';

const TransaksiForm = ({ currentTransaksi, setCurrentTransaksi, fetchTransaksi }) => {
  const [formData, setFormData] = useState({
    nomorRekening: '',
    jenisTransaksi: '',
    jumlahTransaksi: '',
    tanggalTransaksi: '',
  });

  // Perbarui formulir jika dalam mode edit
  useEffect(() => {
    if (currentTransaksi) {
      setFormData({
        nomorRekening: currentTransaksi.nomorRekening.nomorRekening,
        jenisTransaksi: currentTransaksi.jenisTransaksi,
        jumlahTransaksi: currentTransaksi.jumlahTransaksi,
        tanggalTransaksi: currentTransaksi.tanggalTransaksi,
      });
    }
  }, [currentTransaksi]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'nomorRekening' && !/^\d+$/.test(value)) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nomorRekening: { nomorRekening: formData.nomorRekening },
      jenisTransaksi: formData.jenisTransaksi,
      jumlahTransaksi: parseFloat(formData.jumlahTransaksi),
      tanggalTransaksi: formData.tanggalTransaksi,
    };

    try {
      if (currentTransaksi) {
        // Jika dalam mode edit, lakukan update
        const response = await updateTransaksi(currentTransaksi.id, payload);
        console.log('Respons Update:', response);

        alert('Transaksi berhasil diperbarui!');
      } else {
        // Jika dalam mode tambah, buat transaksi
        const response = await createTransaksi(payload);
        console.log('Respons Tambah:', response);

        alert('Transaksi berhasil ditambahkan!');
      }

      setFormData({
        nomorRekening: '',
        jenisTransaksi: '',
        jumlahTransaksi: '',
        tanggalTransaksi: '',
      });
      setCurrentTransaksi(null);
      fetchTransaksi();
    } catch (error) {
      console.error('Kesalahan saat mengirim transaksi:', error);
      alert('Terjadi kesalahan saat mengirim transaksi!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{currentTransaksi ? 'Edit Transaksi' : 'Tambah Transaksi'}</h2>
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
      <br />
      <div>
        <label>Jenis Transaksi</label>
        <select
          name="jenisTransaksi"
          value={formData.jenisTransaksi}
          onChange={handleChange}
          required
        >
          <option value="">Pilih Jenis Transaksi</option>
          <option value="debit">Debit</option>
          <option value="kredit">Kredit</option>
        </select>
      </div>
      <br />
      <div>
        <label>Jumlah Transaksi</label>
        <input
          type="number"
          name="jumlahTransaksi"
          value={formData.jumlahTransaksi}
          onChange={handleChange}
          placeholder="Jumlah Transaksi"
          required
        />
      </div>
      <br />
      <div>
        <label>Tanggal Transaksi</label>
        <input
          type="date"
          name="tanggalTransaksi"
          value={formData.tanggalTransaksi}
          onChange={handleChange}
          required
        />
      </div>
      <br />
      <button
        type="submit"
        style={{
          padding: '8px 12px',
          backgroundColor: '#007BFF',
          color: '#FFF',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {currentTransaksi ? 'Update' : 'Tambah'}
      </button>
    </form>
  );
};

export default TransaksiForm;
