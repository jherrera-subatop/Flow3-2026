import { Link } from 'react-router-dom';
import './App.css';

const NAV_ITEMS = [
  { label: 'Mañana', icon: '📅' },
  { label: 'Tipo de oferta', icon: '💵' },
  { label: 'Categorías', icon: '⊞' },
  { label: 'Empresas', icon: '🏢' },
];

const ASSETS = [
  { title: 'TOYOTA HILUX', meta: '2024 • LIMA • DIESEL', price: 'US$ 17,999', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=233&h=233&fit=crop' },
  { title: 'TOYOTA ETIOS', meta: '2023 • LIMA • GASOLINA', price: 'US$ 12,500', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=233&h=233&fit=crop' },
  { title: 'NISSAN VERSA', meta: '2022 • LIMA • GASOLINA', price: 'US$ 11,200', image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=233&h=233&fit=crop' },
  { title: 'BMW X4', meta: '2024 • LIMA • DIESEL', price: 'US$ 45,000', image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=233&h=233&fit=crop' },
];

const FILTERS = ['TODOS', 'NEGOCIABLE', 'SUBASTA', 'VEHÍCULOS', 'MAQUINARIA', 'INMUEBLES'];

export default function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebarLogo">
          <span className="sidebarLogoTitle">VMC SUBASTAS</span>
          <span className="sidebarLogoSub">Powered by SUBASTOP.Co</span>
        </div>
        <nav className="sidebarNav">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href="#" className="sidebarNavItem">
              <span>{item.icon}</span>
              <span>{item.label}</span>
              <span style={{ marginLeft: 'auto' }}>→</span>
            </a>
          ))}
          <div className="sidebarSectionLabel">SOPORTE</div>
          <a href="#" className="sidebarNavItem">
            <span>?</span>
            <span>Centro de ayuda</span>
            <span style={{ marginLeft: 'auto' }}>→</span>
          </a>
        </nav>
      </aside>

      <main className="main">
        <header className="headerStrip">
          <Link to="/design-system" className="headerLinkDs">
            Design System
          </Link>
          <button type="button" className="btnIngresa">
            Ingresa <span>→</span>
          </button>
        </header>

        <div className="content">
          {/* Hero: Kit α (610×377) — auction-featured */}
          <section className="hero" aria-label="Subasta destacada">
            <img
              src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=610&h=377&fit=crop"
              alt="BMW 320i"
              className="heroImage"
            />
            <div className="heroDetails">
              <span className="heroBadge">SUBASTA EN VIVO: 26 ENERO - 3:00 P.M.</span>
              <p className="heroTitle">SERIES 3</p>
              <h2 className="heroModel">BMW 320i</h2>
              <div className="heroSpecs">
                <span>65,000 km</span>
                <span>Lima</span>
              </div>
              <div>
                <p className="heroPriceLabel">PRECIO BASE</p>
                <p className="heroPrice">$14,000 <small style={{ fontSize: 'var(--flow-text-sm)' }}>USD</small></p>
              </div>
              <button type="button" className="heroCta">
                PARTICIPAR AHORA →
              </button>
            </div>
          </section>

          {/* Filter bar: ε.2 height */}
          <div className="filterBar">
            <span className="filterLabel">Filtrar por</span>
            <div className="filterChips">
              {FILTERS.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  className={`filterChip ${i === 0 ? 'filterChipActive' : 'filterChipInactive'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Featured assets */}
          <section className="sectionHeader">
            <div>
              <div className="sectionTitleWrap">
                <span className="sectionDot" />
                <h2 className="sectionTitle">ACTIVOS DESTACADOS</h2>
              </div>
              <p className="sectionSubtitle">
                MAF PERÚ X VMC — Inventarios verificados disponibles para entrega inmediata
              </p>
            </div>
            <a href="#" className="sectionLink">
              VER TODO →
            </a>
          </section>

          {/* Cards: Kit γ (233×377) */}
          <div className="cardsGrid">
            {ASSETS.map((asset) => (
              <article key={asset.title} className="cardWrap">
                <div className="card">
                  <img src={asset.image} alt={asset.title} className="cardImage" />
                  <div className="cardBody">
                    <h3 className="cardTitle">{asset.title}</h3>
                    <p className="cardMeta">{asset.meta}</p>
                    <p className="cardOfferLabel">Oferta inicial</p>
                    <p className="cardPrice">{asset.price}</p>
                  </div>
                </div>
                <button type="button" className="cardAction" aria-label={`Ver ${asset.title}`}>
                  →
                </button>
              </article>
            ))}
          </div>

          {/* Help banner */}
          <section className="helpBanner">
            <div className="helpBannerIcon" aria-hidden>🎧</div>
            <div className="helpBannerText">
              <h3>CENTRO DE AYUDA</h3>
              <p>
                ¿Necesitas asistencia con tus ofertas o el proceso de subastas? Accede a nuestra guía
                completa para tutoriales y soporte técnico especializado.
              </p>
              <button type="button" className="helpBannerCta">
                IR AL CENTRO DE AYUDA →
              </button>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footerGrid">
            <div className="footerBrand">
              <strong>VMC SUBASTAS</strong>
              <p>Powered by SUBASTOP.Co</p>
              <p>Ecosistema digital de subastas de autos basado en comunidad y tecnología.</p>
            </div>
            <div className="footerColumn">
              <h4>PLATAFORMA</h4>
              <a href="#">SubasCars</a>
              <a href="#">SubasBlog</a>
              <a href="#">¿Quiénes somos?</a>
              <a href="#">¿Cómo vender?</a>
            </div>
            <div className="footerColumn">
              <h4>LEGAL & COMPLIANCE</h4>
              <a href="#">Condiciones y Términos</a>
              <a href="#">Política de Protección de Datos</a>
              <a href="#">Política de privacidad</a>
            </div>
            <div className="footerColumn">
              <h4>CONTACTO</h4>
              <a href="#">Contáctanos</a>
              <h4 style={{ marginTop: 'var(--flow-space-lg)' }}>ENCUÉNTRANOS EN</h4>
              <div style={{ display: 'flex', gap: 'var(--flow-space-sm)' }}>
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="Twitter">𝕏</a>
                <a href="#" aria-label="Facebook">f</a>
              </div>
            </div>
          </div>
          <div className="footerBottom">
            © 2026 VMC Subastas es una marca registrada de Subastop S.A.C. Todos los derechos
            reservados. · Política de Cookies · Mapa del Sitio · Accesibilidad
          </div>
        </footer>
      </main>
    </div>
  );
}
