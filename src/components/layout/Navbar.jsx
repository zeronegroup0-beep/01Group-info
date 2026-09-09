// ============================================================
//  src/components/layout/Navbar.jsx
//  Top navigation — logo, links, language toggle, CTA
// ============================================================
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';

export default function Navbar() {
  const { t, toggleLang, lang } = useLang();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isRtl = lang === 'ar';

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100dvh';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    }
    return () => { 
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    };
  }, [isMobileMenuOpen]);

  // Prevent swiping/scrolling gestures on the overlay itself
  const handleTouchMove = (e) => {
    if (isMobileMenuOpen) {
      e.preventDefault();
    }
  };

  return (
    <>
      <style>{`
        /* Hide Hamburger on Desktop & Show Desktop Nav Links */
        @media (min-width: 1024px) {
          .mobile-toggle-btn {
            display: none !important;
          }
          .desktop-nav-links {
            display: flex !important;
          }
        }

        /* Show Hamburger on Mobile & Hide Desktop Nav Links */
        @media (max-width: 1023px) {
          .mobile-toggle-btn {
            display: flex !important;
          }
          .desktop-nav-links {
            display: none !important;
          }
        }
      `}</style>

      {/* Spacer to prevent content overlap from fixed header */}
      <div style={{ height: '80px', width: '100%', flexShrink: 0 }} aria-hidden="true" />

      <header 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          width: '100%',
          zIndex: 1000,
          backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.85)' : 'rgba(10, 10, 10, 0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '14px 24px',
          margin: 0,
          boxSizing: 'border-box',
          transition: 'background-color 0.3s ease, border-color 0.3s ease'
        }}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <Link
            to="/"
            className="brand-logo-text magnetic"
            data-strength="20"
            dir="ltr"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="brand-name">01</span>{' '}
            <span className="brand-group">GROUP</span>
          </Link>

          {/* STATIC MOBILE TOGGLE HAMBURGER BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="mobile-toggle-btn"
            style={{
              width: '40px',
              height: '40px',
              gap: '6px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
            aria-label="Open Mobile Menu"
          >
            <span style={{ width: '26px', height: '2.5px', backgroundColor: '#ffffff', borderRadius: '2px' }} />
            <span style={{ width: '26px', height: '2.5px', backgroundColor: '#ffffff', borderRadius: '2px' }} />
            <span style={{ width: '26px', height: '2.5px', backgroundColor: '#ffffff', borderRadius: '2px' }} />
          </button>

          {/* Desktop Nav links */}
          <nav className="desktop-nav-links" style={{ alignItems: 'center', gap: '32px' }}>
            <NavLink to="/"        className="magnetic" data-strength="15">{t('navHome')}</NavLink>
            <NavLink to="/about"   className="magnetic" data-strength="15">{t('navAbout')}</NavLink>
            <NavLink to="/services" className="magnetic" data-strength="15">{t('navServices')}</NavLink>
            <NavLink to="/portfolio" className="magnetic" data-strength="15">{t('navWork')}</NavLink>

            {/* Language toggle */}
            <button
              onClick={toggleLang}
              className="lang-toggle-btn btn btn-nav magnetic"
              id="langToggle"
              data-strength="15"
              style={{
                padding: '6px 14px', 
                borderRadius: '9999px', 
                border: '1px solid #404040', 
                backgroundColor: '#171717', 
                color: '#ffffff', 
                fontSize: '12px', 
                cursor: 'pointer', 
                fontWeight: '600'
              }}
            >
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>

            {/* CTA */}
            <Link to="/contact" className="btn btn-nav magnetic" data-strength="30" style={{ padding: '10px 22px', backgroundColor: '#ffffff', color: '#000000', fontWeight: 'bold', borderRadius: '9999px', textDecoration: 'none', fontSize: '14px' }}>
              {t('ctaProject')}
            </Link>
          </nav>
        </div>
      </header>

      {/* PORTAL TO BODY: Prevents any parent clipping/transform bugs */}
      {mounted && createPortal(
        <div 
          onTouchMove={handleTouchMove}
          style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 999998, 
            width: '100vw', 
            height: '100dvh', 
            display: 'flex',
            pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
            visibility: isMobileMenuOpen ? 'visible' : 'hidden',
            transition: isMobileMenuOpen ? 'visibility 0s' : 'visibility 0s 350ms',
            overflow: 'hidden',
            touchAction: 'none',
            overscrollBehavior: 'contain'
          }}
        >
          {/* Animated Backdrop */}
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: 'opacity 350ms cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 999998
            }}
          />

          {/* Sliding Navigation Drawer */}
          <aside 
            dir={isRtl ? 'rtl' : 'ltr'}
            style={{
              position: 'fixed',
              top: 0,
              bottom: 0,
              left: isRtl ? 0 : 'auto',
              right: isRtl ? 'auto' : 0,
              width: '85%',
              maxWidth: '360px',
              height: '100vh',
              backgroundColor: '#0a0a0a',
              borderRight: isRtl ? '1px solid #262626' : 'none',
              borderLeft: isRtl ? 'none' : '1px solid #262626',
              zIndex: 999999,
              padding: '90px 24px 32px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: isRtl ? '10px 0 25px rgba(0,0,0,0.5)' : '-10px 0 25px rgba(0,0,0,0.5)',
              transform: isMobileMenuOpen ? 'translateX(0)' : (isRtl ? 'translateX(-100%)' : 'translateX(100%)'),
              transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* EXPLICIT CLOSE 'X' BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                position: 'absolute',
                top: '24px',
                left: isRtl ? '24px' : 'auto',
                right: isRtl ? 'auto' : '24px',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                zIndex: 1000000
              }}
              aria-label="Close Mobile Menu"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Navigation Links */}
            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px', margin: 'auto 0', textAlign: 'center' }}>
              {[
                { to: '/',          label: t('navHome') },
                { to: '/about',     label: t('navAbout') },
                { to: '/services',  label: t('navServices') },
                { to: '/portfolio', label: t('navWork') },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="active:scale-95 active:opacity-80 transition-all duration-200"
                  style={{ fontSize: '30px', fontWeight: '700', color: '#ffffff', textDecoration: 'none' }}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Bottom Action Section */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', paddingTop: '16px', borderTop: '1px solid #262626' }}>
              <div className="social-links" style={{ margin: '0', gap: '14px', justifyContent: 'center' }}>
                <a
                  href="https://wa.me/201023412285"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-whatsapp"
                  aria-label="WhatsApp"
                  style={{ width: '44px', height: '44px' }}
                >
                  <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px' }}>
                    <path d="M17.472 14.382c-.301-.15-1.782-.88-2.058-.98-.276-.1-.476-.15-.677.15-.201.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.799-1.5-1.787-1.676-2.088-.175-.3-.019-.462.132-.612.136-.135.301-.351.452-.527.15-.175.201-.3.301-.501.101-.201.05-.376-.025-.526-.075-.15-.677-1.632-.928-2.238-.244-.59-.493-.51-.677-.52-.175-.008-.376-.01-.577-.01s-.527.075-.803.376c-.276.301-1.054 1.03-1.054 2.512 0 1.482 1.079 2.913 1.23 3.114.15.201 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.722.23 1.379.197 1.898.12.578-.087 1.782-.728 2.033-1.432.251-.703.251-1.305.176-1.431-.076-.126-.277-.202-.578-.352z"/>
                    <path d="M12.04 2c-5.464 0-9.915 4.45-9.915 9.915 0 1.747.457 3.453 1.326 4.96L2 22l5.253-1.378a9.88 9.88 0 0 0 4.787 1.228h.004c5.463 0 9.915-4.451 9.915-9.916 0-2.648-1.031-5.138-2.903-7.01A9.847 9.847 0 0 0 12.04 2zm0 18.172h-.003a8.21 8.21 0 0 1-4.186-1.144l-.3-.178-3.111.816.83-3.033-.195-.311A8.2 8.2 0 0 1 3.84 11.915c0-4.52 3.678-8.198 8.2-8.198a8.16 8.16 0 0 1 5.803 2.404 8.16 8.16 0 0 1 2.403 5.804c0 4.522-3.678 8.198-8.204 8.198z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/zero_0ne_group/?__pwa=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-instagram"
                  aria-label="Instagram"
                  style={{ width: '44px', height: '44px' }}
                >
                  <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px' }}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61593454711340"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-facebook"
                  aria-label="Facebook"
                  style={{ width: '44px', height: '44px' }}
                >
                  <svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px' }}>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>

              <button 
                onClick={() => { toggleLang(); setIsMobileMenuOpen(false); }}
                style={{ padding: '6px 20px', borderRadius: '9999px', border: '1px solid #404040', backgroundColor: '#171717', color: '#ffffff', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
              >
                {lang === 'ar' ? 'EN' : 'AR'}
              </button>
              
              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)} 
                style={{ width: '100%', padding: '14px', backgroundColor: '#ffffff', color: '#000000', fontWeight: 'bold', borderRadius: '9999px', textAlign: 'center', textDecoration: 'none', fontSize: '16px' }}
              >
                {t('ctaProject') || 'ابدأ مشروعك'}
              </Link>
            </div>
          </aside>
        </div>,
        document.body
      )}
    </>
  );
}
