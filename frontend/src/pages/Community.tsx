import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { UsersIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Community() {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-20 section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <UsersIcon className="w-24 h-24 text-purple-400 mx-auto mb-8" />
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">ADE </span>
              <span className="text-gradient-purple-pink">Topluluğu</span>
            </h1>
            <p className="text-xl text-white/70 mb-12">
              Discord, GitHub ve Forum üzerinden binlerce ADE kullanıcısıyla buluşun
            </p>
            <Link to="/" className="btn-primary">
              Anasayfaya Dön
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
