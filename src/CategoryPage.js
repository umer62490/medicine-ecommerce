import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from './redux/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const CategoryPage = ({ products }) => {
  const [quantities, setQuantities] = useState({});
  const { categoryName } = useParams();
 
  const dispatch = useDispatch();

 

  const cartItems = useSelector((state) => state.cart.items);
  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );


  const handleIncrement = (name) => {
    setQuantities((prev) => ({
      ...prev,
      [name]: (prev[name] || 1) + 1,
    }));
  };

  const handleDecrement = (name) => {
    setQuantities((prev) => ({
      ...prev,
      [name]: prev[name] > 1 ? prev[name] - 1 : 1,
    }));
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.name] || 1;
    dispatch(addToCart({ product, quantity: qty }));
    toast.success(`${product.name} added to cart (${qty})`);
  };


  return (
    <div className="category-page">
    <h2 className="category-title">{categoryName} Products</h2>

    {filteredProducts.length === 0 ? (
      <p className="no-products">No products in this category.</p>
    ) : (
      <div className="product_card__container">
        {filteredProducts.map((prod, idx) => (
          <article className="card__article" key={idx}>
            <img src={prod.image} alt={prod.name} className="card__img" />
            <div className="card__data">
              <h3>{prod.name}</h3>
              <p>{prod.description}</p>
              <p>Rs. {prod.price}</p>

              <div className="quantity-controls">
                <button onClick={() => handleDecrement(prod.name)}>-</button>
                <span>{quantities[prod.name] || 1}</span>
                <button onClick={() => handleIncrement(prod.name)}>+</button>
              </div>

              <button className="card__button" onClick={() => handleAddToCart(prod)}>
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    )}
  </div>
  );
};

export default CategoryPage;
