// ============================================================
//  src/pages/Home.jsx
//  Assembles Hero + Services + Works + Testimonials sections with SEO
// ============================================================
import { useLang } from '../context/LanguageContext';
import SEO from '../components/ui/SEO';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import WorksSection from '../components/sections/WorksSection';

export default function Home() {
  const { t, lang } = useLang();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://01group.online/#organization',
        'name': '01Group',
        'url': 'https://01group.online/',
        'logo': 'https://01group.online/logo.svg',
        'image': 'https://01group.online/og-image-v2.png',
        'description': lang === 'ar'
          ? 'شريكك التقني لتصميم وتطوير مواقع ومنصات ويب سريعة، وحلول سحابية ذكية متفصلة لنمو أعمالك ومبيعاتك.'
          : 'Partner with 01Group for cutting-edge websites, high-performance web platforms, and smart cloud architectures engineered for rapid growth.',
        'email': 'zeronegroup0@gmail.com',
        'telephone': '+201023412285',
        'sameAs': [
          'https://wa.me/201023412285'
        ],
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+201023412285',
          'contactType': 'customer service',
          'availableLanguage': ['Arabic', 'English']
        }
      },
      {
        '@type': 'WebSite',
        '@id': 'https://01group.online/#website',
        'url': 'https://01group.online/',
        'name': '01Group',
        'publisher': {
          '@id': 'https://01group.online/#organization'
        },
        'inLanguage': [lang === 'ar' ? 'ar' : 'en']
      }
    ]
  };

  return (
    <>
      <SEO
        title={t('seoHomeTitle')}
        description={t('seoHomeDesc')}
        canonical="https://01group.online/"
        jsonLd={organizationSchema}
        lang={lang}
      />
      <HeroSection />
      <ServicesSection />
      <WorksSection />
    </>
  );
}
