import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, incrementItem, decrementItem } = useShop();
  const { isAuthenticated, openLogin } = useAuth();
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, ci) => sum + ci.price * ci.quantity, 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      openLogin('/checkout');
      return;
    }
    navigate('/checkout');
  };

  return (
    <section className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="cart-info">
                  <h3>{item.name}</h3>
                  <div className="qty-row">
                    <button className="qty-btn" aria-label="Decrease" onClick={() => decrementItem(item.id)}>-</button>
                    <span className="qty">{item.quantity}</span>
                    <button className="qty-btn" aria-label="Increase" onClick={() => incrementItem(item.id)}>+</button>
                  </div>
                  <p className="line-total">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-footer">
            <div className="cart-total">Total: ${total.toFixed(2)}</div>
            <div className="cart-actions">
              <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
              <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
