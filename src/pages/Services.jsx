// ============================================================
//  src/pages/Services.jsx
//  Dedicated services page with hero heading + full services grid + SEO
// ============================================================
import { useLang } from '../context/LanguageContext';
import ServicesSection from '../components/sections/ServicesSection';
import SEO from '../components/ui/SEO';

export default function Services() {
  const { t, lang } = useLang();
  const isRtl = lang === 'ar';

  return (
    <>
      <SEO
        title={t('seoServicesTitle')}
        description={t('seoServicesDesc')}
        canonical="https://01group.online/services"
        lang={lang}
      />
      {/* Page hero */}
      <section
        id="services-hero"
        className="hero container "
        style={{ minHeight: '50vh', paddingTop: '15vh' }}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <h1 className="hero-title">{t('servicesHeroTitle') || 'خبراتنا وحلولنا الرقمية'}</h1>
        <p className="hero-subtitle">{t('servicesHeroSubtitle') || 'تفاصيل عن خدماتنا الرقمية العالمية.'}</p>
      </section>

      {/* Reuse the shared ServicesSection component */}
      <ServicesSection />
    </>
  );
}
