import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/components/ProductList.module.css";

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
    id: "incense-holder-cement",
    name: "INCENSE HOLDER CEMENT",
    price: 550,
    currency: "SEK",
    image: "/images/cementHolder.webp",
    images: ["/images/cementHolder.webp", "/images/cementHolderIncense.webp", "/images/cementHolderTop.webp"],
    description: "Incense holder made from cement.",
    details: "Incense holder made from cement.",
  },
  // {
  //   id: "incense-godajf",
  //   name: "GODAJF",
  //   price: 350,
  //   currency: "SEK",
  //   image: "/images/GodajfSticks.webp",
  //   images: ["/images/GodajfSticks.webp", "/images/GodajfOpen.webp", "/images/godajfappelbildsmalllogo.webp", "/images/SOTMayaGODAJFside.webp", "/images/incensemayaimg2text.webp"],
  //   description: "Premium incense sticks with a unique blend of natural ingredients.",
  //   details: "Hand-crafted incense with carefully selected aromatics. Burn time approximately 45 minutes per stick. Contains 20 sticks.",
  // },
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