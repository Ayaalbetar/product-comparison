import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ComparisonContext } from '../context/ComparisonContext';
import { useContext } from 'react';
import './styles.css';

function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedProducts, setSelectedProducts } = useContext(ComparisonContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct({
          id: data.id,
          name: data.title,
          brand: data.category,
          price: data.price,
          rating: data.rating?.rate || 0,
          image: data.image,
          description: data.description
        });
      });
  }, [id]);

  const toggleCompare = () => {
    if (selectedProducts.includes(product.id)) return;
    setSelectedProducts([...selectedProducts, product.id]);
  };

  if (!product) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <button className="compare-button" onClick={() => navigate(-1)}> Back</button>
      <div className="details">
        <img src={product.image} alt={product.name} style={{ maxWidth: '200px' }} />
        <div>
          <h2>{product.name}</h2>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Rating:</strong> {product.rating}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <button onClick={toggleCompare}>Add to Compare</button>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
