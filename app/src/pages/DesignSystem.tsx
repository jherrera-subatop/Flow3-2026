import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { specContent, componentOrder, componentCategories } from '../data/specContent';
import ErrorBoundary from './ErrorBoundary';
import './DesignSystem.css';

const ComponentDemos = lazy(() => import('./ComponentDemos'));

function DemoFallback() {
  return (
    <div className="dsCanvasFallback">
      Para ver la plantilla, ejecuta en la raíz: <code>npm install</code>
    </div>
  );
}

function NavButton({
  active,
  onClick,
  children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      className={`dsNavLink ${active ? 'dsNavLinkActive' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function DesignSystem() {
  const [selectedId, setSelectedId] = useState<string>(() => {
    const hash = window.location.hash.slice(1);
    if (hash === 'overview' || hash === 'intro') return hash;
    return hash && specContent[hash] ? hash : 'overview';
  });
  const [docsOpen, setDocsOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'overview' || hash === 'intro') setSelectedId(hash);
      else if (hash && specContent[hash]) setSelectedId(hash);
      else if (!hash) setSelectedId('overview');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    window.location.hash = selectedId;
  }, [selectedId]);

  const spec = selectedId !== 'overview' && selectedId !== 'intro' ? specContent[selectedId] : null;

  return (
    <div className="dsRoot">
      <aside className="dsSidebar">
        <div className="dsLogo">FLOW³</div>
        <div className="dsLogoSub">UI Kit · Plantillas</div>
        <nav className="dsNav">
          <div className="dsNavTitle">Vistas</div>
          <NavButton active={selectedId === 'overview'} onClick={() => setSelectedId('overview')}>
            📋 Todas las plantillas
          </NavButton>
          <NavButton active={selectedId === 'intro'} onClick={() => setSelectedId('intro')}>
            Introducción
          </NavButton>
          <div className="dsNavTitle" style={{ marginTop: 'var(--flow-space-lg)' }}>
            Por Kit
          </div>
          {componentCategories.map((cat) => (
            <div key={cat.title} className="dsNavCategory">
              <div className="dsNavCategoryTitle">{cat.title}</div>
              {(cat.ids as string[]).map((id) => (
                <NavButton
                  key={id}
                  active={selectedId === id}
                  onClick={() => setSelectedId(id)}
                >
                  {specContent[id].name}
                </NavButton>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <main className="dsMain">
        <a href="/" className="dsBackLink">
          ← Volver a VMC Subastas
        </a>

        {/* Overview: grid de todas las plantillas */}
        {selectedId === 'overview' && (
          <div className="dsOverview">
            <h1 className="dsOverviewTitle">Plantillas de componentes</h1>
            <p className="dsOverviewLead">
              Cada bloque es la plantilla completa del componente. Haz clic en el menú para ver uno a tamaño real y su documentación.
            </p>
            <div className="dsOverviewGrid">
              {componentOrder.map((id) => (
                <div key={id} className="dsTemplateCard">
                  <div className="dsTemplateCardLabel">{specContent[id].name}</div>
                  <div className="dsTemplateCardFrame">
                    <ErrorBoundary fallback={<DemoFallback />}>
                      <Suspense fallback={<div className="dsCanvasFallback">Cargando…</div>}>
                        <ComponentDemos selectedId={id} />
                      </Suspense>
                    </ErrorBoundary>
                  </div>
                  <button
                    type="button"
                    className="dsTemplateCardGo"
                    onClick={() => setSelectedId(id)}
                  >
                    Ver plantilla →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedId === 'intro' && (
          <div className="dsIntro">
            <h1>FLOW³ UI Kit</h1>
            <p>
              Sistema de diseño basado en la proporción áurea (φ) y la secuencia de Fibonacci.
              Cada componente es una <strong>plantilla</strong> con dimensiones de los Kits (α, β, γ, δ, ε).
            </p>
            <p>
              Usa <strong>Todas las plantillas</strong> para ver el catálogo completo, o elige un componente en el menú para verlo a tamaño real y su documentación.
            </p>
          </div>
        )}

        {/* Vista componente: Canvas (plantilla) + Documentación */}
        {spec && (
          <div className="dsComponentView">
            <div className="dsCanvasWrap">
              <div className="dsCanvasLabel">
                <span className="dsCanvasName">{spec.name}</span>
                <span className="dsKitBadge">Kit {spec.kit}</span>
                {spec.dimensions && <span className="dsDimensions">{spec.dimensions}</span>}
              </div>
              <div className="dsCanvas">
                <ErrorBoundary fallback={<DemoFallback />}>
                  <Suspense fallback={<div className="dsCanvasFallback">Cargando plantilla…</div>}>
                    <ComponentDemos selectedId={selectedId} />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </div>

            <div className="dsDocsSection">
              <button
                type="button"
                className="dsDocsToggle"
                onClick={() => setDocsOpen((o) => !o)}
                aria-expanded={docsOpen}
              >
                {docsOpen ? '▼' : '▶'} Documentación
              </button>
              {docsOpen && (
                <div className="dsSection">
                  <div className="dsSpecBlock">
                    <h3 className="dsSpecTitle">Cuándo usarlo</h3>
                    <ul className="dsSpecList">
                      {spec.whenToUse.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="dsSpecBlock">
                    <h3 className="dsSpecTitle">Cuándo no usarlo</h3>
                    <ul className="dsSpecList">
                      {spec.whenNotToUse.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="dsSpecBlock">
                    <h3 className="dsSpecTitle">Cómo usarlo</h3>
                    <p className="dsSpecParagraph">{spec.howToUse}</p>
                  </div>
                  <div className="dsSpecBlock">
                    <h3 className="dsSpecTitle">Código</h3>
                    <pre className="dsCodeBlock">{spec.codeExample}</pre>
                  </div>
                  <div className="dsSpecBlock">
                    <h3 className="dsSpecTitle">Tokens FLOW³</h3>
                    <div className="dsTableWrap">
                      <table className="dsTable">
                        <thead>
                          <tr>
                            <th>Uso</th>
                            <th>Token</th>
                          </tr>
                        </thead>
                        <tbody>
                          {spec.tokens.map((t) => (
                            <tr key={t.use}>
                              <td>{t.use}</td>
                              <td><code>{t.token}</code></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="dsSpecBlock">
                    <h3 className="dsSpecTitle">Props</h3>
                    <div className="dsTableWrap">
                      <table className="dsTable">
                        <thead>
                          <tr>
                            <th>Prop</th>
                            <th>Tipo</th>
                            <th>Default</th>
                            <th>Descripción</th>
                          </tr>
                        </thead>
                        <tbody>
                          {spec.props.map((p) => (
                            <tr key={p.prop}>
                              <td><code>{p.prop}</code></td>
                              <td><code>{p.type}</code></td>
                              <td>{p.default}</td>
                              <td>{p.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
