import React, { useState, useEffect, Suspense, lazy } from 'react';
import { specContent, componentOrder, componentCategories } from '../data/specContent';
import ErrorBoundary from './ErrorBoundary';
import './DesignSystem.css';

const ComponentDemos = lazy(() => import('./ComponentDemos'));
const FloWButtonDemo = lazy(() => import('./FloWButtonDemo'));

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
    if (hash === 'overview' || hash === 'intro' || hash === 'shadows' || hash === 'flow-button') return hash;
    return hash && specContent[hash] ? hash : 'overview';
  });
  const [docsOpen, setDocsOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'overview' || hash === 'intro' || hash === 'shadows' || hash === 'flow-button') setSelectedId(hash);
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
          <NavButton active={selectedId === 'shadows'} onClick={() => setSelectedId('shadows')}>
            🌑 Sombras (Shadow Physics)
          </NavButton>
          <div className="dsNavTitle" style={{ marginTop: 'var(--flow-space-lg)' }}>
            FloW DS
          </div>
          <NavButton active={selectedId === 'flow-button'} onClick={() => setSelectedId('flow-button')}>
            Button (categoría base)
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

        {/* FloW DS — Button (categoría base) */}
        {selectedId === 'flow-button' && (
          <div className="dsComponentView">
            <div className="dsCanvasWrap">
              <div className="dsCanvasLabel">
                <span className="dsCanvasName">FloW DS — Button</span>
                <span className="dsKitBadge">Categoría base</span>
              </div>
              <div className="dsCanvas">
                <ErrorBoundary fallback={<div className="dsCanvasFallback">Error al cargar FloW Button.</div>}>
                  <Suspense fallback={<div className="dsCanvasFallback">Cargando…</div>}>
                    <FloWButtonDemo />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </div>
            <div className="dsDocsSection">
              <p className="dsSpecParagraph">
                Anatomía inmutable: espaciado, tipografía, radio, transición y estados (hover, active, focus-visible, disabled). 
                Tokens en <code>components.css</code> (<code>--flow-btn-*</code>). Sin variantes de color todavía.
              </p>
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

        {/* Sombras: Shadow Physics Engine */}
        {selectedId === 'shadows' && (
          <div className="dsShadows">
            <h1 className="dsShadowsTitle">Sombras (Shadow Physics Engine)</h1>
            <p className="dsShadowsLead">
              Cada elevación usa 5–6 capas (Umbra → Penumbra), pares Fibonacci para offset y blur, y <code>rgba(0,0,0,alpha)</code> para neutralidad en cualquier fondo. La <strong>interpolación tipo Linear</strong> está aplicada en todos los componentes: un nivel de sombra en reposo (sm/md/lg) y un paso más en hover, con transición suave de <code>box-shadow</code>.
            </p>
            <div className="dsShadowsGrid">
              {[
                { id: 'sm', token: '--flow-shadow-sm', label: 'Small', layers: '5 capas · (1,2)…(8,13)' },
                { id: 'md', token: '--flow-shadow-md', label: 'Medium', layers: '5 capas · (1,2)…(21,34)' },
                { id: 'lg', token: '--flow-shadow-lg', label: 'Large', layers: '6 capas · (2,3)…(34,55)' },
                { id: 'xl', token: '--flow-shadow-xl', label: 'XL', layers: '6 capas · (3,5)…(55,89)' },
                { id: '2xl', token: '--flow-shadow-2xl', label: '2XL', layers: '6 capas · (5,8)…(89,144)' },
              ].map((s) => (
                <div key={s.id} className="dsShadowCardWrap">
                  <div
                    className="dsShadowCard"
                    style={{ boxShadow: `var(${s.token})` }}
                  >
                    <span className="dsShadowCardLabel">Card</span>
                    <p className="dsShadowCardToken">{s.token}</p>
                  </div>
                  <div className="dsShadowMeta">
                    <strong>{s.label}</strong>
                    <span className="dsShadowLayers">{s.layers}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="dsShadowsSub">Mismo set sobre fondo claro (rgba(0,0,0,alpha) es neutro):</p>
            <div className="dsShadowsGrid dsShadowsGridLight">
              {[
                { id: 'sm-l', token: '--flow-shadow-sm' },
                { id: 'md-l', token: '--flow-shadow-md' },
                { id: 'lg-l', token: '--flow-shadow-lg' },
                { id: 'xl-l', token: '--flow-shadow-xl' },
                { id: '2xl-l', token: '--flow-shadow-2xl' },
              ].map((s) => (
                <div key={s.id} className="dsShadowCardWrap">
                  <div
                    className="dsShadowCard dsShadowCardLight"
                    style={{ boxShadow: `var(${s.token})` }}
                  >
                    <span className="dsShadowCardLabel">Card</span>
                    <p className="dsShadowCardToken">{s.token}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="dsShadowsCode">
              <h3 className="dsSpecTitle">Uso en CSS</h3>
              <pre className="dsCodeBlock">{`.elevation-sm { box-shadow: var(--flow-shadow-sm); }
.elevation-md { box-shadow: var(--flow-shadow-md); }
.elevation-lg { box-shadow: var(--flow-shadow-lg); }`}</pre>
            </div>
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
