import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string; // Main product image
  images: string[]; // Gallery images
  sizes?: string[];
  description: string;
  details: string;
}

export const products: Product[] = [
  {
    id: "incense-godajf",
    name: "GODAJF",
    price: 350,
    currency: "SEK",
    image: "/images/incensemayaimg2text.webp",
    images: ["/images/GodajfSticks.webp", "/images/GodajfOpen.webp", "/images/godajfappelbildsmalllogo.webp", "/images/SOTMayaGODAJFside.webp", "/images/incensemayaimg2text.webp"],
    description: "Premium incense sticks with a unique blend of natural ingredients.",
    details: "Hand-crafted incense with carefully selected aromatics. Burn time approximately 45 minutes per stick. Contains 20 sticks.",
  },
  {
    id: "incense-agrume",
    name: "AGRUME", 
    price: 350,
    currency: "SEK",
    image: "/images/incensemayaimg1text.webp",
    images: ["/images/AgrumeSticks.webp", "/images/AgrumeOpen.webp", "/images/SOTMayaAGRUMEside.webp", "/images/incensemayaimg1text.webp", "/images/agrumeappelbildsmalllogo.webp"],
    description: "Citrus-inspired incense for a fresh, energizing atmosphere.",
    details: "Fresh citrus blend with bergamot and orange notes. Burn time approximately 45 minutes per stick. Contains 20 sticks.",
  },
  {
    id: "incense-mastik",
    name: "MASTIK",
    price: 350, 
    currency: "SEK",
    image: "/images/goodincense4mastik.webp",
    images: ["/images/MastikSticks.webp", "/images/MastikOpen.webp", "/images/goodincense4mastik.webp", "/images/SOTMaya-MASTIKside.webp", "/images/mastikappelbild.webp", "/images/mastik-detail1.webp"],
    description: "Traditional mastik fragrance for meditation and relaxation.",
    details: "Authentic mastik resin incense. Burn time approximately 45 minutes per stick. Contains 20 sticks.",
  },
];

interface ProductListProps {
  onAddToCart?: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <Link 
          key={product.id} 
          to={`/shop/product/${product.id}`} 
          className={styles.productCard}
        >
          <div className={styles.productImageContainer}>
            <img 
              src={product.image} 
              alt={product.name}
              className={`${styles.productImage} ${styles.primaryImage}`}
            />
            {product.images && product.images.length > 1 && (
              <img 
                src={product.images[1]} 
                alt={`${product.name} hover`}
                className={`${styles.productImage} ${styles.hoverImage}`}
              />
            )}
          </div>
          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>{product.price} {product.currency}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};