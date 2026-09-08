import React, { useState, useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext';
import ImageLightbox from '../components/ui/ImageLightbox';

export default function Portfolio({ lang, isEnglish, language }) {
  const langContext = useLang();
  const contextLang = langContext?.lang || 'ar';
  
  // Determine active language flexibly from props OR global context
  const activeLang = (isEnglish || lang === 'en' || language === 'en' || contextLang === 'en') ? 'en' : 'ar';
  
  const [activeModal, setActiveModal] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const thumbnailsContainerRef = useRef(null);
  const thumbnailRefs = useRef([]);

  // Auto-scroll thumbnails track when active image changes
  useEffect(() => {
    const container = thumbnailsContainerRef.current;
    const activeThumb = thumbnailRefs.current[activeImageIndex];
    if (container && activeThumb) {
      const containerRect = container.getBoundingClientRect();
      const thumbRect = activeThumb.getBoundingClientRect();
      const offset = (thumbRect.left + thumbRect.width / 2) - (containerRect.left + containerRect.width / 2);
      container.scrollBy({ left: offset, behavior: 'smooth' });
    }
  }, [activeImageIndex, activeModal]);

  // Lock background page scroll when modal is open
  useEffect(() => {
    if (activeModal !== null) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyOverscroll = document.body.style.overscrollBehavior;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.overscrollBehavior = originalBodyOverscroll;
      };
    }
  }, [activeModal]);

  const categories = [
    { id: 'all', label: { ar: 'الكل', en: 'All' } },
    { id: 'ecommerce', label: { ar: 'متاجر إلكترونية', en: 'E-Commerce' } },
    { id: 'education', label: { ar: 'منصات تعليمية', en: 'Educational Platforms' } },
    { id: 'internal', label: { ar: 'أنظمة ولوحات تحكم', en: 'Internal Systems' } },
    { id: 'automation', label: { ar: 'حلول الذكاء والأتمتة', en: 'AI & Automation' } }
  ];

  // Translation Dictionary
  const t = {
    ar: {
      sectionTag: "سابقة",
      sectionTagHighlight: "أعمالنا",
      sectionSub: "دليل على قدرتنا على تقديم حلول رقمية عالمية المستوى.",
      liveDemo: "تجربة النسخة الحية ↗",
      viewDetails: "عرض التفاصيل",
      modalSub: "تفاصيل المشروع التفاعلي",
      keyValueTitle: "القيمة المستفادة:",
      featuresTitle: "المزايا والتقنيات:",
      visitSite: "زيارة الموقع الحي ↗",
      closeBtn: "إغلاق"
    },
    en: {
      sectionTag: "Our",
      sectionTagHighlight: "Portfolio",
      sectionSub: "A testament to our ability to deliver world-class digital solutions.",
      liveDemo: "Live Demo ↗",
      viewDetails: "View Details",
      modalSub: "Interactive Project Details",
      keyValueTitle: "Key Value Delivered:",
      featuresTitle: "Features & Technologies:",
      visitSite: "Visit Live Site ↗",
      closeBtn: "Close"
    }
  };

  const projects = [
    { 
      id: 1, 
      categoryKey: 'ecommerce',
      liveUrl: 'https://01group-restaurant.ososghazaly72.workers.dev/',
      title: { ar: "منصة مطعم الشاورما الدمشقية", en: "01Group Restaurant | Al-Demashqi" }, 
      subtitle: { ar: "منظومة مطاعم سحابية وقائمة طلبات ذكية متكاملة", en: "Cloud Restaurant & Smart Ordering System" }, 
      desc: { 
        ar: "منصة ويب ومطاعم سحابية متطورة تتيح للعملاء تصفح قائمة الطعام بمرونة فائقة، تخصيص الوجبات، وإرسال الطلبات مباشرة بنقرة واحدة عبر الواتساب للمطبخ مع حساب تلقائي لرسوم التوصيل والضريبة.", 
        en: "A modern cloud restaurant ordering platform featuring real-time menu browsing, meal customization, dynamic cart calculations, and 1-click WhatsApp order dispatching with automated delivery fees." 
      },
      value: {
        ar: "الفئة المستهدفة: عشاق الأكل الشامي والمطاعم الساعية للاستقلال الرقمي. القيمة المحققة: توفير عمولات تطبيقات التوصيل بنسبة 100%، رفع المبيعات المباشرة بأكثر من 40%، وتسريع تجربة الطلب في أقل من دقيقة.",
        en: "Target Audience: Food enthusiasts & dining brands scaling direct channels. Delivered Value: Eliminates aggregator fees, boosts direct sales by 40%+, and slashes ordering time to under 60 seconds."
      },
      features: {
        ar: [
          "منيو رقمي حي مع فلترة سريعة (شاورما، فتات ملوكي، بيتزا كرسبي)",
          "سلة طلبات تفاعلية ذكية لحساب الإجمالي والضريبة ورسوم التوصيل لحظياً",
          "تكامل فوري ومباشر مع الواتساب لإرسال الفاتورة والعنوان بنقرة واحدة",
          "نظام حجز ترابيزات فوري واختيار عدد الضيوف والفرع أونلاين",
          "تصميم متجاوب بالكامل لتجربة تصفح وطلب سلسة تحاكي تطبيقات الموبايل"
        ],
        en: [
          "Live interactive menu with real-time category filtering",
          "Smart dynamic cart calculating subtotals, tax, and delivery instantly",
          "Seamless WhatsApp order dispatching with formatted receipts and customer location",
          "Instant online table reservation system with guest and branch selection",
          "100% responsive mobile-first UI delivering a native app feel"
        ]
      },
      images: [
        { 
          src: "/projects/restaurant/hero.jpg",
          ar: "الواجهة الرئيسية", 
          en: "Home Page" 
        },
        { 
          src: "/projects/restaurant/menu.jpg",
          ar: "منيو وأسعار الأصناف", 
          en: "Menu & Pricing" 
        },
        { 
          src: "/projects/restaurant/cart.jpg",
          ar: "احجز ترابيزتك أونلاين", 
          en: "Table Booking" 
        },
        { 
          src: "/projects/restaurant/features.jpg",
          ar: "تتبع أوردرك مباشرة", 
          en: "Live Order Tracking" 
        }
      ]
    },
    { 
      id: 2, 
      categoryKey: 'education',
      title: { ar: "اسم المشروع الثاني", en: "Smart Web Application" }, 
      subtitle: { ar: "تطبيقات الويب الذكية", en: "Intelligent Web Solutions" }, 
      desc: { 
        ar: "وصف مختصر يوضح الفكرة من المشروع والحلول البرمجية أو التصميمية التي تم تقديمها لتحقيق أهداف العميل.", 
        en: "A concise description explaining the project concept and tailored software solutions provided to meet client goals." 
      },
      value: {
        ar: "بناء أنظمة تفاعلية ذكية تتيح للعملاء أتمتة العمليات اليومية وتوفير الوقت والمجهود.",
        en: "Building smart interactive systems enabling clients to automate daily routines and save time and effort."
      },
      features: {
        ar: ["واجهات مستخدم متطورة", "تكامل كامل مع قواعد البيانات", "دعم متعدد اللغات والعملات"],
        en: ["Advanced modern user interfaces", "Seamless database integration", "Multi-language & multi-currency support"]
      },
      images: [
        { ar: "معاينة رئيسية - الصفحة الرئيسية", en: "Main Preview - Landing Page" },
        { ar: "معاينة ثانية - نظام الحجوزات", en: "Second Preview - Booking System" },
        { ar: "معاينة ثالثة - لوحة الإدارة", en: "Third Preview - Admin Panel" }
      ]
    },
    { 
      id: 3, 
      categoryKey: 'internal',
      title: { ar: "اسم المشروع الثالث", en: "Server & Systems Engineering" }, 
      subtitle: { ar: "هندسة السيرفرات والأنظمة", en: "Cloud Infrastructure Setup" }, 
      desc: { 
        ar: "وصف مختصر يوضح الفكرة من المشروع والحلول البرمجية أو التصميمية التي تم تقديمها لتحقيق أهداف العميل.", 
        en: "A detailed breakdown of the cloud infrastructure and backend engineering provided to ensure system reliability." 
      },
      value: {
        ar: "توفير بنية تحتية قوية ومستقرة تضمن استمرارية الأعمال بأعلى كفاءة.",
        en: "Providing a robust and stable infrastructure ensuring business continuity with maximum efficiency."
      },
      features: {
        ar: ["هيكل سيرفر متطور", "مراقبة الأداء على مدار الساعة", "أنظمة حماية متقدمة"],
        en: ["Advanced scalable server architecture", "24/7 proactive performance monitoring", "Advanced firewall and security systems"]
      },
      images: [
        { ar: "معاينة رئيسية - هيكل السيرفر", en: "Main Preview - Server Architecture" },
        { ar: "معاينة ثانية - التقارير الحية", en: "Second Preview - Live Performance Reports" }
      ]
    },
    { 
      id: 4, 
      categoryKey: 'automation',
      title: { ar: "اسم المشروع الرابع", en: "AI Automation Workflow" }, 
      subtitle: { ar: "حلول الأتمتة والذكاء الاصطناعي", en: "AI & Process Automation" }, 
      desc: { 
        ar: "وصف مختصر يوضح الفكرة من المشروع والحلول البرمجية أو التصميمية التي تم تقديمها لتحقيق أهداف العميل.", 
        en: "An overview of how AI and automation were seamlessly integrated into the client's existing business processes." 
      },
      value: {
        ar: "تحسين كفاءة العمليات وتقليل الأخطاء البشرية من خلال الاعتماد على الذكاء الاصطناعي.",
        en: "Improving operational efficiency and reducing human errors by heavily leveraging Artificial Intelligence."
      },
      features: {
        ar: ["نماذج ذكاء اصطناعي مخصصة", "أتمتة سير العمل بالكامل", "تكامل سلس مع الأنظمة الحالية"],
        en: ["Custom trained AI models", "Fully automated end-to-end workflows", "Seamless integration with existing CRM systems"]
      },
      images: [
        { ar: "معاينة رئيسية - تدفق الأتمتة", en: "Main Preview - Automation Flow" },
        { ar: "معاينة ثانية - واجهة المحادثة", en: "Second Preview - Chat Interface" },
        { ar: "معاينة ثالثة - إعدادات الذكاء الاصطناعي", en: "Third Preview - AI Settings" }
      ]
    }
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.categoryKey === activeCategory);

  const currentProject = projects.find(p => p.id === activeModal);

  const handleNextImage = () => {
    if (currentProject) {
      setActiveImageIndex((prev) => (prev + 1) % currentProject.images.length);
    }
  };

  const handlePrevImage = () => {
    if (currentProject) {
      setActiveImageIndex((prev) => (prev - 1 + currentProject.images.length) % currentProject.images.length);
    }
  };

  const openModal = (id) => {
    setActiveModal(id);
    setActiveImageIndex(0); // Reset to first image on open
  };

  return (
    <main
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        color: '#ffffff',
        paddingTop: '110px',
        paddingBottom: '80px',
        boxSizing: 'border-box'
      }}
      dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          paddingLeft: '16px',
          paddingRight: '16px'
        }}
      >
        {/* Header Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: '800',
              color: '#ffffff',
              marginBottom: '12px'
            }}
          >
            {t[activeLang]?.sectionTag || t['ar'].sectionTag} <span style={{ color: '#9ca3af' }}>{t[activeLang]?.sectionTagHighlight || t['ar'].sectionTagHighlight}</span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(14px, 2vw, 16px)',
              color: '#a3a3a3',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            {t[activeLang]?.sectionSub || t['ar'].sectionSub}
          </p>
        </div>

        {/* Horizontal Scrollable Categories Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            overflowY: 'hidden',
            width: '100%',
            maxWidth: '100%',
            gap: '12px',
            paddingBottom: '8px',
            marginBottom: '32px',
            touchAction: 'pan-x',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            cursor: 'grab'
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  flexShrink: 0, // MUST BE ZERO so width exceeds screen & triggers horizontal scroll
                  whiteSpace: 'nowrap',
                  padding: '10px 22px',
                  borderRadius: '9999px',
                  border: isActive ? '1px solid #ffffff' : '1px solid #262626',
                  backgroundColor: isActive ? '#ffffff' : '#141414',
                  color: isActive ? '#000000' : '#a3a3a3',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '14px',
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.label[activeLang] || cat.label['ar']}
              </button>
            );
          })}
        </div>

        {/* Projects Grid Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            width: '100%'
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              style={{
                backgroundColor: '#121212',
                border: '1px solid #262626',
                borderRadius: '24px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
                boxSizing: 'border-box'
              }}
            >
              {/* Card Header & Category */}
              <div>
                <h2
                  style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '4px',
                    textAlign: activeLang === 'ar' ? 'right' : 'left'
                  }}
                >
                  {project.title[activeLang] || project.title['ar']}
                </h2>
                <span
                  style={{
                    fontSize: '13px',
                    color: '#a3a3a3',
                    display: 'block',
                    marginBottom: '20px',
                    textAlign: activeLang === 'ar' ? 'right' : 'left'
                  }}
                >
                  {project.subtitle[activeLang] || project.subtitle['ar']}
                </span>

                {/* Media Preview Box */}
                <div
                  style={{
                    width: '100%',
                    height: '210px',
                    backgroundColor: '#171717',
                    border: '1px solid #262626',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#525252',
                    fontSize: '14px',
                    marginBottom: '20px',
                    overflow: 'hidden'
                  }}
                >
                  {project.images[0]?.src ? (
                    <img 
                      src={project.images[0].src} 
                      alt={project.title[activeLang] || project.title['ar']} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    project.images[0][activeLang] || project.images[0]['ar']
                  )}
                </div>

                {/* Project Description */}
                <p
                  style={{
                    fontSize: '14px',
                    color: '#d4d4d4',
                    lineHeight: '1.6',
                    marginBottom: '24px',
                    textAlign: activeLang === 'ar' ? 'right' : 'left'
                  }}
                >
                  {project.desc[activeLang] || project.desc['ar']}
                </p>
              </div>

              {/* Action Buttons Footer */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  width: '100%',
                  marginTop: 'auto'
                }}
              >
                <a
                  href={project.liveUrl || "https://example.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    fontWeight: '700',
                    borderRadius: '12px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontSize: '14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  {t[activeLang]?.liveDemo || t['ar'].liveDemo}
                </a>

                <button
                  onClick={() => openModal(project.id)}
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    backgroundColor: '#171717',
                    border: '1px solid #262626',
                    color: '#ffffff',
                    fontWeight: '600',
                    borderRadius: '12px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontSize: '14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {t[activeLang]?.viewDetails || t['ar'].viewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>

      {/* Project Details Modal with Gallery */}
      {activeModal !== null && currentProject && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            backgroundColor: 'rgba(0,0,0,0.88)', 
            backdropFilter: 'blur(10px)', 
            zIndex: 9999, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '2rem',
            overscrollBehavior: 'contain',
            touchAction: 'none'
          }}
          onClick={() => setActiveModal(null)}
        >
          <div 
            style={{ 
              backgroundColor: '#121212', 
              border: '1px solid #262626', 
              borderRadius: '32px', 
              width: '100%', 
              maxWidth: '1300px', 
              height: '80vh', 
              display: 'flex', 
              flexDirection: 'row', 
              overflow: 'hidden', 
              position: 'relative',
              overscrollBehavior: 'contain'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Adjusted position for RTL / LTR */}
            <button 
              onClick={() => setActiveModal(null)}
              aria-label={t[activeLang]?.closeBtn || t['ar'].closeBtn}
              style={{ position: 'absolute', top: '24px', [activeLang === 'ar' ? 'left' : 'right']: '24px', backgroundColor: '#222', color: 'white', border: '1px solid #333', width: '44px', height: '44px', borderRadius: '50%', fontSize: '18px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            >
              ✕
            </button>

            {/* Left Side (or Right in LTR): Details & Value (30%) */}
            <div style={{ width: '30%', padding: '3rem 2rem', overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', borderLeft: activeLang === 'ar' ? '1px solid #222' : 'none', borderRight: activeLang === 'en' ? '1px solid #222' : 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: activeLang === 'ar' ? 'right' : 'left' }}>
              <div>
                <span style={{ color: '#888888', fontSize: '14px', display: 'block', marginBottom: '0.5rem' }}>
                  {t[activeLang]?.modalSub || t['ar'].modalSub}
                </span>
                <h3 style={{ color: 'white', fontSize: '28px', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                  {currentProject.title[activeLang] || currentProject.title['ar']}
                </h3>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#ccc', fontSize: '16px', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {t[activeLang]?.keyValueTitle || t['ar'].keyValueTitle}
                  </h4>
                  <p style={{ color: '#999', fontSize: '14px', lineHeight: '1.6' }}>
                    {currentProject.value[activeLang] || currentProject.value['ar']}
                  </p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: '#ccc', fontSize: '16px', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {t[activeLang]?.featuresTitle || t['ar'].featuresTitle}
                  </h4>
                  <ul style={{ color: '#999', fontSize: '14px', lineHeight: '1.7', paddingInlineStart: '1rem', listStyleType: 'disc' }}>
                    {(currentProject.features[activeLang] || currentProject.features['ar']).map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <a 
                href={currentProject.liveUrl || "https://example.com"} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ backgroundColor: 'white', color: 'black', padding: '14px 20px', borderRadius: '14px', fontWeight: 'bold', fontSize: '14px', textAlign: 'center', textDecoration: 'none', display: 'block' }}
              >
                {t[activeLang]?.visitSite || t['ar'].visitSite}
              </a>
            </div>

            {/* Right Side: Gallery Slider & Thumbnails (70%) */}
            <div style={{ width: '70%', backgroundColor: '#0a0a0a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '5rem 3rem 3rem 3rem' }}>
              
              {/* Main Active Screen Display */}
              <div style={{ width: '100%', height: 'calc(100% - 90px)', border: '1px solid #242424', borderRadius: '20px', backgroundColor: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '12px', boxSizing: 'border-box' }}>
                {/* Current Image / Mockup Display */}
                {currentProject.images[activeImageIndex]?.src ? (
                  <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={currentProject.images[activeImageIndex].src} 
                      alt={currentProject.images[activeImageIndex][activeLang] || currentProject.images[activeImageIndex]['ar']} 
                      onClick={() => setFullscreenImage({
                        src: currentProject.images[activeImageIndex].src,
                        title: currentProject.images[activeImageIndex][activeLang] || currentProject.images[activeImageIndex]['ar']
                      })}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px', cursor: 'zoom-in' }}
                    />
                    <div style={{ position: 'absolute', bottom: '14px', left: '50%', transform: 'translateX(-50%)', padding: '6px 20px', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: '13px', fontWeight: '600', textAlign: 'center', borderRadius: '9999px', border: '1px solid rgba(255, 255, 255, 0.15)', whiteSpace: 'nowrap', pointerEvents: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.7)' }}>
                      {currentProject.images[activeImageIndex][activeLang] || currentProject.images[activeImageIndex]['ar']}
                    </div>

                    {/* Fullscreen Zoom Button in Bottom Right Corner */}
                    <button
                      onClick={() => setFullscreenImage({
                        src: currentProject.images[activeImageIndex].src,
                        title: currentProject.images[activeImageIndex][activeLang] || currentProject.images[activeImageIndex]['ar']
                      })}
                      title={activeLang === 'ar' ? 'تكبير وعرض الشاشة بالكامل' : 'View Full Screen'}
                      aria-label="Fullscreen"
                      style={{
                        position: 'absolute',
                        bottom: '14px',
                        right: '14px',
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(20, 20, 20, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        color: '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(40, 40, 40, 0.95)';
                        e.currentTarget.style.transform = 'scale(1.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(20, 20, 20, 0.85)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <span style={{ color: '#fff', fontSize: '22px', fontWeight: 'bold', textAlign: 'center', padding: '0 80px' }}>
                    {currentProject.images[activeImageIndex][activeLang] || currentProject.images[activeImageIndex]['ar']}
                  </span>
                )}
              </div>

              {/* Bottom Navigation: [Left Arrow] [Thumbnails in Center] [Right Arrow] */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px', height: '70px', marginTop: '20px', width: '100%' }} dir="ltr">
                {/* Left Arrow Button */}
                <button 
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                  style={{ backgroundColor: '#1c1c1c', color: 'white', border: '1px solid #333', width: '42px', height: '42px', borderRadius: '50%', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2c2c2c'; e.currentTarget.style.borderColor = '#666'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1c1c1c'; e.currentTarget.style.borderColor = '#333'; }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                {/* Mini Photos / Thumbnails Bar */}
                <div 
                  ref={thumbnailsContainerRef}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none', padding: '4px', maxWidth: '100%', scrollBehavior: 'smooth' }}
                >
                  {currentProject.images.map((imgObj, index) => {
                    const titleStr = imgObj[activeLang] || imgObj['ar'];
                    const isActive = activeImageIndex === index;
                    return (
                      <div 
                        key={index}
                        ref={(el) => (thumbnailRefs.current[index] = el)}
                        onClick={() => setActiveImageIndex(index)}
                        style={{ 
                          width: '95px', 
                          height: '56px', 
                          backgroundColor: '#161616', 
                          border: isActive ? '2px solid white' : '1px solid #262626', 
                          borderRadius: '12px', 
                          cursor: 'pointer', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          overflow: 'hidden',
                          flexShrink: 0,
                          transition: 'all 0.2s',
                          opacity: isActive ? 1 : 0.45,
                          transform: isActive ? 'scale(1.04)' : 'scale(1)',
                          boxShadow: isActive ? '0 0 10px rgba(255, 255, 255, 0.3)' : 'none'
                        }}
                      >
                        {imgObj.src ? (
                          <img 
                            src={imgObj.src} 
                            alt={titleStr} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <span style={{ color: '#ccc', fontSize: '11px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 8px' }}>
                            {titleStr.split(' - ')[1] || titleStr}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Right Arrow Button */}
                <button 
                  onClick={handleNextImage}
                  aria-label="Next image"
                  style={{ backgroundColor: '#1c1c1c', color: 'white', border: '1px solid #333', width: '42px', height: '42px', borderRadius: '50%', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#2c2c2c'; e.currentTarget.style.borderColor = '#666'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1c1c1c'; e.currentTarget.style.borderColor = '#333'; }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Fullscreen Interactive Lightbox Modal */}
      {fullscreenImage && (
        <ImageLightbox
          src={typeof fullscreenImage === 'string' ? fullscreenImage : fullscreenImage.src}
          title={typeof fullscreenImage === 'object' ? fullscreenImage.title : ''}
          onClose={() => setFullscreenImage(null)}
          lang={activeLang}
        />
      )}
      </div>
    </main>
  );
}
