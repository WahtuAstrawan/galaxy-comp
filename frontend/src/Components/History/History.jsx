import React from 'react'
import './History.css'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink } from 'reactstrap';


const History = () => {
  // Data histori transaksi (contoh data, Anda dapat menggantinya dengan data yang sesuai)
  const transactionHistory = [
    {
      id: 1,
      productName: 'Laptop',
      category: 'Electronics',
      price: 800,
      promotion: 'Back to School Sale',
      moneySubmitted: 900,
      date: '2023-10-25',
    },
    {
      id: 2,
      productName: 'Smartphone',
      category: 'Electronics',
      price: 500,
      promotion: 'Mid-Year Discount',
      moneySubmitted: 550,
      date: '2023-10-24',
    },
    // Tambahkan data transaksi lainnya sesuai kebutuhan
  ];

  return (
    <div>
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>ID Produk</th>
            <th>Nama Produk</th>
            <th>Kategori</th>
            <th>Harga Produk</th>
            <th>Promosi</th>
            <th>Uang yang Disetorkan</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {transactionHistory.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.productName}</td>
              <td>{transaction.category}</td>
              <td>${transaction.price}</td>
              <td>{transaction.promotion}</td>
              <td>${transaction.moneySubmitted}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      

      <div className="pagination-section2" color='info' style={{borderBottom: "none"}}>
        <Pagination style={{ justifyContent: "center", margin: "20px 0", borderBottom:"none" }}>
          <PaginationItem style={{borderBottom: "none"}}>
            <PaginationLink first href="#">
              First
            </PaginationLink>
          </PaginationItem>
          <PaginationItem style={{borderBottom: "none"}}>
            <PaginationLink previous href="#">
              Previous
            </PaginationLink>
          </PaginationItem>

          <PaginationItem style={{borderBottom: "none"}}> 
            <PaginationLink next href="#">
              Next
            </PaginationLink>
          </PaginationItem>
          <PaginationItem style={{borderBottom: "none"}}>
            <PaginationLink last href="#">
              Last
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    </div>
  );
};

export default History;
