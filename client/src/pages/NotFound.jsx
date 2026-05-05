import React from 'react';
import { Link } from 'react-router';
import { House, Warning } from '@phosphor-icons/react';
import useReveal from '../hooks/useReveal';

const NotFound = () => {
  useReveal();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 selection:bg-brand-green selection:text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -left-20 top-20 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute -right-20 bottom-20 w-96 h-96 bg-brand-green/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }}></div>

      <div className="text-center relative z-10 reveal">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/5 border border-white/10 rounded-[32px] mb-8 group hover:border-brand-yellow/50 transition-all duration-500">
          <Warning size={48} weight="duotone" className="text-brand-yellow group-hover:scale-110 transition-transform" />
        </div>
        
        <h1 className="text-8xl md:text-[150px] font-black tracking-tighter leading-none mb-4 text-gradient">
          404
        </h1>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-brand-white">
          Oups ! <span className="text-brand-yellow">Page Introuvable</span>
        </h2>
        
        <p className="text-brand-white/50 text-lg max-w-md mx-auto mb-10 leading-relaxed">
          Il semble que le chemin que vous avez emprunté n'existe plus ou a été déplacé.
        </p>

        <Link to="/" className="btn-primary mx-auto inline-flex items-center gap-3">
          RETOURNER À L'ACCUEIL
          <House weight="bold" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
