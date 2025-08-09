import type { Product } from '../common/interfaces/product';
import { CATEGORIES, SAMPLE_PRODUCTS } from '../data/products';
import './Products.css';

const Products = () => {
  return (
    <section className="products">
      <div className="products-header">
        <h2 className="products-title">All Products</h2>
        <p className="products-subtitle">Explore our full collection</p>
      </div>

      <div className="category-row" aria-label="Product categories">
        {CATEGORIES.map(category => (
          <span key={category} className="category-chip">{category}</span>
        ))}
      </div>

      <div className="product-grid">
        {SAMPLE_PRODUCTS.map((product: Product) => (
          <article key={product.id} className="product-card">
            <div className="product-media">
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
              <h3 className="product-name">{product.name}</h3>
              <div className="product-meta">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button className="add-btn" aria-label={`Add ${product.name} to cart`}>
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Products;
