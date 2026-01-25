import React from 'react'
import { motion } from 'framer-motion'

interface LogoProps {
  variant?: 'default' | 'white' | 'dark'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  showText?: boolean
}

const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'md',
  animated = true,
  showText = true,
}) => {
  const sizeMap = {
    sm: { width: 32, height: 32, text: 'text-xl' },
    md: { width: 48, height: 48, text: 'text-2xl' },
    lg: { width: 64, height: 64, text: 'text-3xl' },
    xl: { width: 96, height: 96, text: 'text-5xl' },
  }

  const { width, height, text } = sizeMap[size]

  const colorSchemes = {
    default: {
      primary: '#F97316', // orange-500
      secondary: '#FB923C', // orange-400
      accent: '#FDBA74', // orange-300
      glow: '#FED7AA', // orange-200
      text: '#1F2937',
    },
    white: {
      primary: '#FFFFFF',
      secondary: '#F3F4F6',
      accent: '#E5E7EB',
      glow: '#D1D5DB',
      text: '#FFFFFF',
    },
    dark: {
      primary: '#EA580C', // orange-600
      secondary: '#C2410C', // orange-700
      accent: '#9A3412', // orange-800
      glow: '#7C2D12', // orange-900
      text: '#1F2937',
    },
  }

  const colors = colorSchemes[variant]

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: 'easeInOut' },
        opacity: { duration: 0.5 },
      },
    },
  }

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.08, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const floatVariants = {
    float: {
      y: [0, -8, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const rotateVariants = {
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  }

  const breatheVariants = {
    breathe: {
      scale: [1, 1.02, 1],
      filter: [
        'drop-shadow(0 0 8px rgba(249, 115, 22, 0.3))',
        'drop-shadow(0 0 16px rgba(249, 115, 22, 0.6))',
        'drop-shadow(0 0 8px rgba(249, 115, 22, 0.3))',
      ],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.div
      className="flex items-center gap-3"
      variants={floatVariants}
      animate={animated ? 'float' : undefined}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        initial={animated ? 'hidden' : 'visible'}
        animate={animated ? 'visible' : undefined}
        whileHover={animated ? undefined : { rotate: 360, scale: 1.1 }}
        className="flex-shrink-0"
        variants={breatheVariants}
        style={{ filter: 'drop-shadow(0 0 12px rgba(249, 115, 22, 0.4))' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <defs>
          {/* Orange Gradient */}
          <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="50%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.accent} />
          </linearGradient>

          {/* Glow Filter */}
          <filter id="glow-orange">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Shadow */}
          <filter id="shadow-orange">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={colors.primary} floodOpacity="0.3" />
          </filter>

          {/* Radial Gradient for Glow */}
          <radialGradient id="radial-orange">
            <stop offset="0%" stopColor={colors.accent} stopOpacity="0.8" />
            <stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background Glow Circle */}
        {animated && (
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="url(#radial-orange)"
            opacity="0.3"
            variants={pulseVariants}
            animate="pulse"
          />
        )}

        {/* Outer Ring - Government Ecosystem */}
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={colors.secondary}
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.5"
          variants={pathVariants}
        />

        {/* Main Hexagon - AI Core */}
        <motion.path
          d="M 50 12 L 78 28 L 78 60 L 50 76 L 22 60 L 22 28 Z"
          fill="none"
          stroke="url(#orange-gradient)"
          strokeWidth="3"
          strokeLinejoin="round"
          variants={pathVariants}
          filter="url(#glow-orange)"
        />

        {/* Inner Hexagon */}
        <motion.path
          d="M 50 20 L 70 32 L 70 56 L 50 68 L 30 56 L 30 32 Z"
          fill={colors.primary}
          fillOpacity="0.1"
          stroke={colors.accent}
          strokeWidth="1"
          variants={iconVariants}
        />

        {/* Neural Network Connections */}
        <motion.g variants={iconVariants} opacity="0.6">
          <line x1="50" y1="25" x2="50" y2="40" stroke={colors.accent} strokeWidth="1.5" />
          <line x1="35" y1="35" x2="45" y2="45" stroke={colors.accent} strokeWidth="1.5" />
          <line x1="65" y1="35" x2="55" y2="45" stroke={colors.accent} strokeWidth="1.5" />
          <line x1="32" y1="50" x2="45" y2="50" stroke={colors.accent} strokeWidth="1.5" />
          <line x1="68" y1="50" x2="55" y2="50" stroke={colors.accent} strokeWidth="1.5" />
        </motion.g>

        {/* Central "A" for ADE */}
        <motion.g variants={iconVariants} filter="url(#shadow-orange)">
          <path
            d="M 40 63 L 50 38 L 60 63 M 44 55 L 56 55"
            fill="none"
            stroke="url(#orange-gradient)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* AI Dot - Pulsing */}
          <motion.circle
            cx="50"
            cy="33"
            r="3.5"
            fill={colors.primary}
            animate={
              animated
                ? {
                    scale: [1, 1.4, 1],
                    opacity: [1, 0.6, 1],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            filter="url(#glow-orange)"
          />
        </motion.g>

        {/* Connection Points - 6 Ministries */}
        <motion.g variants={iconVariants}>
          {[0, 60, 120, 180, 240, 300].map((angle, index) => {
            const radian = (angle * Math.PI) / 180
            const x = 50 + 36 * Math.cos(radian - Math.PI / 2)
            const y = 50 + 36 * Math.sin(radian - Math.PI / 2)

            return (
              <motion.circle
                key={index}
                cx={x}
                cy={y}
                r="2.5"
                fill={colors.secondary}
                animate={
                  animated
                    ? {
                        scale: [1, 1.6, 1],
                        opacity: [0.5, 1, 0.5],
                      }
                    : {}
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.25,
                  ease: 'easeInOut',
                }}
              />
            )
          })}
        </motion.g>

        {/* Orbital Ring Animation */}
        {animated && (
          <>
            <motion.circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke={colors.accent}
              strokeWidth="0.5"
              strokeDasharray="2 4"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ transformOrigin: '50% 50%' }}
            />

            {/* Counter-rotating outer ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={colors.secondary}
              strokeWidth="0.3"
              strokeDasharray="1 6"
              opacity="0.3"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ transformOrigin: '50% 50%' }}
            />
          </>
        )}
      </motion.svg>

      {showText && (
        <motion.div
          initial={animated ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col"
        >
          <span
            className={`${text} font-bold tracking-tight leading-none`}
            style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ADE
          </span>
          <span
            className="text-xs font-medium tracking-wide"
            style={{ color: colors.text, opacity: 0.7 }}
          >
            Akıllı Devlet Ekosistemi
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Logo
