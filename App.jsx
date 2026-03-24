import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [page, setPage] = useState('landing');
  const [cart, setCart] = useState([]);

  const addToCart = (plant) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === plant.id);
      if (exists) return prev;
      return [...prev, { ...plant, quantity: 1 }];
    });
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div>
      {page !== 'landing' && (
        <nav className="navbar">
          <span className="nav-brand" onClick={() => setPage('landing')}>🌿 Paradise Nursery</span>
          <div className="nav-links">
            <span onClick={() => setPage('landing')}>Home</span>
            <span onClick={() => setPage('plants')}>Plants</span>
            <span onClick={() => setPage('cart')}>
              🛒 Cart <strong>({totalItems})</strong>
            </span>
          </div>
        </nav>
      )}

      {page === 'landing' && (
        <div className="landing-page">
          <div className="landing-overlay">
            <h1>Welcome to Paradise Nursery</h1>
            <p>Bring nature indoors. Handpicked plants delivered to your door.</p>
            <button
              className="get-started-btn"
              onClick={() => setPage('plants')}
            >
              Get Started 🌱
            </button>
          </div>
        </div>
      )}

      {page === 'plants' && (
        <ProductList cart={cart} addToCart={addToCart} />
      )}

      {page === 'cart' && (
        <CartItem
          cart={cart}
          setCart={setCart}
          setPage={setPage}
        />
      )}
    </div>
  );
}

export default App;