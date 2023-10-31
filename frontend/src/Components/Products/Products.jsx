import React, { useState } from 'react';
import './Products.css';


function Products() {
  // Contoh data produk (gantilah dengan data sebenarnya)
  const products = [
    { id: 1, name: 'Produk 1', description: 'Deskripsi Produk 1' },
    { id: 2, name: 'Produk 2', description: 'Deskripsi Produk 2' },
    { id: 3, name: 'Produk 3', description: 'Deskripsi Produk 3' },
  ];

  return (
    <div>
      <h1>Daftar Produk</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <button onClick={() => handleEdit(product.id)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;