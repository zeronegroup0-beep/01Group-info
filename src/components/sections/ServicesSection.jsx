// ============================================================
//  src/components/sections/ServicesSection.jsx
//  Services grid — maps over servicesData, no hardcoded content
// ============================================================
import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import { servicesData } from '../../data/servicesData';
import SectionTitle from '../ui/SectionTitle';

export default function ServicesSection() {
  const { t, lang } = useLang();
  const isRtl = lang === 'ar';

  const handleExpand = (e) => {
    const card = e.currentTarget.closest('.service-card');
    if (!card) return;
    const isExpanded = card.classList.contains('expanded') || card.classList.contains('is-active');
    const grid = card.closest('.services-grid');
    // Close all
    document.querySelectorAll('.service-card').forEach((c) => {
      c.classList.remove('is-active', 'expanded');
    });
    if (grid) grid.classList.remove('has-expanded');
    // Toggle clicked
    if (!isExpanded) {
      card.classList.add('is-active', 'expanded');
      if (grid) grid.classList.add('has-expanded');
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    document.querySelectorAll('.service-card').forEach((c) => {
      c.classList.remove('is-active', 'expanded');
    });
    const grid = document.getElementById('servicesGrid');
    if (grid) grid.classList.remove('has-expanded');
  };

  return (
    <section id="services" className="services-section container" dir={isRtl ? 'rtl' : 'ltr'} style={{ textAlign: isRtl ? 'right' : 'left' }}>
      <SectionTitle
        title={t('expertiseTitle')}
        accent={t('expertiseTitleAccent')}
        desc={t('expertiseDesc')}
      />
      <div className="section-header-divider"></div>

      <div className="services-grid" id="servicesGrid">
        {servicesData.map((svc) => (
          <div
            key={svc.id}
            className="service-card  magnetic cursor-trigger"
            data-strength="10"
            data-cursor="cursor_details"
            onClick={handleExpand}
          >
            <button className="close-card-btn" onClick={handleClose}>✕</button>

            <div className="service-number">{svc.number}</div>

            <div className="card-content">
              <div className="service-icon" style={{ color: '#ffffff' }}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"
                  dangerouslySetInnerHTML={{ __html: svc.iconPath }}
                />
              </div>
              <h3 className="service-title">{t(svc.titleKey)}</h3>
              <p className="service-desc">{t(svc.descKey)}</p>
            </div>

            <div className="expanded-details" style={{ textAlign: isRtl ? 'right' : 'left' }}>
              <div className="details-column">
                <h4 className="drawer-title">{t('benefitsTitle')}</h4>
                <p className="drawer-text">{svc.benefitText}</p>
              </div>
              <div className="details-column">
                <h4 className="drawer-title">{t('valueTitle')}</h4>
                <ul style={{ color: '#aaa', lineHeight: '1.8', marginBottom: '24px', paddingLeft: '20px' }}>
                  {svc.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
                <Link to={`/contact?service=${svc.contactParam}`} className="btn btn-primary">
                  {t('ctaBtn')}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
