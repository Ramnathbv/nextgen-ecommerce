import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product, ProductCategory } from '../common/interfaces/product';
import { useShop } from '../context/ShopContext';
import { CATEGORIES, SAMPLE_PRODUCTS } from '../data/products';
import './Home.css';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(CATEGORIES[0]);
  const { addToCart, toggleFavorite, isFavorite } = useShop();
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((p: Product) => p.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <section className="home">
      <div className="home-header">
        <h2 className="home-title">Latest Trending</h2>
        <p className="home-subtitle">Discover the hottest picks from our cloth store</p>
      </div>

      <div className="category-row" aria-label="Product categories">
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`category-chip ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product: Product) => (
          <article key={product.id} className="product-card">
            <div
              className="product-media"
              onClick={() => navigate(`/products/${product.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/products/${product.id}`); }}
            >
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                loading="lazy" 
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${product.id}/400/480`; }}
              />
              {product.categories.includes('Newly Added') && (
                <span className="badge">New</span>
              )}
            </div>
            <div className="product-info">
              <h3
                className="product-name"
                onClick={() => navigate(`/products/${product.id}`)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/products/${product.id}`); }}
              >
                {product.name}
              </h3>
              <div className="product-meta">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <div className="product-actions">
                  <button className="fav-btn" aria-label={`Toggle favorite for ${product.name}`} onClick={() => toggleFavorite(product.id)}>
                    {isFavorite(product.id) ? '❤' : '♡'}
                  </button>
                  <button className="add-btn" aria-label={`Add ${product.name} to cart`} onClick={() => { addToCart(product); navigate('/cart'); }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Home;
