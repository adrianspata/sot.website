import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus } from "lucide-react";
import { useCart } from "../App";
import styles from "../styles/components/Cart.module.css";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose
}) => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ""}`}
        onClick={onClose}
      />
      
      {/* Cart Modal */}
      <div className={`${styles.cartModal} ${isOpen ? styles.cartModalOpen : ""}`}>
        <div className={styles.cartHeader}>
          <h2 className={styles.cartTitle}>CART ({totalItems})</h2>
          <button 
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.cartContent}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <p className={styles.emptyMessage}>YOUR CART IS EMPTY</p>
            </div>
          ) : (
            <>
              <div className={styles.cartItems}>
                {cartItems.map((item) => {
                  const itemKey = item.size ? `${item.id}-${item.size}` : item.id;
                  return (
                  <div key={itemKey} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className={styles.productImage}
                      />
                    </div>
                    
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      {item.size && (
                        <p className={styles.itemSize}>Size: {item.size}</p>
                      )}
                      <p className={styles.itemPrice}>{item.price} SEK</p>
                    </div>
                    
                    <div className={styles.quantityControls}>
                      <button
                        onClick={() => {
                          const itemKey = item.size ? `${item.id}-${item.size}` : item.id;
                          if (item.quantity === 1) {
                            removeFromCart(itemKey);
                          } else {
                            updateQuantity(itemKey, item.quantity - 1);
                          }
                        }}
                        className={styles.quantityButton}
                      >
                        <Minus size={14} />
                      </button>
                      
                      <span className={styles.quantity}>{item.quantity}</span>
                      
                      <button
                        onClick={() => {
                          const itemKey = item.size ? `${item.id}-${item.size}` : item.id;
                          updateQuantity(itemKey, item.quantity + 1);
                        }}
                        className={styles.quantityButton}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  );
                })}
              </div>

              <div className={styles.cartFooter}>
                <div className={styles.total}>
                  <span className={styles.totalLabel}>TOTAL</span>
                  <span className={styles.totalPrice}>{totalPrice} SEK</span>
                </div>
                
                <div className={styles.cartActions}>
                  <button 
                    onClick={onClose}
                    className={styles.continueShoppingButton}
                  >
                    CONTINUE SHOPPING
                  </button>
                  <Link 
                    to="/checkout" 
                    className={styles.checkoutButton}
                    onClick={onClose}
                  >
                    CHECKOUT
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};