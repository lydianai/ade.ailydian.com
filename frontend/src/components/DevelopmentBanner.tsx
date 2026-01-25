import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DevelopmentBanner: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = 'GELİŞTİRME AŞAMASINDA';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      // Tekrar başlat
      const resetTimeout = setTimeout(() => {
        setText('');
        setIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimeout);
    }
  }, [index]);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className="fixed top-0 left-0 right-0 text-white shadow-2xl"
      style={{
        background: 'linear-gradient(90deg, #F97316 0%, #EA580C 50%, #F97316 100%)',
        backgroundSize: '200% 100%',
        animation: 'gradientShift 3s ease infinite',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        pointerEvents: 'none',
        borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <div className="w-full px-4 flex items-center justify-center gap-3">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 md:w-7 md:h-7 border-3 border-white border-t-transparent rounded-full flex-shrink-0"
            style={{ borderWidth: '3px' }}
          />
          <span className="font-mono text-base md:text-xl lg:text-2xl font-bold tracking-widest drop-shadow-lg">
            {text}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-1"
            >
              |
            </motion.span>
          </span>
        </div>
      </div>

      {/* CSS Animation for gradient */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.div>
  );
};

export default DevelopmentBanner;
