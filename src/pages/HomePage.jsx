import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const electronics = data.filter(item => item.category === 'electronics');
        const dataFormatted = electronics.map(product => ({
          id: product.id,
          name: product.title,
          brand: product.category,
          price: product.price,
          rating: product.rating?.rate || 0,
          image: product.image
        }));
        setProducts(dataFormatted);
      })
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  return (
    <div className="container">
      <h1>Product Comparison</h1>
      <button className="compare-button" onClick={() => navigate('/compare')}>Go to Comparison</button>
      <div   style={{ marginTop: '20px' }} className="grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
