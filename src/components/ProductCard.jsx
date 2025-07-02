import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComparisonContext } from '../context/ComparisonContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { selectedProducts, setSelectedProducts } = useContext(ComparisonContext);

  const toggleCompare = () => {
    if (selectedProducts.includes(product.id)) return;
    const updated = [...selectedProducts, product.id];
    const unique = [...new Set(updated)];
    setSelectedProducts(unique);
    console.log('Updated :', unique);
  };

  return (
    <div className="card">
      <img src={product.image} alt={product.name} onClick={() => navigate(`/product/${product.id}`)} />
      <h3>{product.name}</h3>
      <p>{product.brand}</p>
      <p>${product.price}</p>
      <button className="compare-button" onClick={toggleCompare}>Add to Compare</button>
    </div>
  );
}

export default ProductCard;