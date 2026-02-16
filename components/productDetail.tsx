import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../App';
import { products } from './ProductList';
import { ArrowLeft } from 'lucide-react';
import styles from '../styles/components/productDetail.module.css';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [canScrollProductInfo, setCanScrollProductInfo] = useState(false);

  const product = products.find(p => p.id === productId);

  // Handle image section scroll to enable/disable product info scroll
  React.useEffect(() => {
    const imageSection = document.querySelector('[data-image-section]') as HTMLElement;
    const productInfo = document.querySelector('[data-product-info]') as HTMLElement;
    
    if (!imageSection || !productInfo) return;

    const handleImageScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = imageSection;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px tolerance
      
      if (isAtBottom && !canScrollProductInfo) {
        setCanScrollProductInfo(true);
        productInfo.style.overflow = 'auto';
      } else if (!isAtBottom && canScrollProductInfo) {
        setCanScrollProductInfo(false);
        productInfo.style.overflow = 'hidden';
        productInfo.scrollTop = 0; // Reset scroll position
      }
    };

    imageSection.addEventListener('scroll', handleImageScroll);
    
    return () => {
      imageSection.removeEventListener('scroll', handleImageScroll);
    };
  }, [canScrollProductInfo]);

  // Handle ESC key for modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h1>Produkt inte hittad</h1>
        <p>Den produkt du letar efter finns inte.</p>
        <Link to="/shop" className={styles.backButton}>
          <ArrowLeft size={20} />
          Back
        </Link>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Vänligen välj en storlek');
      return;
    }

    setIsAddingToCart(true);
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      size: selectedSize || undefined
    };

    addToCart(cartItem);

    // Show feedback
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/shop" className={styles.backLink}>
          &lt; back
        </Link>
      </div>

      <div className={styles.productDetail}>
        <div className={styles.imageSection} data-image-section>
          {product.images.map((image, index) => (
            <div key={index} className={styles.mainImage}>
              <img 
                src={image} 
                alt={`${product.name} ${index + 1}`}
                className={styles.productImage}
                onClick={() => {
                  setSelectedImageIndex(index);
                  setIsModalOpen(true);
                }}
              />
            </div>
          ))}
        </div>

        <div className={styles.productInfo} data-product-info>
          <h1 className={styles.productTitle}>{product.name}</h1>

          <div className={styles.productPrice}>
            {product.price.toLocaleString('sv-SE')} SEK
          </div>

          <div className={styles.productDescription}>
            <p>{product.description}</p>
          </div>

          {product.sizes && product.sizes.length > 0 && (
            <div className={styles.sizeSelector}>
              <h3>Storlek</h3>
              <div className={styles.sizeOptions}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`${styles.sizeOption} ${selectedSize === size ? styles.selectedSize : ''}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.quantitySelector}>
            <div className={styles.quantityControls}>
              <button onClick={decrementQuantity} className={styles.quantityButton}>-</button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button onClick={incrementQuantity} className={styles.quantityButton}>+</button>
            </div>
          </div>

          <div className={styles.addToCartSection}>
            <button 
              onClick={handleAddToCart}
              className={`${styles.addToCartButton} ${isAddingToCart ? styles.adding : ''}`}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? 'ADDING ITEM...' : 'ADD TO CART'}
            </button>
          </div>

          <div className={styles.productDetailsDropdown}>
            <button 
              className={styles.dropdownHeader}
              onClick={() => setIsProductDetailsOpen(!isProductDetailsOpen)}
            >
              Product Detail
              <span>{isProductDetailsOpen ? '−' : '+'}</span>
            </button>
            <div className={`${styles.dropdownContent} ${isProductDetailsOpen ? styles.open : styles.closed}`}>
              <ul>
                <li>- Produced in Japan</li>
                <li>- Developed in Stockholm</li>
                <li>- Natural ingredients</li>
                <li>- Free from artificial additives</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className={styles.imageModal} onClick={() => setIsModalOpen(false)}>
          <button 
            className={styles.modalClose}
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
          >
            ×
          </button>
          <img 
            src={product.images[selectedImageIndex]} 
            alt={product.name}
            className={styles.modalImage}
            onClick={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;