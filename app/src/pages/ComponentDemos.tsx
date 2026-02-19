/**
 * Live demos for the Design System page.
 * Loaded separately so the docs page still renders if this fails.
 */
import {
  HeroFeatured,
  AssetCard,
  Sidebar,
  Button,
  Navbar,
  FilterBar,
  HelpBanner,
  Footer,
} from '@flow3/components';

const VMC_THEME = {
  detailsBg: '#312b54',
  badgeBg: '#f5d547',
  badgeColor: '#181533',
  titleColor: '#fff',
  priceColor: '#5cf9c4',
  ctaBg: '#5cf9c4',
  ctaColor: '#181533',
  cardBg: '#312b54',
  actionBg: '#181533',
  actionColor: '#fff',
  sidebarBg: '#120f2a',
  sidebarText: '#fff',
  sidebarMuted: 'rgba(255,255,255,0.7)',
  sidebarItemHover: 'rgba(255,255,255,0.08)',
  navbarBorder: 'rgba(255,255,255,0.1)',
  filterActiveBg: '#312b54',
  filterActiveColor: '#fff',
  filterInactiveBg: '#fff',
  filterInactiveColor: '#181533',
  buttonPrimaryBg: '#7d66d6',
  buttonPrimaryColor: '#fff',
  helpBannerBg: '#312b54',
  helpBannerCtaBg: '#5cf9c4',
  helpBannerCtaColor: '#181533',
  footerBg: '#120f2a',
};

interface ComponentDemosProps {
  selectedId: string;
}

export default function ComponentDemos({ selectedId }: ComponentDemosProps) {
  switch (selectedId) {
    case 'hero-featured':
      return (
        <HeroFeatured
          imageUrl="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=610&h=377&fit=crop"
          imageAlt="BMW 320i"
          badge="SUBASTA EN VIVO: 26 ENERO - 3:00 P.M."
          title="SERIES 3"
          model="BMW 320i"
          specs={['65,000 km', 'Lima']}
          price="$14,000"
          priceUnit="USD"
          ctaLabel="PARTICIPAR AHORA"
          theme={VMC_THEME}
        />
      );
    case 'asset-card':
      return (
        <AssetCard
          imageUrl="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=233&h=233&fit=crop"
          title="TOYOTA HILUX"
          meta="2024 • LIMA • DIESEL"
          price="US$ 17,999"
          theme={VMC_THEME}
        />
      );
    case 'sidebar':
      return (
        <Sidebar
          logoTitle="VMC SUBASTAS"
          logoSub="Powered by SUBASTOP.Co"
          navItems={[
            { label: 'Mañana', href: '#', icon: '📅' },
            { label: 'Tipo de oferta', href: '#' },
          ]}
          supportLabel="SOPORTE"
          supportItems={[{ label: 'Centro de ayuda', href: '#' }]}
          theme={{ bg: VMC_THEME.sidebarBg, text: VMC_THEME.sidebarText, muted: VMC_THEME.sidebarMuted, itemHover: VMC_THEME.sidebarItemHover }}
        />
      );
    case 'button':
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--flow-space-md)' }}>
          <Button size="lg" variant="primary" theme={{ bg: VMC_THEME.ctaBg, color: VMC_THEME.ctaColor }}>
            PARTICIPAR AHORA
          </Button>
          <Button size="md" variant="secondary" theme={{ bg: VMC_THEME.filterActiveBg, color: VMC_THEME.filterActiveColor }}>
            TODOS
          </Button>
          <Button href="#" theme={{ bg: VMC_THEME.buttonPrimaryBg, color: VMC_THEME.buttonPrimaryColor }}>
            Ingresa →
          </Button>
        </div>
      );
    case 'navbar':
      return (
        <Navbar theme={{ border: VMC_THEME.navbarBorder }}>
          <Button href="#" theme={{ bg: VMC_THEME.buttonPrimaryBg, color: VMC_THEME.buttonPrimaryColor }}>
            Ingresa →
          </Button>
        </Navbar>
      );
    case 'filter-bar':
      return (
        <FilterBar
          label="FILTRAR POR"
          options={[
            { id: 'all', label: 'TODOS' },
            { id: 'neg', label: 'NEGOCIABLE' },
            { id: 'sub', label: 'SUBASTA' },
          ]}
          activeId="all"
          theme={{
            labelColor: 'rgba(255,255,255,0.7)',
            activeBg: VMC_THEME.filterActiveBg,
            activeColor: VMC_THEME.filterActiveColor,
            inactiveBg: VMC_THEME.filterInactiveBg,
            inactiveColor: VMC_THEME.filterInactiveColor,
          }}
        />
      );
    case 'help-banner':
      return (
        <HelpBanner
          icon="🎧"
          title="CENTRO DE AYUDA"
          description="¿Necesitas asistencia con tus ofertas o el proceso de subastas? Accede a nuestra guía completa para tutoriales y soporte técnico especializado."
          ctaLabel="IR AL CENTRO DE AYUDA"
          theme={{
            bg: VMC_THEME.helpBannerBg,
            ctaBg: VMC_THEME.helpBannerCtaBg,
            ctaColor: VMC_THEME.helpBannerCtaColor,
          }}
        />
      );
    case 'footer':
      return (
        <Footer
          brandTitle="VMC SUBASTAS"
          brandSub="Powered by SUBASTOP.Co"
          brandDescription="Ecosistema digital de subastas de autos basado en comunidad y tecnología."
          columns={[
            { title: 'PLATAFORMA', links: [{ label: 'SubasCars', href: '#' }, { label: 'SubasBlog', href: '#' }] },
            { title: 'LEGAL', links: [{ label: 'Términos', href: '#' }, { label: 'Privacidad', href: '#' }] },
          ]}
          copyright="© 2026 VMC Subastas. Todos los derechos reservados."
          bottomLinks={[{ label: 'Política de Cookies', href: '#' }, { label: 'Mapa del Sitio', href: '#' }]}
          theme={{ bg: VMC_THEME.footerBg, text: '#fff' }}
        />
      );
    default:
      return null;
  }
}
