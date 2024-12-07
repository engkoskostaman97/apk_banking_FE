import axios from 'axios';

const API_URL = 'http://localhost:8085/api';

export const fetchRekening = () => axios.get(`${API_URL}/rekening`);
export const fetchTransaksi = () => axios.get(`${API_URL}/transaksi`);
export const createRekening = (rekening) => axios.post(`${API_URL}/rekening`, rekening);
export const createTransaksi = (transaksi) => axios.post(`${API_URL}/transaksi`, transaksi);
export const updateRekening = (id, rekening) => axios.put(`${API_URL}/rekening/${id}`, rekening);
export const getRekeningById = (id, rekening) => axios.get(`${API_URL}/rekening/${id}`, rekening);
export const updateTransaksi = (id, transaksi) => axios.put(`${API_URL}/transaksi/${id}`, transaksi);
export const deleteRekening = (id) => axios.delete(`${API_URL}/rekening/${id}`);
export const deleteTransaksi = (id) => axios.delete(`${API_URL}/transaksi/${id}`);