/**
 * Spec sheet content for the Design System docs.
 * Mirrors the .spec.md in packages/components for display on the docs page.
 */

export interface ComponentSpec {
  id: string;
  name: string;
  kit: string;
  element?: string;
  dimensions: string;
  whenToUse: string[];
  whenNotToUse: string[];
  howToUse: string;
  codeExample: string;
  tokens: { use: string; token: string }[];
  props: { prop: string; type: string; default: string; description: string }[];
}

export const specContent: Record<string, ComponentSpec> = {
  'hero-featured': {
    id: 'hero-featured',
    name: 'HeroFeatured',
    kit: 'α (Alpha)',
    element: 'α.1',
    dimensions: '610 × 377 px',
    whenToUse: [
      'Destacar una subasta o producto principal en la homepage.',
      'Necesitas imagen grande + bloque de detalle (precio, CTA) en proporción áurea.',
      'El contenido encaja en un rectángulo áureo (φ).',
    ],
    whenNotToUse: [
      'Listados o grids de varios ítems (usa AssetCard).',
      'Solo texto o solo imagen sin CTA principal.',
    ],
    howToUse:
      'Proporciona imageUrl, model, price y ctaLabel. Opcional: badge, title, specs. El layout aplica subdivisión φ (61.8% imagen / 38.2% detalles) y degrada por breakpoints (α→β→γ→δ).',
    codeExample: `<HeroFeatured
  imageUrl="/bmw.jpg"
  imageAlt="BMW 320i"
  badge="SUBASTA EN VIVO: 26 ENERO - 3:00 P.M."
  title="SERIES 3"
  model="BMW 320i"
  specs={['65,000 km', 'Lima']}
  price="$14,000"
  priceUnit="USD"
  ctaLabel="PARTICIPAR AHORA"
  onCtaClick={() => {}}
/>`,
    tokens: [
      { use: 'Container size', token: '--flow-kit-alpha-width, --flow-kit-alpha-height' },
      { use: 'Padding / gap', token: '--flow-space-lg, --flow-space-md' },
      { use: 'Radius / shadow', token: '--flow-radius-lg, --flow-shadow-lg' },
      { use: 'CTA height', token: '--flow-kit-epsilon-height' },
    ],
    props: [
      { prop: 'imageUrl', type: 'string', default: '—', description: 'URL de la imagen hero' },
      { prop: 'model', type: 'string', default: '—', description: 'Nombre del modelo' },
      { prop: 'price', type: 'string', default: '—', description: 'Precio a mostrar' },
      { prop: 'ctaLabel', type: 'string', default: "'PARTICIPAR AHORA'", description: 'Texto del botón' },
    ],
  },
  'asset-card': {
    id: 'asset-card',
    name: 'AssetCard',
    kit: 'γ (Gamma)',
    element: 'γ.1',
    dimensions: '233 × 377 px',
    whenToUse: [
      'Cards de activos/vehículos en grid o listado.',
      'Cada card tiene imagen + título + meta + precio + acción.',
      'Encaja en rectángulo áureo vertical (233×377).',
    ],
    whenNotToUse: [
      'Hero único (usa HeroFeatured).',
      'Cards muy compactas tipo chip (usa variantes ε).',
    ],
    howToUse:
      'Pasa imageUrl, title, price. Opcional: meta, offerLabel. El botón de acción abre detalle. Subdivisión vertical φ: imagen 233px + cuerpo 144px.',
    codeExample: `<AssetCard
  imageUrl="/hilux.jpg"
  title="TOYOTA HILUX"
  meta="2024 • LIMA • DIESEL"
  price="US$ 17,999"
  onActionClick={() => {}}
/>`,
    tokens: [
      { use: 'Container', token: '--flow-kit-gamma-width, --flow-kit-gamma-height' },
      { use: 'Image height', token: '--flow-kit-gamma-width (233)' },
      { use: 'Body min-height', token: '--flow-kit-delta-width (144)' },
      { use: 'Action button', token: '--flow-kit-delta-height (144×144)' },
    ],
    props: [
      { prop: 'imageUrl', type: 'string', default: '—', description: 'URL de la imagen' },
      { prop: 'title', type: 'string', default: '—', description: 'Título del activo' },
      { prop: 'price', type: 'string', default: '—', description: 'Precio' },
      { prop: 'onActionClick', type: '() => void', default: '—', description: 'Al hacer clic en la flecha' },
    ],
  },
  'sidebar': {
    id: 'sidebar',
    name: 'Sidebar',
    kit: 'γ (Gamma)',
    dimensions: 'Ancho 233 px',
    whenToUse: [
      'Navegación principal de la app (links, secciones).',
      'Necesitas un panel fijo a la izquierda con logo + nav.',
    ],
    whenNotToUse: [
      'Solo un menú hamburguesa en móvil (considera Navbar + drawer).',
    ],
    howToUse:
      'Proporciona logoTitle, logoSub, navItems (label, href, icon). Opcional: supportLabel y supportItems. Ancho fijo 233px (Kit γ).',
    codeExample: `<Sidebar
  logoTitle="VMC SUBASTAS"
  logoSub="Powered by SUBASTOP.Co"
  navItems={[
    { label: 'Mañana', href: '#', icon: '📅' },
    { label: 'Tipo de oferta', href: '#' },
  ]}
  supportItems={[{ label: 'Centro de ayuda', href: '#' }]}
/>`,
    tokens: [
      { use: 'Width', token: '--flow-kit-gamma-width' },
      { use: 'Padding / gap', token: '--flow-space-lg, --flow-space-xl, --flow-space-xs' },
      { use: 'Radius', token: '--flow-radius-md' },
    ],
    props: [
      { prop: 'logoTitle', type: 'string', default: '—', description: 'Título del logo' },
      { prop: 'navItems', type: 'SidebarNavItem[]', default: '[]', description: 'Items de navegación' },
      { prop: 'supportItems', type: 'SidebarSupportItem[]', default: '[]', description: 'Links de soporte' },
    ],
  },
  'button': {
    id: 'button',
    name: 'Button',
    kit: 'ε (Epsilon)',
    dimensions: 'ε.1: 55px h | ε.2: 34px h',
    whenToUse: [
      'CTAs principales (Participar, Ingresar, Enviar). Usa size="lg" (55px).',
      'Chips, filtros, acciones secundarias. Usa size="md" (34px).',
    ],
    whenNotToUse: [
      'Enlaces que no son acciones (usa <a> con estilo de link).',
    ],
    howToUse:
      'children = texto (y opcional icono). size="lg" | "md". variant="primary" | "secondary" | "ghost". Si href está definido, se renderiza como <a>.',
    codeExample: `<Button size="lg" variant="primary">PARTICIPAR AHORA</Button>
<Button size="md" variant="secondary">TODOS</Button>
<Button href="/login">Ingresa →</Button>`,
    tokens: [
      { use: 'Height (lg)', token: '--flow-kit-epsilon-height (55px)' },
      { use: 'Height (md)', token: '--flow-fib-9 (34px)' },
      { use: 'Padding / radius', token: '--flow-space-lg, --flow-radius-md' },
    ],
    props: [
      { prop: 'children', type: 'ReactNode', default: '—', description: 'Contenido del botón' },
      { prop: 'size', type: "'lg' | 'md'", default: "'lg'", description: 'Altura ε.1 o ε.2' },
      { prop: 'variant', type: "'primary' | 'secondary' | 'ghost'", default: "'primary'", description: 'Estilo visual' },
      { prop: 'href', type: 'string', default: '—', description: 'Si se define, renderiza <a>' },
    ],
  },
  'navbar': {
    id: 'navbar',
    name: 'Navbar',
    kit: 'ε (Epsilon)',
    dimensions: 'Altura 55 px',
    whenToUse: [
      'Barra superior fija con acciones (login, avatar, menú).',
      'Altura estándar 55px (ε.1) para coherencia con otros productos.',
    ],
    whenNotToUse: [
      'Sidebar completo (usa Sidebar).',
    ],
    howToUse:
      'Envuelve el contenido de la derecha (o izquierda) en children. Por defecto justify-content: flex-end.',
    codeExample: `<Navbar>
  <Button href="/login">Ingresa →</Button>
</Navbar>`,
    tokens: [
      { use: 'Height', token: '--flow-kit-epsilon-height' },
      { use: 'Padding x', token: '--flow-space-xl' },
      { use: 'Border', token: '--flow-fib-3' },
    ],
    props: [
      { prop: 'children', type: 'ReactNode', default: '—', description: 'Contenido (ej. botón Ingresa)' },
    ],
  },
  'filter-bar': {
    id: 'filter-bar',
    name: 'FilterBar',
    kit: 'ε (Epsilon)',
    dimensions: 'Chips 34 px altura',
    whenToUse: [
      'Filtros horizontales (TODOS, SUBASTA, VEHÍCULOS, etc.).',
      'Selección única entre opciones en una barra.',
    ],
    whenNotToUse: [
      'Dropdowns o selects (considera componentes de formulario).',
    ],
    howToUse:
      'options = [{ id, label }], activeId = id seleccionado, onChange(id). Cada chip tiene altura 34px (ε.2).',
    codeExample: `<FilterBar
  label="FILTRAR POR"
  options={[
    { id: 'all', label: 'TODOS' },
    { id: 'auction', label: 'SUBASTA' },
  ]}
  activeId="all"
  onChange={(id) => setFilter(id)}
/>`,
    tokens: [
      { use: 'Chip height', token: '--flow-fib-9 (34px)' },
      { use: 'Gap', token: '--flow-space-md, --flow-space-sm' },
      { use: 'Radius', token: '--flow-radius-md' },
    ],
    props: [
      { prop: 'options', type: 'FilterBarOption[]', default: '[]', description: 'Opciones' },
      { prop: 'activeId', type: 'string', default: '—', description: 'Id activo' },
      { prop: 'onChange', type: '(id: string) => void', default: '—', description: 'Al cambiar selección' },
    ],
  },
  'help-banner': {
    id: 'help-banner',
    name: 'HelpBanner',
    kit: 'Compound (φ-split, icon δ)',
    dimensions: 'Icono 144×144, grid 1fr 1.618fr',
    whenToUse: [
      'Promocionar Centro de ayuda o soporte en la página.',
      'Bloque destacado con icono + texto + CTA.',
    ],
    whenNotToUse: [
      'Alertas o toasts (usa componentes de feedback).',
    ],
    howToUse:
      'title, description, ctaLabel, onCtaClick. Opcional: icon (emoji o nodo). Layout en grid φ (icon 1 / content 1.618).',
    codeExample: `<HelpBanner
  icon="🎧"
  title="CENTRO DE AYUDA"
  description="Necesitas asistencia con tus ofertas..."
  ctaLabel="IR AL CENTRO DE AYUDA"
  onCtaClick={() => {}}
/>`,
    tokens: [
      { use: 'Padding / gap', token: '--flow-space-xl' },
      { use: 'Icon size', token: '--flow-kit-delta-width, --flow-kit-delta-height' },
      { use: 'CTA height', token: '--flow-kit-epsilon-height' },
    ],
    props: [
      { prop: 'title', type: 'string', default: '—', description: 'Título' },
      { prop: 'description', type: 'string', default: '—', description: 'Párrafo' },
      { prop: 'ctaLabel', type: 'string', default: "'IR AL CENTRO DE AYUDA'", description: 'Texto del botón' },
    ],
  },
  'footer': {
    id: 'footer',
    name: 'Footer',
    kit: 'Compound (φ columns)',
    dimensions: 'Grid 1.618fr 1fr 1fr auto, max 987px',
    whenToUse: [
      'Pie de página con marca, columnas de enlaces y copyright.',
      'Múltiples columnas con la primera más ancha (φ).',
    ],
    whenNotToUse: [
      'Footer minimalista de una línea (puedes usar menos columnas).',
    ],
    howToUse:
      'brandTitle, brandSub, brandDescription. columns = [{ title, links }]. copyright y bottomLinks para la barra inferior.',
    codeExample: `<Footer
  brandTitle="VMC SUBASTAS"
  brandSub="Powered by SUBASTOP.Co"
  brandDescription="Ecosistema digital de subastas..."
  columns={[{ title: 'PLATAFORMA', links: [{ label: 'SubasCars', href: '#' }] }]}
  copyright="© 2026 VMC Subastas..."
  bottomLinks={[{ label: 'Política de Cookies', href: '#' }]}
/>`,
    tokens: [
      { use: 'Padding / gap', token: '--flow-space-2xl, --flow-space-xl' },
      { use: 'Max width', token: '--flow-fib-16 (987px)' },
      { use: 'Grid', token: '1.618fr 1fr 1fr auto' },
    ],
    props: [
      { prop: 'brandTitle', type: 'string', default: '—', description: 'Marca' },
      { prop: 'columns', type: 'FooterColumn[]', default: '[]', description: 'Columnas de enlaces' },
      { prop: 'copyright', type: 'string', default: '—', description: 'Texto copyright' },
    ],
  },
};

export const componentOrder = [
  'hero-featured',
  'asset-card',
  'sidebar',
  'button',
  'navbar',
  'filter-bar',
  'help-banner',
  'footer',
] as const;

/** Grouped by Kit for Storybook-style sidebar (Alpha, Gamma, Epsilon, Compound). */
export const componentCategories: { title: string; ids: readonly string[] }[] = [
  { title: 'Alpha (α)', ids: ['hero-featured'] },
  { title: 'Gamma (γ)', ids: ['asset-card', 'sidebar'] },
  { title: 'Epsilon (ε)', ids: ['button', 'navbar', 'filter-bar'] },
  { title: 'Compound', ids: ['help-banner', 'footer'] },
];
