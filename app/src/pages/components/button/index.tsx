import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../flow-ds/tokens/semantic.css';
import '../../../flow-ds/tokens/components.css';
import '../../../flow-ds/tokens/subascars.css';
import { Button } from '../../../flow-ds/components/Button/Button';
import { ButtonSubascars } from '../../../flow-ds/components/ButtonSubascars/ButtonSubascars';
import styles from './button-page.module.css';

type TabId = 'flow3' | 'subascars';

const ON_THIS_PAGE_FLOW3 = [
  { id: 'section-default', label: 'Default' },
  { id: 'section-anatomia', label: 'Anatomía' },
  { id: 'section-variantes', label: 'Variantes' },
  { id: 'section-estados', label: 'Estados' },
  { id: 'section-tamanos', label: 'Tamaños' },
  { id: 'section-icono', label: 'Con icono' },
  { id: 'section-token-map', label: 'Token Map' },
  { id: 'section-guide', label: 'Guía de uso' },
  { id: 'section-codigo', label: 'Código' },
  { id: 'section-auditoria', label: 'Auditoría FLOW³' },
];

const ON_THIS_PAGE_SUBASCARS = [
  { id: 'subascars-default', label: 'Default' },
  { id: 'subascars-anatomia', label: 'Anatomía y auditoría' },
  { id: 'subascars-variantes', label: 'Variantes' },
  { id: 'subascars-estados', label: 'Estados' },
  { id: 'subascars-token-map', label: 'Token Map' },
  { id: 'subascars-codigo', label: 'Código' },
  { id: 'section-auditoria', label: 'Auditoría FLOW³' },
];

const TOKEN_MAP = [
  { token: '--flow-btn-bg', semantic: '--flow-color-brand', primitive: '--flow-purple-500', final: '#E000FF' },
  { token: '--flow-btn-height-m', semantic: '—', primitive: '--flow-fib-34', final: '34px' },
  { token: '--flow-btn-padding-y-m', semantic: '--flow-space-md', primitive: '--flow-fib-8', final: '8px' },
  { token: '--flow-btn-padding-x-m', semantic: '--flow-space-lg', primitive: '--flow-fib-13', final: '13px' },
  { token: '--flow-btn-font-size-m', semantic: '--flow-text-lg', primitive: '--flow-fib-21', final: '21px' },
  { token: '--flow-btn-radius', semantic: '--flow-radius-pill', primitive: '—', final: '9999px' },
  { token: '--flow-btn-shadow', semantic: '--flow-shadow-sm', primitive: 'fib-5 + fib-13', final: '0 5px 13px' },
];

const TOKEN_MAP_SUBASCARS = [
  { token: '--subascars-btn-bg', semantic: '--subascars-btn-gradient', final: 'linear-gradient(90deg, #E000FF, #1a00c7)', prop: 'background' },
  { token: '--subascars-btn-color', semantic: '--subascars-btn-text', final: '#fafafc', prop: 'color' },
  { token: '--subascars-btn-padding-y', semantic: '--subascars-space-10', final: '10px', prop: 'padding' },
  { token: '--subascars-btn-padding-x', semantic: '--subascars-space-15', final: '15px', prop: 'padding' },
  { token: '--subascars-btn-radius', semantic: '--subascars-radius-full', final: '9999px', prop: 'border-radius' },
  { token: '--subascars-btn-font-size', semantic: '--subascars-text-size-lg', final: '17px', prop: 'font-size' },
  { token: '--subascars-btn-font-weight', semantic: '--subascars-text-weight-medium', final: '500', prop: 'font-weight' },
  { token: '--subascars-btn-shadow', semantic: '--subascars-shadow-drop-medium', final: '0 5px 13px rgba(0,9,87,0.21)', prop: 'box-shadow' },
];

function IconCheck() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function IconTrash() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default function ButtonPage() {
  const [activeTab, setActiveTab] = useState<TabId>('flow3');
  const [auditExpanded, setAuditExpanded] = useState(true);

  return (
    <div className={`${styles.layout} ${activeTab === 'subascars' ? styles.layoutSubascars : ''}`}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={styles.sidebarLogoText}>FloW</div>
          <div className={styles.sidebarLogoSub}>Design System v2.0</div>
        </div>

        <div className={styles.sidebarSection}>
          <div className={styles.sidebarSectionLabel}>Components</div>
          <Link to="/components/button" className={styles.sidebarItem}>Actions</Link>
          <Link to="/components/button" className={`${styles.sidebarItem} ${styles.sidebarItemActive}`}>Button</Link>
          <Link to="/components/button" className={styles.sidebarItem}>Link</Link>
        </div>

        <div className={styles.sidebarSection}>
          <div className={styles.sidebarSectionLabel}>Forms</div>
          <Link to="/components/button" className={styles.sidebarItem}>Input</Link>
          <Link to="/components/button" className={styles.sidebarItem}>Select</Link>
          <Link to="/components/button" className={styles.sidebarItem}>Checkbox</Link>
          <Link to="/components/button" className={styles.sidebarItem}>Toggle</Link>
        </div>

        <div className={styles.sidebarSection}>
          <div className={styles.sidebarSectionLabel}>Feedback</div>
          <Link to="/components/button" className={styles.sidebarItem}>Badge</Link>
          <Link to="/components/button" className={styles.sidebarItem}>Toast</Link>
          <Link to="/components/button" className={styles.sidebarItem}>Alert</Link>
        </div>

        <div className={styles.sidebarSection}>
          <div className={styles.sidebarSectionLabel}>Tokens</div>
          <Link to="/components/button" className={styles.sidebarItem}>Color</Link>
          <Link to="/components/button" className={styles.sidebarItem}>Space</Link>
          <Link to="/components/button" className={styles.sidebarItem}>Typography</Link>
          <Link to="/components/button" className={styles.sidebarItem}>Motion</Link>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.pageHeader}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/">Components</Link>
            <span> › </span>
            <Link to="/components/button">Actions</Link>
            <span> › </span>
            <span>Button</span>
          </nav>
          <h1 className={styles.pageTitle}>Button</h1>
          <p className={styles.pageDesc}>
            Triggers an action or event. La anatomía del botón es inmutable — padding, tipografía y radio nunca cambian. Solo los tokens de color varían entre variantes.
          </p>
          <div className={styles.statusBadges}>
            <span className={`${styles.statusBadge} ${styles.statusBadgeStable}`}>Stable</span>
            <span className={`${styles.statusBadge} ${styles.statusBadgeV2}`}>v2.0</span>
            <span className={`${styles.statusBadge} ${styles.statusBadgeWcag}`}>WCAG AA</span>
          </div>
          <div className={styles.tabs} role="tablist" aria-label="Estilo del Design System">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'flow3'}
              className={`${styles.tab} ${activeTab === 'flow3' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('flow3')}
            >
              FloW3 DS
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'subascars'}
              className={`${styles.tab} ${activeTab === 'subascars' ? styles.tabActive : ''}`}
              onClick={() => setActiveTab('subascars')}
            >
              Subascars
            </button>
          </div>
        </header>

        {activeTab === 'flow3' && (
        <>
        <section className={styles.section} aria-labelledby="section-default">
          <h2 id="section-default" className={styles.sectionTitle}>Default</h2>
          <p className={styles.sectionDesc}>
            El botón default es la base de la que derivan todas las variantes. Renderiza la acción principal con <code className={styles.anatomyToken}>variant="primary"</code> y <code className={styles.anatomyToken}>size="m"</code> usando el gradiente brand.
          </p>
          <div className={styles.demoCanvas}>
            <div className={styles.demoCanvasHeader}>
              <span className={styles.demoCanvasLabel}>Preview</span>
              <span className={styles.demoCanvasTag}>{'<Button />'}</span>
            </div>
            <div className={styles.demoCanvasBody}>
              <Button label="Save changes" variant="primary" size="m" />
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="section-anatomia">
          <h2 id="section-anatomia" className={styles.sectionTitle}>Anatomía</h2>
          <p className={styles.sectionDesc}>
            Cada propiedad visual del botón está gobernada por un token de componente (<code className={styles.anatomyToken}>--flow-btn-*</code>) que a su vez referencia un semántico. Las medidas respetan la escala Fibonacci y las reglas FLOW³.
          </p>
          <div className={styles.anatomyMeasures}>
            <h3 className={styles.anatomyMeasuresTitle}>Medidas y cumplimiento FLOW³</h3>
            <table className={styles.anatomyMeasuresTable}>
              <thead>
                <tr>
                  <th>Propiedad</th>
                  <th>Valor</th>
                  <th>Token</th>
                  <th>Regla</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Height L</td><td>55px</td><td><code>--flow-space-fib-55</code></td><td><span className={styles.ruleOk}>Regla: 55px Fibonacci ✓</span></td></tr>
                <tr><td>Height M</td><td>34px</td><td><code>--flow-space-fib-34</code></td><td><span className={styles.ruleOk}>Regla: 34px Fibonacci ✓</span></td></tr>
                <tr><td>Height S</td><td>21px</td><td><code>--flow-space-fib-21</code></td><td><span className={styles.ruleOk}>Regla: 21px Fibonacci ✓</span></td></tr>
                <tr><td>Padding vertical M</td><td>8px</td><td><code>--flow-space-fib-8</code></td><td><span className={styles.ruleOk}>Regla: 8px Fibonacci ✓</span></td></tr>
                <tr><td>Padding horizontal M</td><td>13px</td><td><code>--flow-space-fib-13</code></td><td><span className={styles.ruleOk}>Regla: 13px Fibonacci ✓</span></td></tr>
                <tr><td>Border radius</td><td>8px</td><td><code>--flow-radius-md</code></td><td><span className={styles.ruleOk}>Regla: 8px Capa 3 ✓</span></td></tr>
                <tr><td>Font-size M</td><td>16px</td><td><code>--flow-text-base</code></td><td><span className={styles.ruleOk}>Regla: 16px Semántico ✓</span></td></tr>
                <tr><td>Focus width</td><td>2px</td><td><code>--flow-space-fib-2</code></td><td><span className={styles.ruleOk}>Regla: 2px Fibonacci ✓</span></td></tr>
                <tr><td>Border width</td><td>1px</td><td><code>--flow-space-fib-1</code></td><td><span className={styles.ruleOk}>Regla: 1px Fibonacci ✓</span></td></tr>
              </tbody>
            </table>
          </div>
          <div className={styles.anatomyWrap}>
            <div className={styles.anatomyBtnWrap}>
              <div className={styles.anatomyBtnOuter}>
                <Button label="Save changes" />
              </div>
            </div>
            <div className={styles.anatomyLabels}>
              <div className={styles.anatomyRow}>
                <span className={styles.anatomyDot} style={{ background: 'var(--flow-color-primary)' }} />
                <div>
                  <div className={styles.anatomyToken}>--flow-btn-bg</div>
                  <div className={styles.anatomyDesc}>→ --flow-color-primary</div>
                </div>
              </div>
              <div className={styles.anatomyRow}>
                <span className={styles.anatomyDot} style={{ background: 'var(--flow-color-text-on-primary)', border: '1px solid var(--flow-color-border)' }} />
                <div>
                  <div className={styles.anatomyToken}>--flow-btn-text</div>
                  <div className={styles.anatomyDesc}>→ --flow-color-text-on-primary</div>
                </div>
              </div>
              <div className={styles.anatomyRow}>
                <span className={styles.anatomyDot} style={{ background: 'var(--flow-color-border-strong)' }} />
                <div>
                  <div className={styles.anatomyToken}>--flow-btn-padding-y / padding-x</div>
                  <div className={styles.anatomyDesc}>→ --flow-space-sm / --flow-space-md</div>
                </div>
              </div>
              <div className={styles.anatomyRow}>
                <span className={styles.anatomyDot} style={{ background: 'var(--flow-color-secondary)' }} />
                <div>
                  <div className={styles.anatomyToken}>--flow-btn-radius</div>
                  <div className={styles.anatomyDesc}>→ --flow-radius-md (8px)</div>
                </div>
              </div>
              <div className={styles.anatomyRow}>
                <span className={styles.anatomyDot} style={{ background: 'var(--flow-color-border-focus)' }} />
                <div>
                  <div className={styles.anatomyToken}>--flow-btn-focus-ring</div>
                  <div className={styles.anatomyDesc}>→ --flow-color-border-focus</div>
                </div>
              </div>
              <div className={styles.anatomyRow}>
                <span className={styles.anatomyDot} style={{ background: 'var(--flow-color-warning)' }} />
                <div>
                  <div className={styles.anatomyToken}>--flow-btn-duration</div>
                  <div className={styles.anatomyDesc}>→ --flow-motion-normal (200ms)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="section-variantes">
          <h2 id="section-variantes" className={styles.sectionTitle}>Variantes</h2>
          <p className={styles.sectionDesc}>
            Las variantes solo sobreescriben los tokens de color. La anatomía (padding, radius, tipografía) es idéntica en todas.
          </p>
          <div className={styles.variantsGrid}>
            <div className={styles.variantCard}>
              <div className={styles.variantCardPreview}>
                <Button label="Primary action" variant="primary" />
              </div>
              <div className={styles.variantCardInfo}>
                <div className={styles.variantCardName}>Primary</div>
                <p className={styles.variantCardDesc}>Acción principal. Un solo botón primary por vista.</p>
                <div className={styles.variantCardToken}>--flow-color-brand (gradiente)</div>
              </div>
            </div>
            <div className={styles.variantCard}>
              <div className={styles.variantCardPreview}>
                <Button label="Secondary action" variant="secondary" />
              </div>
              <div className={styles.variantCardInfo}>
                <div className={styles.variantCardName}>Secondary</div>
                <p className={styles.variantCardDesc}>Acción alternativa o complementaria al primary.</p>
                <div className={styles.variantCardToken}>--flow-color-secondary → #00B8A0</div>
              </div>
            </div>
            <div className={styles.variantCard}>
              <div className={styles.variantCardPreview}>
                <Button label="Delete record" variant="destructive" />
              </div>
              <div className={styles.variantCardInfo}>
                <div className={styles.variantCardName}>Destructive</div>
                <p className={styles.variantCardDesc}>Acciones irreversibles: eliminar, desconectar, revocar.</p>
                <div className={styles.variantCardToken}>--flow-color-danger → #D42E2E</div>
              </div>
            </div>
            <div className={styles.variantCard}>
              <div className={`${styles.variantCardPreview} ${styles.variantCardPreviewGhost}`}>
                <Button label="Ghost action" variant="ghost" />
              </div>
              <div className={styles.variantCardInfo}>
                <div className={styles.variantCardName}>Ghost</div>
                <p className={styles.variantCardDesc}>Acción terciaria de bajo peso visual. Fondo transparente.</p>
                <div className={styles.variantCardToken}>transparente + borde</div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="section-estados">
          <h2 id="section-estados" className={styles.sectionTitle}>Estados</h2>
          <p className={styles.sectionDesc}>Todos los estados de interacción derivan del token base. Ninguno usa valores directos.</p>
          <div className={styles.statesRow}>
            <div className={styles.stateItem}>
              <Button label="Default" />
              <span className={styles.stateLabel}>:default</span>
            </div>
            <div className={`${styles.stateItem} ${styles.stateHover}`}>
              <Button label="Hover" />
              <span className={styles.stateLabel}>:hover</span>
            </div>
            <div className={`${styles.stateItem} ${styles.stateActive}`}>
              <Button label="Active" />
              <span className={styles.stateLabel}>:active</span>
            </div>
            <div className={`${styles.stateItem} ${styles.stateFocus}`}>
              <Button label="Focus" />
              <span className={styles.stateLabel}>:focus-visible</span>
            </div>
            <div className={styles.stateItem}>
              <Button label="Disabled" disabled />
              <span className={styles.stateLabel}>:disabled</span>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="section-tamanos">
          <h2 id="section-tamanos" className={styles.sectionTitle}>Tamaños</h2>
          <p className={styles.sectionDesc}>Tres tallas. Los valores de padding y font-size apuntan a tokens de la escala semántica.</p>
          <div className={styles.sizesRow}>
            <div className={styles.sizeItem}>
              <Button label="Large" size="l" />
              <span className={styles.sizeLabel}>L (55px)<br />Fibonacci</span>
            </div>
            <div className={styles.sizeItem}>
              <Button label="Default" size="m" />
              <span className={styles.sizeLabel}>M (34px) ← default<br />Fibonacci</span>
            </div>
            <div className={styles.sizeItem}>
              <Button label="Small" size="s" />
              <span className={styles.sizeLabel}>S (21px)<br />Fibonacci</span>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="section-icono">
          <h2 id="section-icono" className={styles.sectionTitle}>Con icono</h2>
          <div className={styles.demoCanvas}>
            <div className={styles.demoCanvasHeader}>
              <span className={styles.demoCanvasLabel}>Preview</span>
              <span className={styles.demoCanvasTag}>icon + label</span>
            </div>
            <div className={styles.demoCanvasBody}>
              <Button label="Confirm" variant="primary" icon={<IconCheck />} />
              <Button label="Delete" variant="destructive" icon={<IconTrash />} />
              <Button label="Add item" variant="ghost" icon={<IconPlus />} />
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="section-token-map">
          <h2 id="section-token-map" className={styles.sectionTitle}>Token Map</h2>
          <p className={styles.sectionDesc}>
            Cadena completa: Token componente → Semántico → Primitivo → Valor final. Ningún componente rompe esta cadena.
          </p>
          <div className={styles.tokenTableWrap}>
            <table className={styles.tokenTable}>
              <thead>
                <tr>
                  <th>Token componente</th>
                  <th>→ Semántico</th>
                  <th>→ Primitivo</th>
                  <th>Valor final</th>
                </tr>
              </thead>
              <tbody>
                {TOKEN_MAP.map((row) => (
                  <tr key={row.token}>
                    <td><span className={styles.tokenName}>{row.token}</span></td>
                    <td><span className={styles.tokenValue}>{row.semantic}</span></td>
                    <td><span className={styles.tokenValue}>{row.primitive}</span></td>
                    <td>
                      {row.final.startsWith('#') ? (
                        <>
                          <span className={styles.tokenSwatch} style={{ background: row.final }} />
                          <span className={styles.tokenValue}>{row.final}</span>
                        </>
                      ) : (
                        <span className={styles.tokenValue}>{row.final}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="section-guide">
          <h2 id="section-guide" className={styles.sectionTitle}>Guía de uso</h2>
          <div className={styles.guidelinesGrid}>
            <div className={styles.guidelineCard}>
              <div className={`${styles.guidelineHeader} ${styles.guidelineHeaderDo}`}>✓ Do</div>
              <div className={styles.guidelineBody}>
                Un solo botón <strong>Primary</strong> por acción principal en la vista. Comunica la acción más importante sin ambigüedad.
                <div className={styles.guidelineExample}>
                  <Button label="Save changes" />
                  <Button label="Cancel" variant="ghost" />
                </div>
              </div>
            </div>
            <div className={styles.guidelineCard}>
              <div className={`${styles.guidelineHeader} ${styles.guidelineHeaderDont}`}>✕ Don&apos;t</div>
              <div className={styles.guidelineBody}>
                No uses dos botones <strong>Primary</strong> juntos. La jerarquía visual desaparece y el usuario no sabe qué acción importa más.
                <div className={styles.guidelineExample}>
                  <Button label="Save" />
                  <Button label="Export" />
                </div>
              </div>
            </div>
            <div className={styles.guidelineCard}>
              <div className={`${styles.guidelineHeader} ${styles.guidelineHeaderDo}`}>✓ Do</div>
              <div className={styles.guidelineBody}>
                Usa <strong>Destructive</strong> solo cuando la acción sea irreversible. Acompáñalo siempre de un diálogo de confirmación.
                <div className={styles.guidelineExample}>
                  <Button label="Cancel" variant="ghost" />
                  <Button label="Delete account" variant="destructive" />
                </div>
              </div>
            </div>
            <div className={styles.guidelineCard}>
              <div className={`${styles.guidelineHeader} ${styles.guidelineHeaderDont}`}>✕ Don&apos;t</div>
              <div className={styles.guidelineBody}>
                No uses <strong>Destructive</strong> para acciones negativas pero reversibles. &quot;Cancelar suscripción&quot; no es lo mismo que &quot;Eliminar&quot;.
                <div className={styles.guidelineExample}>
                  <Button label="Cancel subscription" variant="destructive" disabled />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="section-codigo">
          <h2 id="section-codigo" className={styles.sectionTitle}>Código</h2>
          <div className={styles.codeBlock}>
            <div className={styles.codeBlockHeader}>
              <span className={styles.codeBlockFilename}>Button.module.css — Capa 3</span>
              <span className={styles.codeBlockLang}>CSS</span>
            </div>
            <pre className={styles.codeBlockPre}>
              <code>
                <span className={styles.codeComment}>/* ── CAPA 3: Component tokens ──────────────────── */</span>{'\n'}
                <span className={styles.codeComment}>/* Solo referencian semánticos. Sin valores directos. */</span>{'\n\n'}
                <span className={styles.codeKw}>.button</span> {'{\n  '}
                <span className={styles.codeProp}>background-color</span>: <span className={styles.codeToken}>var(--flow-btn-bg)</span>;{'\n  '}
                <span className={styles.codeProp}>color</span>:            <span className={styles.codeToken}>var(--flow-btn-text)</span>;{'\n  '}
                <span className={styles.codeProp}>padding</span>:         <span className={styles.codeToken}>var(--flow-btn-padding-y)</span> <span className={styles.codeToken}>var(--flow-btn-padding-x)</span>;{'\n  '}
                <span className={styles.codeProp}>border-radius</span>:   <span className={styles.codeToken}>var(--flow-btn-radius)</span>;{'\n  '}
                <span className={styles.codeProp}>font-size</span>:       <span className={styles.codeToken}>var(--flow-btn-font-size)</span>;{'\n  '}
                <span className={styles.codeProp}>font-weight</span>:     <span className={styles.codeToken}>var(--flow-btn-font-weight)</span>;{'\n  '}
                <span className={styles.codeProp}>transition</span>:      background-color <span className={styles.codeToken}>var(--flow-btn-duration)</span> <span className={styles.codeToken}>var(--flow-btn-ease)</span>;{'\n}'}
                {'\n\n'}
                <span className={styles.codeKw}>.button:hover</span>        {'{ '}<span className={styles.codeProp}>background-color</span>: <span className={styles.codeToken}>var(--flow-btn-bg-hover)</span>; {'}'}{'\n'}
                <span className={styles.codeKw}>.button:active</span>       {'{ '}<span className={styles.codeProp}>background-color</span>: <span className={styles.codeToken}>var(--flow-btn-bg-active)</span>; {'}'}{'\n'}
                <span className={styles.codeKw}>.button:focus-visible</span> {'{ '}<span className={styles.codeProp}>outline</span>: 2px solid <span className={styles.codeToken}>var(--flow-btn-focus-ring)</span>; {'}'}{'\n'}
                <span className={styles.codeKw}>.button:disabled</span>     {'{ '}<span className={styles.codeProp}>background-color</span>: <span className={styles.codeToken}>var(--flow-btn-bg-disabled)</span>; {'}'}
                {'\n\n'}
                <span className={styles.codeComment}>/* Variantes — solo sobreescriben tokens de color */</span>{'\n'}
                <span className={styles.codeKw}>.button--secondary</span>  {'{ '}<span className={styles.codeProp}>--flow-btn-bg</span>: <span className={styles.codeToken}>var(--flow-color-secondary)</span>; {'}'}{'\n'}
                <span className={styles.codeKw}>.button--destructive</span> {'{ '}<span className={styles.codeProp}>--flow-btn-bg</span>: <span className={styles.codeToken}>var(--flow-color-danger)</span>; {'}'}
              </code>
            </pre>
          </div>
        </section>
        </>
        )}

        {activeTab === 'subascars' && (
        <>
        {/* ── Default (delimitado): único botón de referencia ── */}
        <section className={styles.section} aria-labelledby="subascars-default">
          <h2 id="subascars-default" className={styles.sectionTitle}>Default</h2>
          <p className={styles.sectionDesc}>
            El botón por defecto (primary) es el que más se usa en la interfaz. Representa la acción principal. Solo usa otra variante cuando necesites más o menos peso visual — igual que en <a href="https://polaris-react.shopify.com/components/actions/button" target="_blank" rel="noopener noreferrer">Polaris</a>.
          </p>
          <div className={styles.defaultDelimiter}>
            <div className={styles.defaultDelimiterLabel}>Referencia única — {'<ButtonSubascars />'}</div>
            <div className={styles.demoCanvas}>
              <div className={styles.demoCanvasHeader}>
                <span className={styles.demoCanvasLabel}>Preview</span>
                <span className={styles.demoCanvasTag}>{'<ButtonSubascars />'}</span>
              </div>
              <div className={styles.demoCanvasBody}>
                <ButtonSubascars label="Text button" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Anatomía + Auditoría (por qué está construido así) ── */}
        <section className={styles.section} aria-labelledby="subascars-anatomia">
          <h2 id="subascars-anatomia" className={styles.sectionTitle}>Anatomía y auditoría</h2>
          <p className={styles.sectionDesc}>
            Cómo está construido el botón y <strong>por qué</strong> cada decisión: cada propiedad está gobernada por tokens <code className={styles.anatomyToken}>--subascars-btn-*</code> y variables de Figma. Las medidas se muestran para verificar cumplimiento con las reglas del sistema.
          </p>
          <div className={styles.anatomyMeasures}>
            <h3 className={styles.anatomyMeasuresTitle}>Medidas y cumplimiento FLOW³</h3>
            <table className={styles.anatomyMeasuresTable}>
              <thead>
                <tr>
                  <th>Propiedad</th>
                  <th>Valor</th>
                  <th>Token</th>
                  <th>Regla</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Padding vertical</td><td>10px</td><td><code>--subascars-btn-padding-y</code></td><td><span className={styles.ruleOk}>Regla: 10px (Spacer/10) ✓</span></td></tr>
                <tr><td>Padding horizontal</td><td>15px</td><td><code>--subascars-btn-padding-x</code></td><td><span className={styles.ruleOk}>Regla: 15px (Spacer/15) ✓</span></td></tr>
                <tr><td>Border radius</td><td>9999px (pill)</td><td><code>--subascars-btn-radius</code></td><td><span className={styles.ruleOk}>Regla: Corner/Full ✓</span></td></tr>
                <tr><td>Font-size</td><td>17px</td><td><code>--subascars-btn-font-size</code></td><td><span className={styles.ruleOk}>Regla: 17px (Body/Large) ✓</span></td></tr>
                <tr><td>Font-weight</td><td>500</td><td><code>--subascars-btn-font-weight</code></td><td><span className={styles.ruleOk}>Regla: 500 (Medium) ✓</span></td></tr>
                <tr><td>Box shadow</td><td>0 5px 13px rgba(0,9,87,0.21)</td><td><code>--subascars-btn-shadow</code></td><td><span className={styles.ruleOk}>Regla: Drop/Medium 08 ✓</span></td></tr>
              </tbody>
            </table>
          </div>
          <div className={styles.anatomyWrap}>
            <div className={styles.anatomyBtnWrap}>
              <div className={styles.anatomyBtnOuter}>
                <ButtonSubascars label="Text button" />
              </div>
            </div>
            <div className={styles.anatomyLabels}>
              <div className={styles.anatomyRow}>
                <span className={styles.anatomyDot} style={{ background: 'var(--subascars-btn-gradient-start)' }} />
                <div>
                  <div className={styles.anatomyToken}>--subascars-btn-bg</div>
                  <div className={styles.anatomyDesc}>→ gradient #E000FF → #1a00c7</div>
                </div>
              </div>
              <div className={styles.anatomyRow}>
                <span className={styles.anatomyDot} style={{ background: 'var(--subascars-btn-text)' }} />
                <div>
                  <div className={styles.anatomyToken}>--subascars-btn-color</div>
                  <div className={styles.anatomyDesc}>→ Text/Neutral-inverse (#fafafc)</div>
                </div>
              </div>
              <div className={styles.anatomyRow}>
                <span className={styles.anatomyDot} style={{ background: 'var(--flow-color-border-strong)' }} />
                <div>
                  <div className={styles.anatomyToken}>--subascars-btn-padding-y / padding-x</div>
                  <div className={styles.anatomyDesc}>→ Spacer/10, Spacer/15</div>
                </div>
              </div>
              <div className={styles.anatomyRow}>
                <span className={styles.anatomyDot} style={{ background: 'var(--flow-color-secondary)' }} />
                <div>
                  <div className={styles.anatomyToken}>--subascars-btn-radius</div>
                  <div className={styles.anatomyDesc}>→ Corner radius/Full (pill)</div>
                </div>
              </div>
              <div className={styles.anatomyRow}>
                <span className={styles.anatomyDot} style={{ background: 'var(--flow-color-neutral-900)' }} />
                <div>
                  <div className={styles.anatomyToken}>--subascars-btn-shadow</div>
                  <div className={styles.anatomyDesc}>→ Shadow Drop/Light/Medium 08</div>
                </div>
              </div>
              <div className={styles.anatomyRow}>
                <span className={styles.anatomyDot} style={{ background: 'var(--flow-color-primary)' }} />
                <div>
                  <div className={styles.anatomyToken}>--subascars-btn-font-size / font-weight</div>
                  <div className={styles.anatomyDesc}>→ Body/Large Medium (Roboto 17px, 500)</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.auditBlock}>
            <h3 className={styles.auditBlockTitle}>Auditoría: por qué está así</h3>
            <ul className={styles.auditList}>
              <li className={styles.auditItem}><strong>Gradiente magenta → azul:</strong> identidad Subascars y máxima prioridad visual para la acción principal (CTA). El diseño en Figma (node 14-221) fija estos stops.</li>
              <li className={styles.auditItem}><strong>Forma pill (radius full):</strong> Corner radius/Full en Figma. Transmite modernidad y accesibilidad; reduce dureza visual.</li>
              <li className={styles.auditItem}><strong>Sombra media (Drop/Light/Medium 08):</strong> da profundidad y affordance de “elemento clickeable”, sin exceso.</li>
              <li className={styles.auditItem}><strong>Roboto 17px Medium:</strong> Body/Large Medium en Figma. Legibilidad y alineación con el sistema de tipografía del archivo.</li>
              <li className={styles.auditItem}><strong>Spacer/10 y Spacer/15:</strong> padding vertical y horizontal definidos en Figma; mantienen proporción y touch target.</li>
              <li className={styles.auditItem}><strong>Texto #fafafc (Neutral-inverse):</strong> contraste suficiente sobre el gradiente para cumplir accesibilidad.</li>
            </ul>
          </div>
        </section>

        {/* ── Variantes (estilo Polaris) ── */}
        <section className={styles.section} aria-labelledby="subascars-variantes">
          <h2 id="subascars-variantes" className={styles.sectionTitle}>Variantes</h2>
          <p className={styles.sectionDesc}>
            Como en <a href="https://polaris-react.shopify.com/components/actions/button" target="_blank" rel="noopener noreferrer">Shopify Polaris</a>: cada variante tiene un uso claro. Default (primary) para la acción principal; plain y tertiary para menos peso; critical para acciones destructivas.
          </p>
          <div className={styles.variantsExampleList}>
            <div className={styles.variantExampleRow}>
              <div>
                <div className={styles.variantExampleLabel}>Default (primary)</div>
                <p className={styles.variantExampleDesc}>El más usado. Una sola acción primary por vista.</p>
              </div>
              <div className={styles.variantExamplePreview}>
                <ButtonSubascars label="Add product" />
              </div>
            </div>
            <div className={styles.variantExampleRow}>
              <div>
                <div className={styles.variantExampleLabel}>Plain</div>
                <p className={styles.variantExampleDesc}>Acción secundaria. Bajo peso visual; borde y texto en color de marca.</p>
              </div>
              <div className={styles.variantExamplePreview}>
                <ButtonSubascars label="View settings" variant="plain" />
              </div>
            </div>
            <div className={styles.variantExampleRow}>
              <div>
                <div className={styles.variantExampleLabel}>Tertiary</div>
                <p className={styles.variantExampleDesc}>Acción terciaria. Solo texto, sin borde ni fondo.</p>
              </div>
              <div className={styles.variantExamplePreview}>
                <ButtonSubascars label="Cancel" variant="tertiary" />
              </div>
            </div>
            <div className={styles.variantExampleRow}>
              <div>
                <div className={styles.variantExampleLabel}>Critical</div>
                <p className={styles.variantExampleDesc}>Solo para acciones destructivas o irreversibles (eliminar, revocar).</p>
              </div>
              <div className={styles.variantExamplePreview}>
                <ButtonSubascars label="Delete" variant="critical" />
              </div>
            </div>
            <div className={styles.variantExampleRow}>
              <div>
                <div className={styles.variantExampleLabel}>Disabled state</div>
                <p className={styles.variantExampleDesc}>Cuando la acción no está disponible. No clickeable.</p>
              </div>
              <div className={styles.variantExamplePreview}>
                <ButtonSubascars label="Save" disabled />
              </div>
            </div>
            <div className={styles.variantExampleRow}>
              <div>
                <div className={styles.variantExampleLabel}>Loading state</div>
                <p className={styles.variantExampleDesc}>Mientras se procesa la acción. Muestra spinner.</p>
              </div>
              <div className={styles.variantExamplePreview}>
                <ButtonSubascars label="Saving…" loading />
              </div>
            </div>
            <div className={styles.variantExampleRow}>
              <div>
                <div className={styles.variantExampleLabel}>With icon</div>
                <p className={styles.variantExampleDesc}>Icono a la izquierda del texto para reforzar la acción.</p>
              </div>
              <div className={styles.variantExamplePreview}>
                <ButtonSubascars label="Add item" icon={<IconPlus />} />
                <ButtonSubascars label="Delete" variant="critical" icon={<IconTrash />} />
              </div>
            </div>
            <div className={styles.variantExampleRow}>
              <div>
                <div className={styles.variantExampleLabel}>Large / Slim</div>
                <p className={styles.variantExampleDesc}>Tamaños: large para más prominencia, slim para espacios reducidos.</p>
              </div>
              <div className={styles.variantExamplePreview}>
                <ButtonSubascars label="Large" size="large" />
                <ButtonSubascars label="Slim" size="slim" />
              </div>
            </div>
            <div className={styles.variantExampleRow}>
              <div>
                <div className={styles.variantExampleLabel}>Full width</div>
                <p className={styles.variantExampleDesc}>Ocupa todo el ancho del contenedor (móvil, modales).</p>
              </div>
              <div className={styles.variantExamplePreview}>
                <ButtonSubascars label="Full width button" fullWidth />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="subascars-estados">
          <h2 id="subascars-estados" className={styles.sectionTitle}>Estados</h2>
          <div className={styles.statesRow}>
            <div className={styles.stateItem}>
              <ButtonSubascars label="Default" />
              <span className={styles.stateLabel}>:default</span>
            </div>
            <div className={styles.stateItem}>
              <ButtonSubascars label="Disabled" disabled />
              <span className={styles.stateLabel}>:disabled</span>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="subascars-token-map">
          <h2 id="subascars-token-map" className={styles.sectionTitle}>Token Map (Subascars)</h2>
          <p className={styles.sectionDesc}>
            Tokens de componente <code className={styles.anatomyToken}>--subascars-btn-*</code> derivados de la auditoría Figma.
          </p>
          <div className={styles.tokenTableWrap}>
            <table className={styles.tokenTable}>
              <thead>
                <tr>
                  <th>Token componente</th>
                  <th>→ Semántico / Figma</th>
                  <th>Valor final</th>
                  <th>Propiedad CSS</th>
                </tr>
              </thead>
              <tbody>
                {TOKEN_MAP_SUBASCARS.map((row) => (
                  <tr key={row.token}>
                    <td><span className={styles.tokenName}>{row.token}</span></td>
                    <td><span className={styles.tokenValue}>{row.semantic}</span></td>
                    <td>
                      {row.final.startsWith('#') ? (
                        <>
                          <span className={styles.tokenSwatch} style={{ background: row.final }} />
                          <span className={styles.tokenValue}>{row.final}</span>
                        </>
                      ) : (
                        <span className={styles.tokenValue}>{row.final}</span>
                      )}
                    </td>
                    <td><span className={styles.tokenValue}>{row.prop}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="subascars-codigo">
          <h2 id="subascars-codigo" className={styles.sectionTitle}>Código</h2>
          <div className={styles.codeBlock}>
            <div className={styles.codeBlockHeader}>
              <span className={styles.codeBlockFilename}>ButtonSubascars.module.css</span>
              <span className={styles.codeBlockLang}>CSS</span>
            </div>
            <pre className={styles.codeBlockPre}>
              <code>
                <span className={styles.codeComment}>/* Flow3 Subascars — Solo var(--subascars-btn-*) */</span>{'\n\n'}
                <span className={styles.codeKw}>.button</span> {'{\n  '}
                <span className={styles.codeProp}>background</span>: <span className={styles.codeToken}>var(--subascars-btn-bg)</span>;{'\n  '}
                <span className={styles.codeProp}>color</span>: <span className={styles.codeToken}>var(--subascars-btn-color)</span>;{'\n  '}
                <span className={styles.codeProp}>padding</span>: <span className={styles.codeToken}>var(--subascars-btn-padding-y)</span> <span className={styles.codeToken}>var(--subascars-btn-padding-x)</span>;{'\n  '}
                <span className={styles.codeProp}>border-radius</span>: <span className={styles.codeToken}>var(--subascars-btn-radius)</span>;{'\n  '}
                <span className={styles.codeProp}>font-family</span>: <span className={styles.codeToken}>var(--subascars-btn-font-family)</span>;{'\n  '}
                <span className={styles.codeProp}>font-size</span>: <span className={styles.codeToken}>var(--subascars-btn-font-size)</span>;{'\n  '}
                <span className={styles.codeProp}>box-shadow</span>: <span className={styles.codeToken}>var(--subascars-btn-shadow)</span>;{'\n}'}
              </code>
            </pre>
          </div>
        </section>
        </>
        )}

        <section className={styles.section} id="section-auditoria" aria-labelledby="section-auditoria-title">
          <h2 id="section-auditoria-title" className={styles.sectionTitle}>Auditoría FLOW³</h2>
          <p className={styles.sectionDesc}>
            Cómo se construye este componente: violaciones resueltas, mapa de tokens y valores Fibonacci aplicados. Haz clic para ver el detalle.
          </p>
          <button
            type="button"
            className={styles.auditTrigger}
            onClick={() => setAuditExpanded(!auditExpanded)}
            aria-expanded={auditExpanded}
            aria-controls="audit-panel"
          >
            <span>Ver auditoría — Cómo se construye, qué píxel, qué token</span>
            <svg
              className={`${styles.auditTriggerIcon} ${auditExpanded ? styles.auditTriggerIconExpanded : ''}`}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {auditExpanded && (
            <div id="audit-panel" className={styles.auditPanel} role="region" aria-labelledby="section-auditoria-title">
              <div className={styles.auditSection}>
                <h3 className={styles.auditSectionTitle}>AUDITORÍA DE ORIGEN — Button (Figma 14-221)</h3>
                <table className={styles.auditTable}>
                    <thead>
                      <tr>
                        <th>Propiedad</th>
                        <th>Figma</th>
                        <th>FLOW³</th>
                        <th>Token</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Height</td><td>~41px</td><td>34px</td><td><code>--flow-btn-height-m</code></td></tr>
                      <tr><td>Padding Y</td><td>10px</td><td>8px</td><td><code>--flow-btn-padding-y-m</code></td></tr>
                      <tr><td>Padding X</td><td>15px</td><td>13px</td><td><code>--flow-btn-padding-x-m</code></td></tr>
                      <tr><td>Font size</td><td>17px</td><td>21px</td><td><code>--flow-btn-font-size-m</code></td></tr>
                      <tr><td>Border radius</td><td>pill</td><td>9999px</td><td><code>--flow-btn-radius</code></td></tr>
                      <tr><td>Sombra offset</td><td>5px, 13px</td><td>5px, 13px</td><td><code>--flow-shadow-sm</code> ✓ Fib</td></tr>
                      <tr><td>Background</td><td>gradiente</td><td>brand</td><td><code>--flow-color-brand</code></td></tr>
                    </tbody>
                  </table>
              </div>
              <div className={styles.auditSection}>
                <h3 className={styles.auditSectionTitle}>Resumen ejecutivo</h3>
                <ul className={styles.auditListBlock}>
                  <li className={styles.auditListItem}>Categoría: Button (FloW3 DS + Subascars)</li>
                  <li className={styles.auditListItem}>Arquitectura: primitives → semantic → components → UI</li>
                  <li className={styles.auditListItem}>Anatomía inmutable: radius, font-size, font-weight, duration, focus; variantes solo color</li>
                  <li className={styles.auditListItem}>Sizes Fibonacci: L=55px, M=34px, S=21px</li>
                </ul>
              </div>
              <div className={styles.auditSection}>
                <h3 className={styles.auditSectionTitle}>Violaciones resueltas</h3>
                <ul className={styles.auditListBlock}>
                  <li className={styles.auditListItem}>[HARDCODED-COLOR] → rgba/hex reemplazados por var(--flow-*)</li>
                  <li className={styles.auditListItem}>[HARDCODED-DIM] → outline, border, padding via var(--flow-space-fib-*)</li>
                  <li className={styles.auditListItem}>[WRONG-LAYER] → Ghost usa --flow-btn-ghost-* (Capa 3)</li>
                  <li className={styles.auditListItem}>[BAD-NAMING] → size sm/md/lg → s/m/l (spec B6)</li>
                  <li className={styles.auditListItem}>[MISSING-TOKEN] → focus-width, focus-offset, shadow-sm, code-border añadidos</li>
                </ul>
              </div>
              <div className={styles.auditSection}>
                <h3 className={styles.auditSectionTitle}>Fibonacci aplicados (reglas en píxel)</h3>
                <table className={styles.auditTable}>
                  <thead>
                    <tr>
                      <th>Propiedad</th>
                      <th>Valor (px)</th>
                      <th>Token</th>
                      <th>Regla</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Height L</td><td>55px</td><td><code>--flow-space-fib-55</code></td><td>55px Fibonacci ✓</td></tr>
                    <tr><td>Height M</td><td>34px</td><td><code>--flow-space-fib-34</code></td><td>34px Fibonacci ✓</td></tr>
                    <tr><td>Height S</td><td>21px</td><td><code>--flow-space-fib-21</code></td><td>21px Fibonacci ✓</td></tr>
                    <tr><td>Padding Y M</td><td>8px</td><td><code>--flow-space-fib-8</code></td><td>8px Fibonacci ✓</td></tr>
                    <tr><td>Padding X M</td><td>13px</td><td><code>--flow-space-fib-13</code></td><td>13px Fibonacci ✓</td></tr>
                    <tr><td>Focus width</td><td>2px</td><td><code>--flow-space-fib-2</code></td><td>2px Fibonacci ✓</td></tr>
                    <tr><td>Border width</td><td>1px</td><td><code>--flow-space-fib-1</code></td><td>1px Fibonacci ✓</td></tr>
                  </tbody>
                </table>
              </div>
              <div className={styles.auditSection}>
                <h3 className={styles.auditSectionTitle}>Mapa de capas</h3>
                <table className={styles.auditTable}>
                  <thead>
                    <tr>
                      <th>Capa</th>
                      <th>Archivo</th>
                      <th>Ejemplo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>1 Primitives</td><td>semantic.css (fib)</td><td><code>--flow-space-fib-8: 8px</code></td></tr>
                    <tr><td>2 Semantic</td><td>semantic.css</td><td><code>--flow-color-primary: #0055FF</code></td></tr>
                    <tr><td>3 Component</td><td>components.css</td><td><code>--flow-btn-bg: var(--flow-color-primary)</code></td></tr>
                    <tr><td>4 UI</td><td>Button.module.css</td><td><code>background: var(--flow-btn-bg)</code></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>

      <aside className={styles.onThisPage} aria-label="On this page">
        <h2 className={styles.onThisPageTitle}>On this page</h2>
        <nav>
          <ul className={styles.onThisPageList}>
            {(activeTab === 'subascars' ? ON_THIS_PAGE_SUBASCARS : ON_THIS_PAGE_FLOW3).map((item) => (
              <li key={item.id} className={styles.onThisPageItem}>
                <a href={`#${item.id}`} className={styles.onThisPageLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
