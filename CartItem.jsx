import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import { Navbar } from './ProductList';
import './CartItem.css';

function CartItem({ onContinueShopping, onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const [showCheckoutMsg, setShowCheckoutMsg] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleCheckout = () => {
    setShowCheckoutMsg(true);
  };

  return (
    <div>
      <Navbar
        onHomeClick={onHomeClick}
        onCartClick={() => {}}
        onPlantsClick={onContinueShopping}
      />

      <div className="cart-container">
        <h2 className="cart-title">🛒 Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty!</p>
            <button
              className="continue-shopping-btn"
              onClick={onContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-info">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-unit-price">
                    Unit Price: ${item.price}.00
                  </p>

                  <p className="cart-item-total">
                    Total: ${item.price * item.quantity}.00
                  </p>
                </div>

                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>

              </div>
            ))}

            <div className="cart-total">
              <h3>Total Cart Amount: ${totalAmount}.00</h3>
            </div>

            <div className="cart-actions">
              <button
                className="continue-shopping-btn"
                onClick={onContinueShopping}
              >
                ← Continue Shopping
              </button>

              <button
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Checkout
              </button>

            </div>

            {showCheckoutMsg && (
              <div className="coming-soon-msg">
                🚧 Coming Soon! Checkout feature is under development.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;