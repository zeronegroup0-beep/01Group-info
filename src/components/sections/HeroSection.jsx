import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';

const STATS = [
  { target: 4,  prefix: '+', suffix: '',  labelKey: 'stat1' },
  { target: 45, prefix: '',  suffix: '%', labelKey: 'stat2' },
  { target: 2,  prefix: '+', suffix: '',  labelKey: 'stat3' },
];

function StatItem({ target, prefix = '', suffix = '', label }) {
  const [count, setCount] = useState(target);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const steps = 20;
    const increment = target / steps;
    const stepTime = duration / steps;

    setCount(0);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="stat-item">
      <div className="stat-number-wrapper">
        <span className="stat-number">
          {prefix}{count}{suffix}
        </span>
      </div>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function HeroSection() {
  const { t, lang } = useLang();
  const isRtl = lang === 'ar';

  return (
    <section id="hero" className="hero container text-center px-4 md:px-8 py-12 md:py-20" style={{ textAlign: 'center' }} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="hero-content-wrapper text-center mx-auto w-full" style={{ display: 'block' }}>
        <div className="hero-text-content text-center mx-auto" style={{ maxWidth: '800px', margin: '0 auto' }}>

          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-center mx-auto w-full" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.4', textAlign: 'center' }} dir={isRtl ? 'rtl' : 'ltr'}>
            {lang === 'en' ? (
              <>
                <span style={{ display: 'block' }}>We Design</span>
                <span style={{ display: 'block' }}>Scalable Digital</span>
                <span style={{ display: 'block' }}>
                  <span className="text-accent">Experiences</span>.
                </span>
              </>
            ) : t('heroTitle').includes(t('heroTitleAccent')) ? (
              <>
                {t('heroTitle').split(t('heroTitleAccent'))[0]}
                <span className="text-accent">{t('heroTitleAccent')}</span>
                {t('heroTitle').split(t('heroTitleAccent'))[1]}
              </>
            ) : (
              t('heroTitle')
            )}
          </h1>

          <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-center mx-auto w-full px-2" style={{ maxWidth: '600px', margin: '1.5rem auto', textAlign: 'center' }}>
            {t('heroSubtitle')}
          </p>

          <div className="hero-cta" style={{ justifyContent: 'center', margin: '2rem auto' }}>
            <Link to="/contact" className="btn btn-primary btn-glow magnetic" data-strength="50">
              {t('ctaProject')}
            </Link>
            <Link to="/portfolio" className="btn btn-secondary magnetic" data-strength="30">
              {t('ctaWork')}
            </Link>
          </div>

          {/* Stats: Horizontal on PC, Vertical on Mobile */}
          <div className="stats-container">
            {STATS.map(({ target, prefix, suffix, labelKey }) => (
              <StatItem 
                key={labelKey}
                target={target}
                prefix={prefix}
                suffix={suffix}
                label={t(labelKey)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
