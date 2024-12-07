import React, { useEffect, useState } from "react";
import { fetchTransaksi, deleteTransaksi } from "./api";

const TransaksiList = ({ nomorRekening, onEdit }) => {
  const [transaksiList, setTransaksiList] = useState([]);

  useEffect(() => {
    const getTransaksi = async () => {
      const response = await fetchTransaksi();
      const filteredData = response.data.filter(
        (transaksi) => transaksi.nomorRekening.nomorRekening
      );
      setTransaksiList(filteredData);
    };

    getTransaksi();
  }, [nomorRekening]);

  const handleDelete = async (id) => {
    await deleteTransaksi(id);
    setTransaksiList(transaksiList.filter((transaksi) => transaksi.id !== id));
  };

  const handleEditClick = (transaksi) => {
    if (typeof onEdit === "function") {
      onEdit(transaksi);
    } else {
      console.error("onEdit bukan sebuah fungsi yang valid");
    }
  };

  return (
    <div>
      <h2>Daftar Transaksi</h2>
      <ul>
        {transaksiList.map((transaksi) => (
          <li key={transaksi.id}>
            {transaksi.jenisTransaksi} - {transaksi.jumlahTransaksi}
            <button onClick={() => handleEditClick(transaksi)}>Edit</button>
            <button onClick={() => handleDelete(transaksi.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransaksiList;
