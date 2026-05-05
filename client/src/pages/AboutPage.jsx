import React from 'react';
import { HeartStraight, Crown, HandFist } from '@phosphor-icons/react';
import useReveal from '../hooks/useReveal';

const AboutPage = () => {
  useReveal();

  return (
    <div className="selection:bg-brand-green selection:text-white">
      <header className="pt-48 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center reveal">
          <span className="section-label flex justify-center">À Propos</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            S2C : <span className="text-brand-yellow">La Vision</span>
          </h1>
        </div>
      </header>

      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="reveal">
          <h2 className="text-4xl font-bold mb-8 border-l-4 border-brand-green pl-6">Notre Mission</h2>
          <div className="space-y-6 text-brand-white/70 text-lg leading-relaxed">
            <p>
              Le Salon de Célébration & de Contemplation (S2C) n'est pas seulement un événement, c'est un mouvement. 
              Notre objectif est de créer un espace où chaque individu peut rencontrer Dieu à travers une adoration 
              authentique et une louange prophétique.
            </p>
            <p>
              Depuis notre première édition, nous avons vu des milliers de vies transformées, des cœurs restaurés 
              et une jeunesse se lever avec une ferveur nouvelle pour l'Évangile.
            </p>
            <p>
              Nous croyons en un réveil qui impacte non seulement l'église, mais aussi la société, la culture 
              et les nations.
            </p>
          </div>
        </div>
        <div className="reveal delay-100 rounded-[40px] overflow-hidden aspect-video bg-brand-black-soft border border-white/10 relative group">
          <img
            src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Mission S2C"
          />
        </div>
      </section>

      <section className="py-20 px-6 bg-brand-black-soft/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center reveal">Nos Valeurs Fondamentales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-10 rounded-[30px] reveal">
              <HeartStraight className="text-4xl text-brand-yellow mb-6" />
              <h4 className="text-xl font-bold mb-4">AUTHENTICITÉ</h4>
              <p className="text-brand-white/50">
                Une adoration qui vient du cœur, sans artifice, pour une connexion réelle.
              </p>
            </div>
            <div className="glass p-10 rounded-[30px] reveal delay-100">
              <Crown className="text-4xl text-brand-green mb-6" />
              <h4 className="text-xl font-bold mb-4">EXCELLENCE</h4>
              <p className="text-brand-white/50">
                Offrir le meilleur de nous-mêmes dans chaque détail, pour la gloire de Dieu.
              </p>
            </div>
            <div className="glass p-10 rounded-[30px] reveal delay-200">
              <HandFist className="text-4xl text-brand-white mb-6" />
              <h4 className="text-xl font-bold mb-4">UNITÉ</h4>
              <p className="text-brand-white/50">
                Bâtir un corps uni, au-delà des dénominations, autour d'une seule vision.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
