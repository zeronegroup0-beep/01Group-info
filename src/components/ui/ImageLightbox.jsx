import React, { useState, useEffect, useRef } from 'react';

export default function ImageLightbox({ src, alt, title, onClose, lang = 'ar' }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionStartRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);
  const initialPinchDistRef = useRef(null);
  const initialPinchScaleRef = useRef(1);

  // Prevent background scrolling while modal is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard navigation: Escape to close, +/- to zoom, 0 to reset
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-') {
        handleZoomOut();
      } else if (e.key === '0') {
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scale, onClose]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 5));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Toggle zoom on single click if not dragging
  const handleImageClick = (e) => {
    e.stopPropagation();
    if (hasMovedRef.current) return;

    if (scale === 1) {
      setScale(2.5);
    } else {
      handleReset();
    }
  };

  // Mouse wheel zoom support
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.35 : -0.35;
    setScale((prev) => {
      const next = Math.min(Math.max(prev + zoomDelta, 1), 4);
      if (next === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return parseFloat(next.toFixed(2));
    });
  };

  // Mouse Drag / Pan
  const handleMouseDown = (e) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    positionStartRef.current = { ...position };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || scale <= 1) return;
    e.preventDefault();
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasMovedRef.current = true;
    }
    setPosition({
      x: positionStartRef.current.x + dx,
      y: positionStartRef.current.y + dy
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Drag & Pinch-to-Zoom
  const handleTouchStart = (e) => {
    if (e.touches.length === 1 && scale > 1) {
      setIsDragging(true);
      hasMovedRef.current = false;
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      positionStartRef.current = { ...position };
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialPinchDistRef.current = dist;
      initialPinchScaleRef.current = scale;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging && scale > 1) {
      const dx = e.touches[0].clientX - dragStartRef.current.x;
      const dy = e.touches[0].clientY - dragStartRef.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasMovedRef.current = true;
      }
      setPosition({
        x: positionStartRef.current.x + dx,
        y: positionStartRef.current.y + dy
      });
    } else if (e.touches.length === 2 && initialPinchDistRef.current) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = currentDist / initialPinchDistRef.current;
      const nextScale = Math.min(Math.max(initialPinchScaleRef.current * ratio, 1), 4);
      setScale(parseFloat(nextScale.toFixed(2)));
      hasMovedRef.current = true;
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length === 0) {
      setIsDragging(false);
      initialPinchDistRef.current = null;
      if (scale <= 1) {
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  const zoomPercent = Math.round(scale * 100);

  return (
    <div
      onClick={() => {
        if (scale === 1) onClose();
        else handleReset();
      }}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.94)',
        backdropFilter: 'blur(16px)',
        zIndex: 100000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        touchAction: 'none'
      }}
    >
      {/* Top Floating Control Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(24, 24, 24, 0.88)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          padding: '6px 14px',
          borderRadius: '9999px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
          zIndex: 100002,
          maxWidth: '92vw'
        }}
        dir="ltr"
      >
        {/* Zoom Out Button */}
        <button
          onClick={handleZoomOut}
          disabled={scale <= 1}
          title={lang === 'ar' ? 'تصغير' : 'Zoom Out'}
          aria-label="Zoom Out"
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: scale <= 1 ? 'transparent' : 'rgba(255,255,255,0.08)',
            border: 'none',
            color: scale <= 1 ? '#555' : '#fff',
            fontSize: '18px',
            cursor: scale <= 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease'
          }}
        >
          −
        </button>

        {/* Zoom Percentage */}
        <span
          onClick={scale === 1 ? handleZoomIn : handleReset}
          title={lang === 'ar' ? 'انقر لإعادة الضبط / التكبير' : 'Click to reset/zoom'}
          style={{
            color: '#eee',
            fontSize: '13px',
            fontWeight: '600',
            minWidth: '46px',
            textAlign: 'center',
            cursor: 'pointer',
            padding: '2px 6px',
            borderRadius: '6px',
            backgroundColor: 'rgba(255,255,255,0.05)'
          }}
        >
          {zoomPercent}%
        </span>

        {/* Zoom In Button */}
        <button
          onClick={handleZoomIn}
          disabled={scale >= 5}
          title={lang === 'ar' ? 'تكبير' : 'Zoom In'}
          aria-label="Zoom In"
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: scale >= 5 ? 'transparent' : 'rgba(255,255,255,0.08)',
            border: 'none',
            color: scale >= 5 ? '#555' : '#fff',
            fontSize: '18px',
            cursor: scale >= 4 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease'
          }}
        >
          +
        </button>

        {/* Reset / Fit Button */}
        {scale > 1 && (
          <button
            onClick={handleReset}
            title={lang === 'ar' ? 'إعادة ضبط الحجم' : 'Reset View'}
            aria-label="Reset View"
            style={{
              padding: '4px 10px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255,255,255,0.12)',
              border: 'none',
              color: '#fff',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>⟲</span>
            <span>{lang === 'ar' ? 'ضبط' : 'Fit'}</span>
          </button>
        )}

        {/* Separator */}
        <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.15)', margin: '0 2px' }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          title={lang === 'ar' ? 'إغلاق' : 'Close'}
          aria-label="Close"
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: 'none',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d32f2f'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
        >
          ✕
        </button>
      </div>

      {/* Main Image Display Area */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '60px 16px 50px 16px',
          boxSizing: 'border-box'
        }}
      >
        <img
          src={src}
          alt={alt || 'Zoomed preview'}
          onClick={handleImageClick}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            maxWidth: '92vw',
            maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: '12px',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.22s cubic-bezier(0.2, 0, 0, 1)',
            cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
            pointerEvents: 'auto'
          }}
          draggable={false}
        />
      </div>

      {/* Bottom Floating Caption / Helpful Hint */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '6px 18px',
          backgroundColor: 'rgba(15, 15, 15, 0.85)',
          backdropFilter: 'blur(8px)',
          borderRadius: '9999px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#aaa',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          pointerEvents: 'none'
        }}
      >
        {title && <strong style={{ color: '#fff' }}>{title}</strong>}
        <span>
          {scale === 1
            ? (lang === 'ar' ? '💡 انقر على الصورة أو الزر للتكبير' : '💡 Click or tap image to zoom in')
            : (lang === 'ar' ? '✋ اسحب للتحريك واستكشاف التفاصيل' : '✋ Drag to pan around image')}
        </span>
      </div>
    </div>
  );
}
