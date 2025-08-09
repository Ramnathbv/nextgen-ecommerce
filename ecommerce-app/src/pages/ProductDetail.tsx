import { Link, useNavigate, useParams } from 'react-router-dom';
import type { Product } from '../common/interfaces/product';
import { useShop } from '../context/ShopContext';
import { SAMPLE_PRODUCTS } from '../data/products';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite } = useShop();

  const product: Product | undefined = SAMPLE_PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <section className="product-detail">
        <p>Product not found.</p>
        <Link className="back-link" to="/products">Back to products</Link>
      </section>
    );
  }

  return (
    <section className="product-detail">
      <div className="detail-grid">
        <div className="detail-media">
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${product.id}/800/900`; }}
            loading="lazy"
          />
        </div>
        <div className="detail-info">
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-price">${product.price.toFixed(2)}</div>
          <div className="detail-categories">
            {product.categories.map(cat => (
              <span key={cat} className="chip">{cat}</span>
            ))}
          </div>
          <div className="detail-actions">
            <button
              className="fav-btn"
              aria-label={`Toggle favorite for ${product.name}`}
              onClick={() => toggleFavorite(product.id)}
            >
              {isFavorite(product.id) ? '❤' : '♡'}
            </button>
            <button
              className="add-btn"
              onClick={() => { addToCart(product); navigate('/cart'); }}
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </button>
          </div>
          <div className="detail-meta">
            <p>High-quality fabric with everyday comfort. Easy care and durable stitching.</p>
          </div>
          <div className="detail-nav">
            <Link className="back-link" to="/products">Back to products</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
