import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AdminDashboard from './AdminDashboard';
import CategoryPage from './CategoryPage';
import { ToastContainer } from 'react-toastify';


function App() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (indexToDelete) => {
    setProducts(products.filter((_, i) => i !== indexToDelete));
  };

  const handleUpdateProduct = (indexToUpdate, updatedProduct) => {
    const updatedList = [...products];
    updatedList[indexToUpdate] = updatedProduct;
    setProducts(updatedList);
  };
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <AdminDashboard
              products={products}
              onAdd={handleAddProduct}
              onDelete={handleDeleteProduct}
              onUpdate={handleUpdateProduct}
            />
          }
        />
        <Route
          path="/category/:categoryName"
          element={<CategoryPage products={products} />}
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}

export default App;
