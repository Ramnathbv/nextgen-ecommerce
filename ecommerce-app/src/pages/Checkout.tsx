import { useState } from 'react';
import './Checkout.css';

interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const initialForm: CheckoutForm = {
  fullName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
};

const Checkout = () => {
  const [form, setForm] = useState<CheckoutForm>(initialForm);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Checkout submit', form);
    alert('Order submitted! (demo)');
  };

  return (
    <section className="checkout">
      <h2>Checkout</h2>
      <form className="checkout-form" onSubmit={onSubmit}>
        <div className="form-grid">
          <label>
            Full Name
            <input name="fullName" value={form.fullName} onChange={onChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={onChange} required />
          </label>
          <label>
            Phone
            <input name="phone" value={form.phone} onChange={onChange} />
          </label>
          <label className="span-2">
            Address Line 1
            <input name="address1" value={form.address1} onChange={onChange} required />
          </label>
          <label className="span-2">
            Address Line 2
            <input name="address2" value={form.address2} onChange={onChange} />
          </label>
          <label>
            City
            <input name="city" value={form.city} onChange={onChange} required />
          </label>
          <label>
            State/Province
            <input name="state" value={form.state} onChange={onChange} required />
          </label>
          <label>
            Postal Code
            <input name="postalCode" value={form.postalCode} onChange={onChange} required />
          </label>
          <label>
            Country
            <input name="country" value={form.country} onChange={onChange} required />
          </label>
        </div>
        <div className="checkout-actions">
          <button type="submit" className="submit-order">Submit Order</button>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
