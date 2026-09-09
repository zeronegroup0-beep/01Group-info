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
    { id: 'ecommerce', label: { ar: 'متاجر ومطاعم', en: 'E-Commerce & Dining' } },
    { id: 'education', label: { ar: 'نوادي وأكاديميات', en: 'Clubs & Academies' } }
  ];

  // Translation Dictionary
  const t = {
    ar: {
      sectionTag: "سابقة",
      sectionTagHighlight: "أعمالنا",
      sectionSub: "شغل حقيقي عملناه لعملائنا وساعدناهم يكبروا أرقامهم ويسهلوا إدارة بيزنسهم.",
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
      liveUrl: 'https://01group-restaurant.zeronegroup0.workers.dev/',
      title: { ar: "موقع مطعم الشاورما السورية", en: "01Group Restaurant | Syrian Shawarma" }, 
      subtitle: { ar: "منظومة مطاعم سحابية وقائمة طلبات ذكية متكاملة", en: "Cloud Restaurant & Smart Ordering System" }, 
      desc: { 
        ar: "منصة ويب ومطاعم سحابية متطورة تتيح للزبائن تصفح قائمة الأكل بسهولة، اختيار إضافات السندوتشات والوجبات، وإرسال الطلبات مباشرة بنقرة واحدة عبر الواتساب للمطبخ مع حساب تلقائي لرسوم التوصيل والضريبة.", 
        en: "A modern cloud restaurant ordering platform featuring real-time menu browsing, meal customization, dynamic cart calculations, and 1-click WhatsApp order dispatching with automated delivery fees." 
      },
      value: {
        ar: "الفئة المستهدفة: عشاق الأكل السوري ومحلات ومطاعم الشاورما الساعية للاستقلال وتوفير المصاريف. القيمة المحققة: توفير 100% من عمولات أبلكيشنز التوصيل، زيادة المبيعات المباشرة بأكتر من 40%، وتجربة طلب سهلة في أقل من دقيقة.",
        en: "Target Audience: Food enthusiasts & dining brands scaling direct channels. Delivered Value: Eliminates aggregator fees, boosts direct sales by 40%+, and slashes ordering time to under 60 seconds."
      },
      features: {
        ar: [
          "منيو رقمي حي مع فلترة سريعة وسهلة (شاورما، فتات، بيتزا)",
          "سلة طلبات ذكية بتحسب الإجمالي والضريبة والتوصيل في ثانية",
          "ربط مباشر بالواتساب لإرسال الفاتورة والعنوان بلوكيشن المشتري بضغطة زرار",
          "نظام حجز ترابيزات أونلاين واختيار عدد الأفراد والفرع",
          "لوحة تحكم كاملة للإدارة (Admin Panel) لمتابعة وتحديث حالات الطلبات وطباعة الفواتير حرارياً",
          "لوحة عمليات وتحليلات للمدير (Manager Dashboard) لمراقبة المبيعات ومؤشرات الأرباح ومخطط الذروة"
        ],
        en: [
          "Live interactive menu with real-time category filtering",
          "Smart dynamic cart calculating subtotals, tax, and delivery instantly",
          "Seamless WhatsApp order dispatching with formatted receipts and customer location",
          "Instant online table reservation system with guest and branch selection",
          "Comprehensive Admin Dashboard for live order management, status updates & receipt printing",
          "Executive Manager Dashboard featuring sales trends, profit KPIs, and hourly peak analysis"
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
        },
        { 
          src: "/projects/restaurant/admin.jpg",
          ar: "لوحة تحكم الإدارة (Admin Panel) - إدارة الطلبات النشطة والفواتير", 
          en: "Admin Dashboard - Real-time Orders & Receipts" 
        },
        { 
          src: "/projects/restaurant/manager.jpg",
          ar: "لوحة المدير التنفيذي (Manager Dashboard) - مؤشرات الأرباح والعمليات", 
          en: "Manager Operations - Sales Analytics & Financial KPIs" 
        }
      ]
    },
    { 
      id: 2, 
      categoryKey: 'education',
      liveUrl: 'https://swimming-coach-portfolio.zeronegroup0.workers.dev/',
      title: { ar: "أكاديمية مدرب السباحة المحترف", en: "Zerone Aquatic | Swimming Academy & Coach" }, 
      subtitle: { ar: "منصة تدريب سباحة وحجز برامج تدريبية ذكية متكاملة", en: "Aquatic Coaching Platform & Program Booking" }, 
      desc: { 
        ar: "موقع متكامل لأكاديمية ومدرب سباحة محترف معتمد دولياً (ASCA & Red Cross)، بيعرض البرامج التدريبية المخصصة للأطفال، الرجال، والسيدات، مع مواعيد الحصص والتفاصيل، وحجز فوري وتواصل مباشر مع الكابتن بنقرة واحدة على الواتساب.", 
        en: "A premier aquatic coaching and academy platform showcasing specialized training programs for Kids, Men, and Women, schedule details, and 1-click WhatsApp session booking." 
      },
      value: {
        ar: "الفئة المستهدفة: أولياء الأمور، الرياضيين، ومحبي السباحة اللي بيدوروا على تدريب احترافي وبيئة آمنة. القيمة المحققة: حجز مباشر وسريع على الواتساب رفع نسبة المشتركين بأكتر من 60%، توضيح كامل للمواعيد والأسعار بدون استفسارات متكررة تضيع وقت الكابتن، وبراند رياضي راقي يبني الثقة فوراً.",
        en: "Target Audience: Parents, fitness seekers, and competitive athletes. Delivered Value: Streamlined WhatsApp booking boosting enrollment by 60%+, eliminating back-and-forth inquiries, and projecting an elite professional coaching brand."
      },
      features: {
        ar: [
          "عرض برامج تدريبية مخصصة لكل فئة (أطفال، رجال، سيدات) مع المواعيد بالتفصيل",
          "حجز حصص وتواصل فوري مباشر عبر الواتساب بدون أي خطوات معقدة",
          "استعراض كامل لشهادات وخبرات الكوتش الدولية (ASCA & Red Cross)",
          "نظام تحليل حركي بالفيديو تحت المية لمتابعة تطور مستوى كل سباح",
          "تصميم عصري سريع جداً وشغال بنعومة تامة على كل شاشات الموبايل"
        ],
        en: [
          "Customized training programs with clear schedules for Kids, Men, and Women",
          "Instant 1-click WhatsApp booking eliminating form friction",
          "Official credentials showcase including ASCA & Red Cross certifications",
          "Underwater video analysis & weekly progression tracking highlights",
          "100% responsive, high-speed mobile-first design for seamless athlete onboarding"
        ]
      },
      images: [
        { 
          src: "/projects/swimming/hero.jpg",
          ar: "الواجهة الرئيسية والتعريف بالأكاديمية", 
          en: "Academy Hero & Overview" 
        },
        { 
          src: "/projects/swimming/programs.jpg",
          ar: "برامج التدريب ومواعيد الحصص", 
          en: "Training Programs & Schedules" 
        },
        { 
          src: "/projects/swimming/features.jpg",
          ar: "مميزات التدريب وتحليل الأداء بالفيديو", 
          en: "Coaching Features & Video Analysis" 
        },
        { 
          src: "/projects/swimming/booking.jpg",
          ar: "الحجز والتواصل المباشر عبر الواتساب", 
          en: "Direct Booking & WhatsApp Contact" 
        }
      ]
    },
    { 
      id: 3, 
      categoryKey: 'ecommerce',
      liveUrl: 'https://zerone-e-commerce.zeronegroup0.workers.dev/',
      title: { ar: "متجر ومصنع زيرو ون للأقطان والملابس", en: "Zerone Cotton | E-Commerce & B2B Apparel" }, 
      subtitle: { ar: "منصة تجارة إلكترونية متكاملة للقطاعين (B2C & B2B) وتوريد الملابس القطنية", en: "Omnichannel Fashion E-Commerce & B2B Wholesale Apparel Portal" }, 
      desc: { 
        ar: "منصة تجارة إلكترونية متطورة وشاملة لمصنع ملابس قطنية مصرية فاخرة (100% قطن مصري نقي)، بتجمع بين متجر تجزئة عصري للزبائن (B2C) لشراء البوكسرات، السراويل، والفانلات مع سلة تسوق وشيك أوت فوري، وبوابة مخصصة لطلبات الجملة وعقود التوريد (B2B) وتصنيع البراند الخاص (Private Label) مع شحن وتغطية لـ 27 محافظة ودعم طرق دفع إلكترونية وفودافون كاش وإنستاباي والدفع عند الاستلام.", 
        en: "A high-performance e-commerce platform for a premier 100% Egyptian cotton apparel manufacturer, integrating an intuitive B2C retail storefront with dynamic cart checkout, alongside a dedicated B2B wholesale portal for custom contracts, private labeling, and nationwide delivery." 
      },
      value: {
        ar: "الفئة المستهدفة: المشترون الأفراد الباحثون عن قطن مصري فاخر ومريح، وتجار الملابس وأصحاب البراندات الراغبون في تصنيع علاماتهم الخاصة (Private Label). القيمة المحققة: مضاعفة المبيعات المباشرة وتوفير عمولات المنصات الوسيطة، إغلاق صفقات التوريد والجملة بنقرة واحدة، وبناء ثقة قوية في الجودة والمقاسات بالضمان الكامل.",
        en: "Target Audience: Retail consumers seeking premium cotton apparel and fashion retailers seeking direct manufacturer supply. Delivered Value: Eliminates third-party marketplace fees, doubles direct sales conversions, and accelerates wholesale RFQ turnaround."
      },
      features: {
        ar: [
          "متجر تجزئة B2C متكامل مع فلاتر سريعة وتحديد المقاسات والألوان وسلة تسوق ذكية",
          "بوابة B2B مخصصة لعقود التوريد وحساب تخفيضات الكميات وتصنيع البراند الخاص (Private Label)",
          "شيك أوت سريع يدعم بوابات الدفع الإلكتروني (فيزا، كاش، إنستاباي) والدفع كاش عند الاستلام",
          "نظام تتبع فوري لمسار تجهيز وشحن الطلبية برقم تتبع خاص لكل عميل في 27 محافظة",
          "استعراض معايير الجودة والقص الآلي الألماني فائق الدقة (CNC & Laser) لضمان ثبات المقاسات"
        ],
        en: [
          "Feature-packed B2C storefront with instant filtering, size/color pickers, and smart cart",
          "Dedicated B2B portal for volume pricing, wholesale orders, and private label contracts",
          "Multi-option frictionless checkout supporting credit cards, InstaPay, mobile wallets, and COD",
          "Real-time order fulfillment & dispatch tracking across 27 governorates",
          "Detailed showcase of German CNC laser-cutting precision and ISO-certified fabric quality"
        ]
      },
      images: [
        { 
          src: "/projects/ecommerce/hero.jpg",
          ar: "الواجهة الرئيسية ومميزات المصنع", 
          en: "Factory Hero & Overview" 
        },
        { 
          src: "/projects/ecommerce/store.jpg",
          ar: "متجر التجزئة وقائمة المنتجات", 
          en: "B2C Retail Store & Products" 
        },
        { 
          src: "/projects/ecommerce/b2b.jpg",
          ar: "بوابة عقود التوريد والجملة (B2B)", 
          en: "B2B Wholesale & Contracts" 
        },
        { 
          src: "/projects/ecommerce/features.jpg",
          ar: "إمكانيات الجودة والقص الآلي", 
          en: "Precision CNC Cutting & Quality" 
        }
      ]
    },
    { 
      id: 4, 
      categoryKey: 'education',
      liveUrl: 'https://zeronegroup-gym-v1.zeronegroup0.workers.dev/',
      title: { ar: "نادي وأكاديمية زيرو ون للجيم والفنون القتالية", en: "ZERO-ONE GROUP | Gym & Combat Arts (Defy Gravity)" }, 
      subtitle: { ar: "صالة رفع أثقال متقدمة، استوديو سيدات خاص، قفص قتالي للفنون المختلطة، وعضويات رقمية", en: "Elite Powerlifting Facility, Women's Studio, MMA Octagon & Digital Memberships" }, 
      desc: { 
        ar: "منصة رياضية وقتالية متكاملة تحت شعار (DEFY GRAVITY) بتصميم سينمائي مظلم فخم ونيون ناري، بتعرض أحدث مساحات التدريب من حديد للرجال (Raw Strength)، صالة المقاومة الخاصة بالسيدات (Empower & Tone)، حصص الزومبا والكارديو الحماسية، وأكاديميات الفنون القتالية المتخصصة (MMA في القفص الثماني، الجوجيتسو، والكونغ فو)، مع استعراض باقات العضويات والاشتراكات السنوية والشهرية والحجز الفوري.", 
        en: "An elite, dark-aesthetic fitness and combat arts portal (Defy Gravity) featuring men's raw powerlifting stations, private women's resistance zones, high-intensity cardio & Zumba, and dedicated martial arts dojos (MMA octagon, Jujutsu, and Kung Fu) with transparent membership tiers." 
      },
      value: {
        ar: "الفئة المستهدفة: عشاق الحديد واللياقة البدنية، السيدات الباحثات عن صالة رياضية خاصة 100%، ومقاتلو الفنون القتالية. القيمة المحققة: زيادة بنسبة 60% في الاشتراكات والعضويات عبر الموقع، عرض واضح لكافة الباقات دون إرهاق موظفي الاستقبال، وبناء هوية رياضية احترافية قوية ترسخ الثقة وتجذب المتدربين الجادين.",
        en: "Target Audience: Dedicated lifters, women requiring fully private fitness spaces, and combat athletes. Delivered Value: 60%+ surge in direct member acquisitions, zero front-desk overhead with transparent online pricing, and a fierce, high-impact athletic branding."
      },
      features: {
        ar: [
          "مساحات تدريب متخصصة: صالة رفع الأثقال الثقيلة للرجال، واستوديو المقاومة الخاص بالسيدات",
          "أكاديميات فنون قتالية احترافية تضم القفص الثماني (MMA Octagon)، الجوجيتسو الياباني، والكونغ فو",
          "برامج تدريب الكارديو والزومبا الإيقاعية لحرق الدهون وبناء اللياقة العالية",
          "عرض شفاف لباقات العضوية الشهرية، الـ 6 شهور، والسنوية مع المزايا والحصص الإضافية",
          "واجهة سينمائية داكنة (Dark Neon) تفاعلية وسريعة جداً مع دعم كامل للتصفح باللغتين"
        ],
        en: [
          "Dedicated training zones: Men's Raw Powerlifting & 100% Private Women's Resistance studio",
          "Professional combat arts dojo featuring full-size MMA cage, Jujutsu tatami, and Kung Fu mechanics",
          "High-energy rhythm Zumba & metabolic conditioning classes",
          "Transparent 1-month, 6-month, and 1-year membership tiers with VIP perks",
          "Cinematic dark neon interface optimized for blazing-fast mobile performance"
        ]
      },
      images: [
        { 
          src: "/projects/gym/hero.jpg",
          ar: "الواجهة الرئيسية وشعار التحدي (Defy Gravity)", 
          en: "Hero Banner & Defy Gravity Challenge" 
        },
        { 
          src: "/projects/gym/facilities.jpg",
          ar: "صالات التدريب للرجال ومساحات السيدات الخاصة", 
          en: "Men's Powerlifting & Women's Studio" 
        },
        { 
          src: "/projects/gym/martial_arts.jpg",
          ar: "أكاديميات القفص القتالي والجوجيتسو والكونغ فو", 
          en: "MMA Cage, Jujutsu & Kung Fu Disciplines" 
        },
        { 
          src: "/projects/gym/checkout.jpg",
          ar: "باقات وأسعار العضويات والاشتراكات", 
          en: "Membership Tiers & Pricing Plans" 
        }
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
