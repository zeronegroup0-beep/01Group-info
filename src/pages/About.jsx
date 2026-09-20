// ============================================================
//  src/pages/About.jsx
//  History, team, and core values — all content from data files
// ============================================================
import { useLang } from '../context/LanguageContext';
import { coreValues } from '../data/aboutData';
import SectionTitle from '../components/ui/SectionTitle';
import SEO from '../components/ui/SEO';

export default function About() {
  const { t, lang } = useLang();

  return (
    <>
      <SEO
        title={t('seoAboutTitle')}
        description={t('seoAboutDesc')}
        canonical="https://01group.online/about"
        lang={lang}
      />
      {/* Main Page Title & History & Team */}
      <section className="container " dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ paddingTop: '15vh', paddingBottom: '10rem', minHeight: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* Main Page Header */}
        <div style={{ marginBottom: '4rem', textAlign: lang === 'ar' ? 'right' : 'left' }}>
          <h1 className="massive-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '800' }}>
            {lang === 'ar' ? 'عن 01Group للحلول الرقمية' : 'About 01Group Digital'}
          </h1>
        </div>

        <div style={{ maxWidth: '1000px', margin: '0', padding: '0', textAlign: lang === 'ar' ? 'right' : 'left', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* History */}
          <div>
            <h2 className="section-title" style={{ fontWeight: '700', fontSize: '2.25rem', marginBottom: '1.2rem' }}>
              {t('aboutHistory')}:
            </h2>
            <p style={{ fontSize: '1.35rem', color: 'var(--text-secondary)', lineHeight: '2', fontWeight: '400', margin: 0 }}>
              {t('aboutP1')}
            </p>
          </div>

          {/* Team */}
          <div>
            <h2 className="section-title" style={{ fontWeight: '700', fontSize: '2.25rem', marginBottom: '1.2rem' }}>
              {t('aboutTeam')}:
            </h2>
            <p style={{ fontSize: '1.35rem', color: 'var(--text-secondary)', lineHeight: '2', fontWeight: '400', margin: 0 }}>
              {t('aboutP2')}
            </p>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="container " style={{ paddingBottom: '2rem', paddingTop: '2rem' }}>
        <SectionTitle title={t('coreValues')} />

        <div className="core-values-grid">
          {coreValues.map((val) => (
            <div
              key={val.id}
              className="value-card magnetic cursor-trigger"
              data-strength="10"
              data-cursor="Value"
            >
              <svg
                className="value-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                dangerouslySetInnerHTML={{ __html: val.iconPath }}
              />
              <h3 className="value-title">{t(val.titleKey)}</h3>
              <p className="value-desc">
                {val.descKey ? t(val.descKey) : val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
