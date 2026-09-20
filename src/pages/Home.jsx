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
        'alternateName': [
          'زيرو وان جروب',
          '01Group Digital Agency'
        ],
        'url': 'https://01group.online',
        'logo': 'https://01group.online/logo.svg',
        'image': 'https://01group.online/og-image-v2.png',
        'description': lang === 'ar'
          ? 'وكالة زيرو وان جروب (01Group Digital Agency) شريكك التقني لتصميم وتطوير مواقع ومنصات وتطبيقات عبر 01Group Online لنمو مبيعاتك.'
          : '01Group Digital Agency (01Group Online) crafts high-converting websites, web applications, and enterprise cloud solutions.',
        'email': 'zeronegroup0@gmail.com',
        'telephone': '+201023412285',
        'sameAs': [
          'https://instagram.com/01Group',
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
        'url': 'https://01group.online',
        'name': '01Group Digital Agency',
        'alternateName': 'زيرو وان جروب',
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
