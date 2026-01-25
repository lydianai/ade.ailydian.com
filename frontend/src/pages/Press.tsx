import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { NewspaperIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Press() {
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
            <NewspaperIcon className="w-24 h-24 text-orange-400 mx-auto mb-8" />
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-white">Basın </span>
              <span className="text-gradient-amber-teal">Kiti</span>
            </h1>
            <p className="text-xl text-white/70 mb-12">
              ADE hakkında basın bültenleri, medya kiti ve iletişim bilgileri
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
