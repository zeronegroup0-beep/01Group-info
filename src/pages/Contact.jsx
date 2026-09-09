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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const [submittedData, setSubmittedData] = useState(null);

  const serviceLabels = {
    ar: {
      web: "موقع ويب تعريفي / متقدم",
      mobile: "تطبيق موبايل (iOS / Android)",
      ecommerce: "متجر إلكتروني احترافي",
      ai: "حلول وأنظمة الذكاء الاصطناعي",
      other: "أخرى / فكرة مخصصة"
    },
    en: {
      web: "Custom Web Application",
      mobile: "Mobile Application (iOS / Android)",
      ecommerce: "E-Commerce Platform",
      ai: "AI Solutions & Automation",
      other: "Other Custom Project"
    }
  };

  const getBudgetLabel = (val) => {
    const opt = budgetOptions[activeLang]?.find((o) => o.value === val);
    return opt ? opt.label : val;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const sLabel = serviceLabels[activeLang][formData.service] || formData.service || (activeLang === 'ar' ? 'غير محدد' : 'Not specified');
    const bLabel = getBudgetLabel(formData.budget) || (activeLang === 'ar' ? 'غير محدد' : 'Not specified');

    const payload = {
      "اسم العميل": formData.name,
      "البريد الإلكتروني": formData.email,
      "رقم التليفون / واتساب": formData.phone,
      "نوع المشروع": sLabel,
      "الميزانية المتوقعة": bLabel,
      "تفاصيل المشروع": formData.message,
      _subject: `طلب مشروع جديد: ${formData.name} (${formData.phone})`,
      _template: 'table',
      _captcha: 'false'
    };

    try {
      const res = await fetch('https://formsubmit.co/ajax/zeronegroup0@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && (data.success === true || data.success === 'true')) {
        setSubmitStatus('success');
        setSubmittedData({ ...formData, serviceLabel: sLabel, budgetLabel: bLabel });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          budget: '',
          message: ''
        });
      } else if (data.message && (data.message.includes('Activation') || data.message.includes('actived') || data.message.includes('Activate'))) {
        setSubmitStatus('activation_required');
        setSubmittedData({ ...formData, serviceLabel: sLabel, budgetLabel: bLabel });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus('error');
      const mailtoSubject = encodeURIComponent(`طلب مشروع جديد من: ${formData.name}`);
      const mailtoBody = encodeURIComponent(
        `الاسم: ${formData.name}\nالبريد: ${formData.email}\nالهاتف/واتساب: ${formData.phone}\nنوع المشروع: ${sLabel}\nالميزانية: ${bLabel}\nالتفاصيل:\n${formData.message}`
      );
      window.open(`mailto:zeronegroup0@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');
    } finally {
      setIsSubmitting(false);
    }
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

          <div style={{ marginBottom: '2.5rem' }}>
            <a href="https://wa.me/201023412285" target="_blank" rel="noreferrer" className="direct-contact-btn whatsapp-btn magnetic" data-strength="20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {localT[activeLang].whatsappBtn}
            </a>
            <a href="tel:+201023412285" className="direct-contact-btn magnetic" data-strength="20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              {localT[activeLang].callBtn}
            </a>
            <a href="mailto:zeronegroup0@gmail.com" className="direct-contact-btn magnetic" data-strength="20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              zeronegroup0@gmail.com
            </a>
          </div>

          <div className="social-links" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
            <a
              href="https://wa.me/201023412285"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic social-whatsapp"
              data-strength="30"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.301-.15-1.782-.88-2.058-.98-.276-.1-.476-.15-.677.15-.201.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.799-1.5-1.787-1.676-2.088-.175-.3-.019-.462.132-.612.136-.135.301-.351.452-.527.15-.175.201-.3.301-.501.101-.201.05-.376-.025-.526-.075-.15-.677-1.632-.928-2.238-.244-.59-.493-.51-.677-.52-.175-.008-.376-.01-.577-.01s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.512 0 1.482 1.079 2.913 1.23 3.114.15.201 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.722.23 1.379.197 1.898.12.578-.087 1.782-.728 2.033-1.432.251-.703.251-1.305.176-1.431-.076-.126-.277-.202-.578-.352z"/>
                <path d="M12.04 2c-5.464 0-9.915 4.45-9.915 9.915 0 1.747.457 3.453 1.326 4.96L2 22l5.253-1.378a9.88 9.88 0 0 0 4.787 1.228h.004c5.463 0 9.915-4.451 9.915-9.916 0-2.648-1.031-5.138-2.903-7.01A9.847 9.847 0 0 0 12.04 2zm0 18.172h-.003a8.21 8.21 0 0 1-4.186-1.144l-.3-.178-3.111.816.83-3.033-.195-.311A8.2 8.2 0 0 1 3.84 11.915c0-4.52 3.678-8.198 8.2-8.198a8.16 8.16 0 0 1 5.803 2.404 8.16 8.16 0 0 1 2.403 5.804c0 4.522-3.678 8.198-8.204 8.198z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/zero_0ne_group/?__pwa=1"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic social-instagram"
              data-strength="30"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61593454711340"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic social-facebook"
              data-strength="30"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
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

            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="btn btn-primary magnetic submit-btn" 
              data-strength="40" 
              style={{ 
                width: '100%', 
                opacity: isSubmitting ? 0.7 : 1, 
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <span>
                {isSubmitting 
                  ? (activeLang === 'ar' ? 'جاري إرسال تفاصيل مشروعك...' : 'Sending your project details...') 
                  : t('formSubmit')}
              </span>
              {!isSubmitting && (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              )}
            </button>

            {/* Success Feedback Alert */}
            {submitStatus === 'success' && (
              <div 
                style={{
                  marginTop: '1.5rem',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(34, 197, 94, 0.08)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  boxShadow: '0 8px 32px rgba(34, 197, 94, 0.1)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#4ade80', marginBottom: '0.5rem' }}>
                  {activeLang === 'ar' ? '🎉 تم إرسال تفاصيل مشروعك بنجاح!' : '🎉 Project Details Sent Successfully!'}
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                  {activeLang === 'ar' 
                    ? 'وصلت رسالتك لإيميل الشركة، وفريقنا هيراجع التفاصيل ويتواصل معاك في أقرب وقت ممكن.' 
                    : 'Your inquiry has been delivered directly to our inbox. Our team will reach out to you shortly.'}
                </p>
                {submittedData && (
                  <a
                    href={`https://wa.me/201023412285?text=${encodeURIComponent(
                      `مرحباً 01 Group، لقد قمت بإرسال تفاصيل مشروعي عبر الموقع:\n- الاسم: ${submittedData.name}\n- الهاتف: ${submittedData.phone}\n- نوع المشروع: ${submittedData.serviceLabel}\n- الميزانية: ${submittedData.budgetLabel}\n- التفاصيل: ${submittedData.message}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="direct-contact-btn whatsapp-btn"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', gap: '8px', padding: '0.75rem 1.5rem', textDecoration: 'none' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{activeLang === 'ar' ? 'تأكيد الرسالة فوراً عبر واتساب 💬' : 'Confirm via WhatsApp 💬'}</span>
                  </a>
                )}
              </div>
            )}

            {/* One-Time Email Activation Required Alert */}
            {submitStatus === 'activation_required' && (
              <div 
                style={{
                  marginTop: '1.5rem',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(234, 179, 8, 0.08)',
                  border: '1px solid rgba(234, 179, 8, 0.4)',
                  boxShadow: '0 8px 32px rgba(234, 179, 8, 0.1)',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#facc15', marginBottom: '0.6rem' }}>
                  {activeLang === 'ar' ? '⚠️ مطلوب تفعيل بريدك الإلكتروني لمرة واحدة فقط!' : '⚠️ One-Time Activation Required!'}
                </div>
                <p style={{ fontSize: '0.95rem', color: '#fef08a', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                  {activeLang === 'ar' 
                    ? 'تم إرسال رابط تأكيد من خدمة FormSubmit إلى بريدك zeronegroup0@gmail.com. يرجى فتح البريد (وتفقد مجلد Spam إذا لزم) والضغط على زر "Activate Form". بمجرد الضغط عليه، سيتم استلام كل الرسائل القادمة تلقائياً وفورياً!' 
                    : 'A confirmation link has been sent to zeronegroup0@gmail.com. Please open your inbox (or Spam) and click "Activate Form" once to activate direct email delivery.'}
                </p>
                {submittedData && (
                  <a
                    href={`https://wa.me/201023412285?text=${encodeURIComponent(
                      `مرحباً 01 Group، لقد قمت بإرسال تفاصيل مشروعي عبر الموقع:\n- الاسم: ${submittedData.name}\n- الهاتف: ${submittedData.phone}\n- نوع المشروع: ${submittedData.serviceLabel}\n- الميزانية: ${submittedData.budgetLabel}\n- التفاصيل: ${submittedData.message}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="direct-contact-btn whatsapp-btn"
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', gap: '8px', padding: '0.75rem 1.5rem', textDecoration: 'none' }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{activeLang === 'ar' ? 'إرسال التفاصيل عبر واتساب الآن لحين التفعيل 💬' : 'Send via WhatsApp now 💬'}</span>
                  </a>
                )}
              </div>
            )}

            {/* Fallback Error Alert */}
            {submitStatus === 'error' && (
              <div 
                style={{
                  marginTop: '1.25rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#f87171',
                  textAlign: 'center'
                }}
              >
                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                  {activeLang === 'ar' 
                    ? 'تم فتح تطبيق البريد الخاص بك لإرسال الرسالة، أو تواصل معنا مباشرة عبر واتساب.'
                    : 'Your email app was opened to send your inquiry, or connect with us directly via WhatsApp.'}
                </p>
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
