import React from 'react';
import TransaksiForm from '../components/TransaksiForm';
import TransaksiList from '../components/TransaksiList';

const FormTransaksiPage = () => {
  return (
    <div className='container center'>
      <h1>Form Transaksi</h1>
      <TransaksiForm />
      <TransaksiList />
    </div>
  );
};

export default FormTransaksiPage;
