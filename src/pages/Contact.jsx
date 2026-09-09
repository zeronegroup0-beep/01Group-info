// ============================================================
//  src/pages/Contact.jsx
//  Dedicated contact page with split layout
// ============================================================
import { useState } from 'react';
import { useLang } from '../context/LanguageContext';

export default function Contact() {
  const { t, lang } = useLang();
  const activeLang = lang === 'en' ? 'en' : 'ar';
  
  const localT = {
    ar: {
      heroTitleLine1: "خلينا ننقل بيزنسك لـ",
      heroTitleLine2: "العصر الرقمي.",
      heroSubtitle: "سواء كنت محتاج سيستم لشركتك، أو متجر إلكتروني يبيع بالملايين، إحنا معاك خطوة بخطوة من أول الفكرة لحد التنفيذ.",
      whatsappBtn: "كلمنا على الواتساب فوراً",
      callBtn: "اتصل بينا هاتفياً"
    },
    en: {
      heroTitleLine1: "Let's take your business to the",
      heroTitleLine2: "Digital Era.",
      heroSubtitle: "Whether you need an enterprise system or a high-converting e-commerce store, we are here to build your success.",
      whatsappBtn: "Chat on WhatsApp",
      callBtn: "Call Us"
    }
  };

  const budgetOptions = {
    ar: [
      { value: "10k-25k", label: "10 - 25 ألف ج.م" },
      { value: "25k-50k", label: "25 - 50 ألف ج.م" },
      { value: "50k-100k", label: "50 - 100 ألف ج.م" },
      { value: "100k+", label: "أكثر من 100 ألف ج.م" }
    ],
    en: [
      { value: "10k-25k", label: "10k - 25k EGP" },
      { value: "25k-50k", label: "25k - 50k EGP" },
      { value: "50k-100k", label: "50k - 100k EGP" },
      { value: "100k+", label: "More than 100k EGP" }
    ]
  };

  // Unified form state matching the requested structure
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // In a real app, send formData to the backend here
  };

  return (
    <section
      className="container "
      style={{ paddingTop: '15vh', paddingBottom: '5vh' }}
    >
      <div className="contact-split-layout flex flex-col lg:flex-row gap-12 lg:gap-16 w-full">

        {/* Left: CTA & Direct Contact */}
        <div className="contact-left">
          <h1 className="massive-title">
            {localT[activeLang].heroTitleLine1}<br />
            <span className="accent-text">{localT[activeLang].heroTitleLine2}</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.6', maxWidth: '80%' }}>
            {localT[activeLang].heroSubtitle}
          </p>

          <div style={{ marginBottom: '3rem' }}>
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="direct-contact-btn whatsapp-btn magnetic" data-strength="20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {localT[activeLang].whatsappBtn}
            </a>
            <a href="tel:+1234567890" className="direct-contact-btn magnetic" data-strength="20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              {localT[activeLang].callBtn}
            </a>
            <a href="mailto:hello@01group.com" className="direct-contact-btn magnetic" data-strength="20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              hello@01group.com
            </a>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="contact-right w-full lg:w-1/2">
          <form className="contact-form space-y-6" id="contactForm" style={{ margin: '0' }} onSubmit={handleSubmit}>
            
            {/* Row 1: Name & Email */}
            <div className="form-row flex flex-col md:flex-row gap-4 md:gap-6 w-full">
              <div className="input-group w-full">
                <input className="w-full" type="text" id="name" name="name" required placeholder=" " value={formData.name} onChange={handleChange} />
                <label htmlFor="name">{t('formName')}</label>
              </div>
              <div className="input-group w-full">
                <input className="w-full" type="email" id="email" name="email" required placeholder=" " value={formData.email} onChange={handleChange} />
                <label htmlFor="email">{t('formEmail')}</label>
              </div>
            </div>

            {/* Row 2: Phone & Service */}
            <div className="form-row flex flex-col md:flex-row gap-4 md:gap-6 w-full">
              <div className="input-group w-full">
                <input 
                  className="w-full"
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required 
                  placeholder=" " 
                  value={formData.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^\d+]/g, '');
                    setFormData({ ...formData, phone: val });
                  }}
                />
                <label htmlFor="phone">{t('formPhone') || 'Phone / WhatsApp'}</label>
              </div>
              <div className="input-group w-full">
                <div style={{ position: 'relative', width: '100%' }}>
                  <select 
                    className="w-full"
                    id="service" 
                    name="service" 
                    required 
                    value={formData.service} 
                    onChange={handleChange}
                    style={{
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      paddingRight: activeLang === 'ar' ? '0' : '3.5rem',
                      paddingLeft: activeLang === 'ar' ? '3.5rem' : '0',
                      textAlign: activeLang === 'ar' ? 'right' : 'left',
                      backgroundImage: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="" disabled style={{ backgroundColor: '#111111', color: '#6b7280' }}>{t('formProjectType')}</option>
                    <option value="web" style={{ backgroundColor: '#111111', color: '#ffffff' }}>{t('formOptWeb')}</option>
                    <option value="mobile" style={{ backgroundColor: '#111111', color: '#ffffff' }}>{t('formOptMobile')}</option>
                    <option value="ecommerce" style={{ backgroundColor: '#111111', color: '#ffffff' }}>{t('formOptEcommerce')}</option>
                    <option value="ai" style={{ backgroundColor: '#111111', color: '#ffffff' }}>{t('formOptAi')}</option>
                    <option value="other" style={{ backgroundColor: '#111111', color: '#ffffff' }}>{t('formOptOther')}</option>
                  </select>
                  
                  <div 
                    style={{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: '#9ca3af',
                      width: '16px',
                      height: '16px',
                      left: activeLang === 'ar' ? '1.5rem' : 'auto',
                      right: activeLang === 'ar' ? 'auto' : '1.5rem'
                    }}
                  >
                    <svg style={{ width: '100%', height: '100%', fill: 'currentColor' }} viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Budget */}
            <div className="input-group w-full" style={{ marginBottom: '1.5rem' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <select 
                  className="w-full"
                  id="budget" 
                  name="budget" 
                  required 
                  value={formData.budget} 
                  onChange={handleChange}
                  style={{
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    paddingRight: activeLang === 'ar' ? '0' : '3.5rem',
                    paddingLeft: activeLang === 'ar' ? '3.5rem' : '0',
                    textAlign: activeLang === 'ar' ? 'right' : 'left',
                    backgroundImage: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="" disabled style={{ backgroundColor: '#111111', color: '#6b7280' }}>{t('formBudget') || 'ميزانية المشروع'}</option>
                  {budgetOptions[activeLang].map((opt) => (
                    <option key={opt.value} value={opt.value} style={{ backgroundColor: '#111111', color: '#ffffff' }}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                
                <div 
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#9ca3af',
                    width: '16px',
                    height: '16px',
                    left: activeLang === 'ar' ? '1.5rem' : 'auto',
                    right: activeLang === 'ar' ? 'auto' : '1.5rem'
                  }}
                >
                  <svg style={{ width: '100%', height: '100%', fill: 'currentColor' }} viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Row 4: Message */}
            <div className="input-group w-full" style={{ marginBottom: '2rem' }}>
              <textarea className="w-full" id="message" name="message" rows="4" required placeholder=" " value={formData.message} onChange={handleChange}></textarea>
              <label htmlFor="message">{t('formMessage')}</label>
            </div>

            <button type="submit" className="btn btn-primary magnetic submit-btn" data-strength="40" style={{ width: '100%' }}>
              <span>{t('formSubmit')}</span>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '10px' }}>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
