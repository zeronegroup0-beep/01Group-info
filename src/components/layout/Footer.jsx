// ============================================================
//  src/components/layout/Footer.jsx
//  Site footer with contact form, social links, and copyright
// ============================================================
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import { useState, useRef, useEffect } from 'react';

export default function Footer() {
  const { t, lang } = useLang();
  const location = useLocation();
  const isRtl = lang === 'ar';
  const [budgetVal, setBudgetVal] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const selectRef = useRef(null);

  // Clear validation bubbles and close dropdowns when navigating between pages
  useEffect(() => {
    setErrors({});
    setIsSelectOpen(false);
    setSubmitStatus(null);
  }, [location.pathname]);

  const handleInput = (e) => {
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newErrors = {};
    const elements = form.elements;
    let hasError = false;
    
    // Validate required fields
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      if (el.name && el.required && !el.value.trim()) {
        newErrors[el.name] = true;
        hasError = true;
      }
    }
    
    // Custom phone validation
    const phoneEl = elements['phone'];
    if (phoneEl && phoneEl.value.trim()) {
      if (!/^01\d{9}$/.test(phoneEl.value.trim())) {
        newErrors['phone'] = true;
        hasError = true;
      }
    }

    // Custom email validation
    const emailEl = elements['email'];
    if (emailEl && emailEl.value.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
        newErrors['email'] = true;
        hasError = true;
      }
    }
    
    if (hasError) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    const data = {
      name: elements['name']?.value || '',
      email: elements['email']?.value || '',
      phone: elements['phone']?.value || '',
      budget: budgetVal ? `${budgetVal} ${isRtl ? 'ج.م' : 'EGP'}` : (elements['budget']?.value || 'غير محددة'),
      message: elements['message']?.value || ''
    };

    const payload = {
      "اسم العميل": data.name,
      "البريد الإلكتروني": data.email,
      "رقم التليفون / واتساب": data.phone,
      "الميزانية المتوقعة": data.budget,
      "تفاصيل المشروع": data.message,
      _subject: `طلب تواصل جديد من موقع 01 Group: ${data.name} (${data.phone})`,
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

      const result = await res.json().catch(() => ({}));

      if (res.ok && (result.success === true || result.success === 'true')) {
        setSubmitStatus('success');
        setSubmittedData(data);
        form.reset();
        setBudgetVal('');
      } else if (result.message && (result.message.includes('Activation') || result.message.includes('actived') || result.message.includes('Activate'))) {
        setSubmitStatus('activation_required');
        setSubmittedData(data);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Footer form submission error:', err);
      setSubmitStatus('error');
      const mailtoSubject = encodeURIComponent(`طلب مشروع جديد من: ${data.name}`);
      const mailtoBody = encodeURIComponent(
        `الاسم: ${data.name}\nالبريد: ${data.email}\nالهاتف/واتساب: ${data.phone}\nالميزانية: ${data.budget}\nالتفاصيل:\n${data.message}`
      );
      window.open(`mailto:zeronegroup0@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderValidationBubble = (fieldName) => {
    if (!errors[fieldName]) return null;
    
    const errorKeys = {
      name: 'errName',
      email: 'errEmail',
      phone: 'errPhone',
      budget: 'errBudget',
      message: 'errMessage'
    };

    return (
      <div className="validation-bubble">
        <span className="validation-icon">!</span>
        <span>{t(errorKeys[fieldName])}</span>
      </div>
    );
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <footer id="contact" className="footer-section" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container footer-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full" style={{ textAlign: isRtl ? 'right' : 'left' }}>
        {/* Left: CTA & Social */}
        <div className="contact-info">
          <h2 className="massive-title" dir={isRtl ? 'rtl' : 'ltr'} style={{ lineHeight: isRtl ? '1.4' : '1.1', overflow: 'visible', paddingBottom: '0.2em' }}>
            {t('ctaScale').replace(t('ctaScaleAccent'), '')}
            <span className="text-accent" style={{ display: 'inline-block', paddingRight: '0.15em', paddingBottom: '0.2em', paddingTop: '0.1em' }}>
              {t('ctaScaleAccent')}
            </span>
          </h2>
          <p className="contact-subtext" dir={isRtl ? 'rtl' : 'ltr'}>{t('footerSubtitle')}</p>

          <div className="social-links">
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

        {/* Right: Contact form */}
        <form className="contact-form space-y-6 w-full" id="contactForm" onSubmit={handleSubmit} onInput={handleInput} noValidate>
          <div className="form-row flex flex-col md:flex-row gap-4 w-full">
            <div className="input-group w-full">
              <input className="w-full" type="text" id="footer-name" name="name" required placeholder=" " />
              <label htmlFor="footer-name">{t('formName')}</label>
              {renderValidationBubble('name')}
            </div>
            <div className="input-group w-full">
              <input className="w-full" type="email" id="footer-email" name="email" required placeholder=" " />
              <label htmlFor="footer-email">{t('formEmail')}</label>
              {renderValidationBubble('email')}
            </div>
          </div>

          <div className="form-row flex flex-col md:flex-row gap-4 w-full">
            <div className="input-group w-full">
              <input 
                className="w-full"
                type="tel" 
                id="footer-phone" 
                name="phone" 
                required 
                placeholder=" " 
                maxLength="11"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, ''); // Numbers only
                }}
              />
              <label htmlFor="footer-phone">{t('formPhone')}</label>
              {renderValidationBubble('phone')}
            </div>

            <div className={`input-group w-full custom-select-wrapper ${isSelectOpen || budgetVal ? 'active' : ''}`} ref={selectRef}>
              
              {/* Pure non-input Trigger - Zero Keyboard Flashes */}
              <div 
                role="button"
                tabIndex={0}
                dir="ltr"
                style={{ 
                  textAlign: isRtl ? 'right' : 'left', 
                  unicodeBidi: 'isolate', 
                  cursor: 'pointer',
                  outline: 'none',
                  userSelect: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: '54px',
                  width: '100%',
                  color: budgetVal ? '#ffffff' : 'transparent',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsSelectOpen(!isSelectOpen);
                }}
                className="dropdown-trigger-input w-full"
              >
                {budgetVal ? `${budgetVal} ${isRtl ? 'ج.م' : 'EGP'}` : <span style={{ opacity: 0 }}>.</span>}
              </div>
              <label htmlFor="footer-budget" onClick={() => setIsSelectOpen(!isSelectOpen)} style={{ cursor: 'pointer' }}>{t('formBudget')}</label>
              
              {/* Invisible input for form submission state placed AFTER label to avoid CSS sibling selector bugs */}
              <input type="hidden" id="footer-budget" name="budget" required value={budgetVal} />
              
              <div className="dropdown-icons-container" dir="ltr">
                <svg 
                  className={`dropdown-chevron ${isSelectOpen ? 'open' : ''}`} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  width="20" 
                  height="20"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>

                {budgetVal && (
                  <span 
                    className="dropdown-clear" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setBudgetVal('');
                      setIsSelectOpen(false);
                    }}
                    title="Clear selection"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </span>
                )}
              </div>
              {renderValidationBubble('budget')}
              
              <div className={`custom-dropdown-menu ${isSelectOpen ? 'show' : ''}`}>
                {['10,000 - 25,000', '25,000 - 50,000', '50,000 - 100,000', '+100,000'].map(val => (
                  <div 
                    key={val} 
                    className={`dropdown-option ${budgetVal === val ? 'selected' : ''}`}
                    onClick={() => {
                      setBudgetVal(val);
                      setIsSelectOpen(false);
                      if (errors.budget) {
                        setErrors(prev => ({ ...prev, budget: false }));
                      }
                    }}
                  >
                    <span dir="ltr" style={{ display: 'inline-block', unicodeBidi: 'isolate' }}>{val} {isRtl ? 'ج.م' : 'EGP'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="input-group w-full">
            <textarea className="w-full" id="footer-message" name="message" rows="3" required placeholder=" "></textarea>
            <label htmlFor="footer-message">{t('formMessage')}</label>
            {renderValidationBubble('message')}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="btn btn-primary submit-btn magnetic" 
            data-strength="40"
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting 
              ? (isRtl ? 'جاري الإرسال...' : 'Sending...') 
              : t('formSubmit')}
          </button>

          {/* Success Feedback */}
          {submitStatus === 'success' && (
            <div 
              style={{
                marginTop: '1rem',
                padding: '1.25rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(34, 197, 94, 0.08)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#4ade80', marginBottom: '0.4rem' }}>
                {isRtl ? '🎉 تم إرسال رسالتك بنجاح!' : '🎉 Message Sent Successfully!'}
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                {isRtl 
                  ? 'وصلت رسالتك لفريق 01 Group وسنتواصل معك قريباً. يمكنك أيضاً المتابعة عبر واتساب:' 
                  : 'Your request reached our team and we will reach out shortly.'}
              </p>
              {submittedData && (
                <a
                  href={`https://wa.me/201023412285?text=${encodeURIComponent(
                    `مرحباً 01 Group، أرسلت طلباً عبر الموقع:\n- الاسم: ${submittedData.name}\n- الهاتف: ${submittedData.phone}\n- الميزانية: ${submittedData.budget}\n- الرسالة: ${submittedData.message}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="direct-contact-btn whatsapp-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', gap: '8px', padding: '0.6rem 1.25rem', textDecoration: 'none' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{isRtl ? 'متابعة عبر واتساب 💬' : 'Follow up on WhatsApp 💬'}</span>
                </a>
              )}
            </div>
          )}

          {/* One-Time Activation Required Alert */}
          {submitStatus === 'activation_required' && (
            <div 
              style={{
                marginTop: '1rem',
                padding: '1.25rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(234, 179, 8, 0.08)',
                border: '1px solid rgba(234, 179, 8, 0.4)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#facc15', marginBottom: '0.4rem' }}>
                {isRtl ? '⚠️ خطوة أخيرة لتفعيل استلام الرسائل!' : '⚠️ One-Time Activation Required!'}
              </div>
              <p style={{ fontSize: '0.9rem', color: '#fef08a', marginBottom: '1rem', lineHeight: '1.5' }}>
                {isRtl 
                  ? 'وصلت رسالة تأكيد إلى zeronegroup0@gmail.com. يرجى الضغط على زر "Activate Form" لتفعيل استلام جميع الرسائل القادمة تلقائياً.' 
                  : 'Please check zeronegroup0@gmail.com and click "Activate Form" once.'}
              </p>
              {submittedData && (
                <a
                  href={`https://wa.me/201023412285?text=${encodeURIComponent(
                    `مرحباً 01 Group، أرسلت طلباً عبر الموقع:\n- الاسم: ${submittedData.name}\n- الهاتف: ${submittedData.phone}\n- الميزانية: ${submittedData.budget}\n- الرسالة: ${submittedData.message}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="direct-contact-btn whatsapp-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', gap: '8px', padding: '0.6rem 1.25rem', textDecoration: 'none' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{isRtl ? 'إرسال عبر واتساب الآن 💬' : 'Send via WhatsApp now 💬'}</span>
                </a>
              )}
            </div>
          )}

          {/* Error Feedback */}
          {submitStatus === 'error' && (
            <div 
              style={{
                marginTop: '1rem',
                padding: '0.75rem',
                borderRadius: '10px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                textAlign: 'center',
                fontSize: '0.9rem'
              }}
            >
              {isRtl 
                ? 'تم فتح تطبيق البريد لإرسال رسالتك، أو راسلنا مباشرة عبر واتساب.' 
                : 'Opened your mail app to send the request, or reach us directly on WhatsApp.'}
            </div>
          )}
        </form>
      </div>

      <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%' }}>
        <p style={{ textAlign: 'center', margin: 0, width: '100%' }}>
          {isRtl ? (
            <>
              © 2026 <span dir="ltr" style={{ display: 'inline-block', unicodeBidi: 'isolate' }}>01 Group</span> للحلول الرقمية. جميع الحقوق محفوظة.
            </>
          ) : (
            <>
              © 2026 <span dir="ltr" style={{ display: 'inline-block', unicodeBidi: 'isolate' }}>01 Group Digital Solutions</span>. All rights reserved.
            </>
          )}
        </p>
      </div>
    </footer>
  );
}
