import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, Package, Shield, Zap, Heart } from 'lucide-react';

// Mock data
const featuredProducts = [
  { id: 1, name: 'AMD Ryzen 9 7950X 4.5 GHz', category: 'Procesadores', price: 599, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=300&fit=crop', badge: '14% off' },
  { id: 2, name: 'AMD Ryzen 9 7950X 4.5 GHz', category: 'Procesadores', price: 599, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=300&fit=crop', badge: 'Nuevo' },
  { id: 3, name: 'AMD Ryzen 9 7950X 4.5 GHz', category: 'Procesadores', price: 599, image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&h=300&fit=crop', badge: 'Nuevo' }
];

const specialOffers = [
  { id: 4, name: 'NVIDIA RTX 4080 16GB', category: 'Tarjetas gráficas', price: 1299, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300&h=300&fit=crop', badge: 'Nuevo' },
  { id: 5, name: 'NVIDIA RTX 4080 16GB', category: 'Tarjetas gráficas', price: 1299, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300&h=300&fit=crop', badge: 'Nuevo' },
  { id: 6, name: 'NVIDIA RTX 4080 16GB', category: 'Tarjetas gráficas', price: 1299, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300&h=300&fit=crop', badge: 'Nuevo' }
];

function App() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header cartCount={cartCount} />
      <HomePage addToCart={addToCart} />
    </div>
  );
}

// Header Component
function Header({ cartCount }) {
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <div className="logo-icon">
              <Package />
            </div>
            <span className="logo-text">Tech Universe</span>
          </div>

          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Buscar artículo..."
            />
          </div>

          <div className="header-actions">
            <button className="header-button">
              <User />
            </button>
            <button className="header-button relative">
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="header">
        <div className="header-container" style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}>
          <button className="header-button text-sm text-slate-300 hover:text-white transition flex items-center gap-2">
            <Menu className="w-4 h-4" />
            Categorías
          </button>
        </div>
      </div>
    </>
  );
}

// Home Page
function HomePage({ addToCart }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="grid-two-columns">
            <div>
              <span className="hero-badge">
                ⚡ Últimos productos disponibles
              </span>
              <h1 className="hero-title">
                Potencia tu <span className="gradient-text">experiencia gaming</span>
              </h1>
              <p className="hero-description">
                Los mejores componentes y periféricos gaming al mejor precio. Envío gratis en pedidos superiores a 50€.
              </p>
              <div className="flex gap-4">
                <button className="button-primary">Ver ofertas</button>
                <button className="button-secondary">Explorar Categorías</button>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=800&h=600&fit=crop"
                alt="Gaming Setup"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <Package />
              </div>
              <div>
                <h3 className="feature-title">Envío gratis</h3>
                <p className="feature-description">En pedidos +50€</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Shield />
              </div>
              <div>
                <h3 className="feature-title">Garantía Extendida</h3>
                <p className="feature-description">Hasta 3 años</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Zap />
              </div>
              <div>
                <h3 className="feature-title">Entrega Rápida</h3>
                <p className="feature-description">Hasta 3 días</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8">
            <h2 className="section-title">Productos Destacados</h2>
            <p className="section-subtitle">Últimos en tecnología gaming</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="features-section py-16">
        <div className="container">
          <div className="mb-8">
            <h2 className="section-title">Ofertas Especiales</h2>
            <p className="section-subtitle">Aprovecha los mejores descuentos</p>
          </div>
          <div className="products-grid">
            {specialOffers.map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center" style={{ maxWidth: '64rem' }}>
          <h2 className="cta-title">¿Necesitas ayuda para elegir?</h2>
          <p className="cta-description">
            Nuestro equipo de expertos está aquí para ayudarte a encontrar los componentes perfectos para tu setup.
          </p>
          <button className="cta-button">Contacta con expertos</button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
// Product Card Component
function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        <button className="favorite-button">
          <Heart className="w-5 h-5" />
        </button>
        <span className="badge">{product.badge}</span>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <button onClick={addToCart} className="add-to-cart">
          <ShoppingCart className="w-4 h-4" />
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}


// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-title">TechStore</h3>
            <p className="footer-text">
              Tu tienda de confianza para componentes gaming y tecnología de última generación.
            </p>
          </div>

          <div>
            <h3 className="footer-title">Categorías</h3>
            <ul className="footer-list">
              <li><a href="#">Procesadores</a></li>
              <li><a href="#">Tarjetas Gráficas</a></li>
              <li><a href="#">Memorias RAM</a></li>
              <li><a href="#">Almacenamiento</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Información</h3>
            <ul className="footer-list">
              <li><a href="#">Sobre nosotros</a></li>
              <li><a href="#">Términos y condiciones</a></li>
              <li><a href="#">Envíos</a></li>
              <li><a href="#">Devoluciones</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Legal</h3>
            <ul className="footer-list">
              <li><a href="#">Política de privacidad</a></li>
              <li><a href="#">Términos y condiciones</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 TechStore. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}


export default App;