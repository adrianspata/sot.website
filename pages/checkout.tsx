import React from 'react';
import { useCart } from '../App';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/checkout.module.css';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 100; // Fixed shipping cost
  const tax = Math.round(subtotal * 0.25); // 25% VAT
  const total = subtotal + shipping + tax;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the order submission
    alert('Tack för din beställning!');
    clearCart();
    window.location.href = '/';
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCheckout}>
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/shop" className={styles.continueShopping}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutContent}>
        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          
          <div className={styles.orderItems}>
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className={styles.orderItem}>
                <img src={item.image} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                  {item.size && <p className={styles.itemSize}>Storlek: {item.size}</p>}
                  <div className={styles.itemQuantity}>Antal: {item.quantity}</div>
                </div>
                <div className={styles.itemPrice}>
                  {(item.price * item.quantity).toLocaleString('sv-SE')} SEK
                </div>
              </div>
            ))}
          </div>

          <div className={styles.orderTotals}>
            <div className={styles.totalRow}>
              <span>Delsumma:</span>
              <span>{subtotal.toLocaleString('sv-SE')} SEK</span>
            </div>
            <div className={styles.totalRow}>
              <span>Frakt:</span>
              <span>{shipping.toLocaleString('sv-SE')} SEK</span>
            </div>
            <div className={styles.totalRow}>
              <span>Moms (25%):</span>
              <span>{tax.toLocaleString('sv-SE')} SEK</span>
            </div>
            <div className={`${styles.totalRow} ${styles.finalTotal}`}>
              <span>Totalt:</span>
              <span>{total.toLocaleString('sv-SE')} SEK</span>
            </div>
          </div>
        </div>

        <div className={styles.checkoutForm}>
          <h2>Leveransadress</h2>
          
          <form onSubmit={handleSubmitOrder}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">Förnamn *</label>
              <input type="text" id="firstName" name="firstName" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lastName">Efternamn *</label>
              <input type="text" id="lastName" name="lastName" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">E-post *</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Telefonnummer *</label>
              <input type="tel" id="phone" name="phone" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Adress *</label>
              <input type="text" id="address" name="address" required />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="postalCode">Postnummer *</label>
                <input type="text" id="postalCode" name="postalCode" required />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="city">Stad *</label>
                <input type="text" id="city" name="city" required />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="country">Land *</label>
              <select id="country" name="country" required>
                <option value="SE">Sverige</option>
                <option value="NO">Norge</option>
                <option value="DK">Danmark</option>
                <option value="FI">Finland</option>
              </select>
            </div>

            <div className={styles.paymentSection}>
              <h3>Betalning</h3>
              <div className={styles.paymentOptions}>
                <label className={styles.paymentOption}>
                  <input type="radio" name="payment" value="klarna" defaultChecked />
                  <span>Klarna</span>
                </label>
                <label className={styles.paymentOption}>
                  <input type="radio" name="payment" value="swish" />
                  <span>Swish</span>
                </label>
                <label className={styles.paymentOption}>
                  <input type="radio" name="payment" value="card" />
                  <span>Kort</span>
                </label>
              </div>
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkbox}>
                <input type="checkbox" required />
                <span>Jag godkänner <Link to="/terms">användarvillkoren</Link> *</span>
              </label>
            </div>

            <button type="submit" className={styles.placeOrderButton}>
              Lägg beställning - {total.toLocaleString('sv-SE')} SEK
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}