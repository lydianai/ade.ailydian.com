import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

interface BackButtonProps {
  to?: string
  label?: string
}

export default function BackButton({ to = '/panel', label = 'Geri Dön' }: BackButtonProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (to) {
      navigate(to)
    } else {
      navigate(-1)
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
    >
      <ArrowLeftIcon className="w-5 h-5" />
      <span>{label}</span>
    </motion.button>
  )
}
