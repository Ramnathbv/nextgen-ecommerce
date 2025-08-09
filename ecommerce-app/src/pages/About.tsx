import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <section className="about">
      <header className="about-header">
        <h1>About Our Products</h1>
        <p>
          We design everyday apparel that blends comfort, durability, and modern style. From
          breathable tees to durable denim and cozy kidswear, every item is thoughtfully crafted
          to fit your day-to-day life.
        </p>
      </header>

      <section className="about-grid">
        <article className="about-card">
          <h2>Crafted For Everyone</h2>
          <ul>
            <li><strong>Men:</strong> Classic fits, premium cotton tees, denim jackets, and everyday essentials.</li>
            <li><strong>Women:</strong> Elevated basics, flowy dresses, soft cardigans, and flattering silhouettes.</li>
            <li><strong>Kids:</strong> Soft, durable, and play-ready hoodies, joggers, and tees.</li>
            <li><strong>Newly Added:</strong> Fresh drops every week featuring seasonal colors and fabrics.</li>
          </ul>
        </article>

        <article className="about-card">
          <h2>Quality & Materials</h2>
          <ul>
            <li>Premium cotton and cotton blends for breathability and softness.</li>
            <li>Pre-shrunk fabrics to maintain shape wash after wash.</li>
            <li>Reinforced stitching in high‑stress areas for lasting wear.</li>
            <li>Low-impact dyes for richer color with reduced fading.</li>
          </ul>
        </article>

        <article className="about-card">
          <h2>Fit & Sizing</h2>
          <ul>
            <li>True-to-size fits designed for everyday comfort.</li>
            <li>Size range covers most body types; detailed size charts on each product.</li>
            <li>Modern silhouettes with room to move without looking boxy.</li>
          </ul>
        </article>

        <article className="about-card">
          <h2>Sustainability</h2>
          <ul>
            <li>Responsible sourcing from vetted mills and partners.</li>
            <li>Packaging made with recycled materials where possible.</li>
            <li>Continuous improvements to lower water and energy usage.</li>
          </ul>
        </article>

        <article className="about-card">
          <h2>Care & Longevity</h2>
          <ul>
            <li>Machine wash cold, tumble dry low to preserve softness and shape.</li>
            <li>Color-care tips provided on product pages to reduce fading.</li>
            <li>Simple, durable construction that’s easy to maintain.</li>
          </ul>
        </article>

        <article className="about-card">
          <h2>Shipping & Returns</h2>
          <ul>
            <li>Fast shipping across regions with real-time tracking.</li>
            <li>Hassle-free returns within 30 days on unworn items.</li>
            <li>Responsive support to make exchanges simple.</li>
          </ul>
        </article>
      </section>

      <footer className="about-cta">
        <Link to="/products" className="shop-link">Browse Products</Link>
      </footer>
    </section>
  );
};

export default About;