import React, { useState } from 'react';
import './Home.css';

const AdminDashboard = ({ products, onAdd, onDelete, onUpdate }) => {
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', imageFile: null
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: name === 'imageFile' ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      name: form.name,
      description: form.description,
      price: form.price,
      category: form.category,
      image: form.imageFile
        ? URL.createObjectURL(form.imageFile)
        : products[editIndex]?.image,
    };

    if (editIndex !== null) {
      onUpdate(editIndex, product); // Update product in parent state
      setEditIndex(null);
    } else {
      onAdd(product); // Add new product
    }

    setForm({
      name: '',
      description: '',
      price: '',
      category: '',
      imageFile: null,
    });
    document.querySelector('input[name="imageFile"]').value = ''; // reset file input
  };

  const handleEdit = (index) => {
    const product = products[index];
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageFile: null,
    });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(index); // Delete product from parent
    }
  };

  return (
    <div className="admin-panel-container">
      <h2>{editIndex !== null ? 'Update Product' : 'Add Product'}</h2>
      <form className="admin-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Medicine">Medicine</option>
          <option value="Creams">Creams</option>
          <option value="Personal Care">Personal Care</option>
          <option value="Powder Milk">Powder Milk</option>
          <option value="Injection">Injection</option>
        </select>
        <label className="file-upload">
          Choose Image
          <input name="imageFile" type="file" accept="image/*" onChange={handleChange} hidden />
        </label>
        {form.imageFile && <p>Selected: {form.imageFile.name}</p>}
        <button type="submit">{editIndex !== null ? 'Update Product' : 'Add Product'}</button>
      </form>

      {/* Product List */}
      <div className="admin-product-list">
        <h3>All Products</h3>
        <div className="product-cards">
          {products.map((prod, idx) => (
            <div className="product-card-admin" key={idx}>
              <img src={prod.image} alt="product" />
              <h4>{prod.name}</h4>
              <p>{prod.description}</p>
              <p>Rs. {prod.price}</p>
              <p><b>Category:</b> {prod.category}</p>
              <div className="admin-btns">
                <button onClick={() => handleEdit(idx)} className="edit">Edit</button>
                <button onClick={() => handleDelete(idx)} className="delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
