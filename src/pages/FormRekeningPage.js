import React from 'react';
import RekeningForm from '../components/RekeningForm';
import RekeningList from '../components/RekeningList';

const FormRekeningPage = () => {
  return (
    <div className='container center'>
      <h1>Form Transaksi</h1>
      <RekeningForm />
      <RekeningList />
    </div>
  );
};

export default FormRekeningPage;
