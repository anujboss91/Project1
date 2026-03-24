import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

const plantsData = [
  {
    id: 1, name: "Monstera", category: "Tropical",
    price: 25, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=200",
    description: "Iconic split leaves tropical plant."
  },
  {
    id: 2, name: "Bird of Paradise", category: "Tropical",
    price: 45, image: "https://images.unsplash.com/photo-1591958911259-bee2173bdccc?w=200",
    description: "Bold tropical statement plant."
  },
  {
    id: 3, name: "Pothos", category: "Tropical",
    price: 12, image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=200",
    description: "Trailing vine, nearly indestructible."
  },
  {
    id: 4, name: "Peace Lily", category: "Tropical",
    price: 18, image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=200",
    description: "Elegant white blooms, air purifier."
  },
  {
    id: 5, name: "Philodendron", category: "Tropical",
    price: 20, image: "https://images.unsplash.com/photo-1611211232932-da3113c5b960?w=200",
    description: "Heart-leaf beauty for any shelf."
  },
  {
    id: 6, name: "ZZ Plant", category: "Tropical",
    price: 22, image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=200",
    description: "Glossy leaves, thrives in low light."
  },
  {
    id: 7, name: "Aloe Vera", category: "Succulents",
    price: 10, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=200",
    description: "Soothing gel plant, sun lover."
  },
  {
    id: 8, name: "Echeveria", category: "Succulents",
    price: 8, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200",
    description: "Rosette-shaped pastel beauty."
  },
  {
    id: 9, name: "Jade Plant", category: "Succulents",
    price: 15, image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=200",
    description: "Lucky plant, easy to grow."
  },
  {
    id: 10, name: "Haworthia", category: "Succulents",
    price: 9, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200",
    description: "Zebra-striped compact succulent."
  },
  {
    id: 11, name: "Cactus", category: "Succulents",
    price: 7, image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=200",
    description: "Desert charm in a tiny pot."
  },
  {
    id: 12, name: "Sedum", category: "Succulents",
    price: 8, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200",
    description: "Stonelike rosettes, super hardy."
  },
  {
    id: 13, name: "Tillandsia", category: "Air Plants",
    price: 14, image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=200",
    description: "No soil needed, just mist it."
  },
  {
    id: 14, name: "Spanish Moss", category: "Air Plants",
    price: 11, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200",
    description: "Dreamy hanging silver-green strands."
  },
  {
    id: 15, name: "Air Plant Ball", category: "Air Plants",
    price: 16, image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=200",
    description: "Sphere of Tillandsia, zero fuss."
  },
  {
    id: 16, name: "Ionantha", category: "Air Plants",
    price: 12, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200",
    description: "Blushes pink when blooming."
  },
  {
    id: 17, name: "Bulbosa", category: "Air Plants",
    price: 13, image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=200",
    description: "Bulbous base with curly leaves."
  },
  {
    id: 18, name: "Xerographica", category: "Air Plants",
    price: 19, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200",
    description: "Queen of air plants, wide silvery curl."
  },
];

const categories = ["Tropical", "Succulents", "Air Plants"];

function Navbar({ onHomeClick, onCartClick, onPlantsClick }) {
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={onHomeClick}>
        🌿 Paradise Nursery
      </div>
      <div className="nav-links">
        <span className="nav-link" onClick={onHomeClick}>Home</span>
        <span className="nav-link" onClick={onPlantsClick}>Plants</span>
        <span className="nav-link cart-icon" onClick={onCartClick}>
          🛒 Cart
          <span className="cart-badge">{totalQuantity}</span>
        </span>
      </div>
    </nav>
  );
}

function ProductList({ onHomeClick, onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      <Navbar
        onHomeClick={onHomeClick}
        onCartClick={onCartClick}
        onPlantsClick={() => {}}
      />

      <div className="product-list-container">
        <h2 className="page-title">🌱 Our Plants</h2>

        {categories.map(category => (
          <div key={category} className="category-section">
            <h3 className="category-heading">{category}</h3>

            <div className="plants-grid">
              {plantsData
                .filter(plant => plant.category === category)
                .map(plant => (
                  <div key={plant.id} className="plant-card">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="plant-image"
                    />

                    <h4 className="plant-name">{plant.name}</h4>

                    <p className="plant-price">${plant.price}.00</p>

                    <button
                      className={`add-to-cart-btn ${addedToCart[plant.name] ? 'added' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? '✓ Added to Cart' : 'Add to Cart'}
                    </button>

                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
export { Navbar };