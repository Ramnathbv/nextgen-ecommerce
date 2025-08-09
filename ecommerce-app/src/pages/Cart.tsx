import { useShop } from '../context/ShopContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useShop();
  const total = cartItems.reduce((sum, ci) => sum + ci.price * ci.quantity, 0);

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
                  <p>Qty: {item.quantity}</p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-footer">
            <div className="cart-total">Total: ${total.toFixed(2)}</div>
            <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
