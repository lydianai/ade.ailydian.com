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
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white py-3 px-4 shadow-lg"
      style={{
        background: 'linear-gradient(90deg, #F97316 0%, #EA580C 50%, #F97316 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          />
          <span className="font-mono text-sm md:text-base font-semibold tracking-wider">
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
    </motion.div>
  );
};

export default DevelopmentBanner;
