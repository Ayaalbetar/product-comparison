import  { useContext, useEffect, useState } from 'react';
import { ComparisonContext } from '../context/ComparisonContext';
import './styles.css';
import { useNavigate } from 'react-router-dom';
function ComparisonPage() {
  const { selectedProducts } = useContext(ComparisonContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        const selected = data.filter(p => selectedProducts.includes(p.id));
        setProducts(
          selected.map(product => ({
            id: product.id,
            name: product.title,
            brand: product.category,
            price: product.price,
            rating: product.rating?.rate || 0,
            image: product.image
          }))
        );
      })
      .catch(err => console.error('Failed to fetch products:', err));
  }, [selectedProducts]);

  const fields = ['name', 'brand', 'price', 'rating',];

  const getBest = (field) => {
    if (field === 'price') {
      const min = Math.min(...products.map(p => p[field]));
      return p => p[field] === min;
    }

    return () => false;
  };

  return (
    <div className="container">
      <h2>Comparison Table</h2>
        <button className="compare-button" onClick={() => navigate('/')}>Go to Home</button>
      {products.length === 0 ? (
        <p>No products selected for comparison.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              {products.map(p => <th key={p.id}>{p.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {fields.map(field => (
              <tr key={field}>
                <td>{field}</td>
                {products.map(p => (
                  <td key={p.id} style={{ backgroundColor: getBest(field)(p) ? 'green' : 'transparent' }}>
                    {p[field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ComparisonPage;
