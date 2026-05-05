import React from 'react';
import { Link } from 'react-router';
import { Phone, EnvelopeSimple } from '@phosphor-icons/react';

const Footer = () => {
  return (
    <footer id="main-footer" className="py-12 px-6 border-t border-white/5 mt-20">
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center space-y-6 text-center">
        <Link to="/" className="flex items-center gap-3 group mt-4">
          <div className="w-12 h-12 bg-brand-yellow rounded-xl flex items-center justify-center rotate-3 shadow-xl group-hover:rotate-0 transition-all duration-300">
            <span className="text-brand-black font-display font-bold text-2xl tracking-tighter">S2C</span>
          </div>
          <span className="font-display font-bold text-xl tracking-wide">STRUCTURE S2C</span>
        </Link>
        <p className="font-display text-brand-white/60 max-w-md">
          Rejoignez-nous pour une expérience spirituelle et humaine unique, autour de la louange, l'adoration et la prière.
        </p>
        <div className="flex flex-col md:flex-row font-display justify-center gap-6 items-center flex-wrap pt-4">
          <a
            href="tel:+2250757414458"
            rel="noopener noreferrer"
            className="hover:text-brand-yellow text-brand-white/80 transition-colors flex items-center space-x-2"
          >
            <Phone size={24} />
            <span>07 57 41 44 58</span>
          </a>
          <a
            href="tel:+2250788257233"
            rel="noopener noreferrer"
            className="hover:text-brand-yellow text-brand-white/80 transition-colors flex items-center space-x-2"
          >
            <Phone size={24} />
            <span>07 88 25 72 33</span>
          </a>
          <a
            href="mailto:lastructure.s2c@gmail.com"
            rel="noopener noreferrer"
            className="hover:text-brand-yellow text-brand-white/80 transition-colors flex items-center space-x-2"
          >
            <EnvelopeSimple size={24} />
            <span>lastructure.s2c@gmail.com</span>
          </a>
        </div>
        <p className="text-[10px] text-brand-white/30 mt-8 tracking-widest font-bold uppercase pb-8">
          &copy; {new Date().getFullYear()} - Salon de Célébration & de Contemplation - Tous droits réservés
        </p>
      </div>
    </footer>
  );
};

export default Footer;
