import React from 'react';
import { 
  UsersThree, 
  MusicNotes, 
  Lightning, 
  GlobeHemisphereWest, 
  ArrowRight 
} from '@phosphor-icons/react';
import useReveal from '../hooks/useReveal';

const DepartmentsPage = () => {
  useReveal();

  return (
    <div className="selection:bg-brand-green selection:text-white">
      <header className="pt-48 pb-20 px-6 max-w-7xl mx-auto text-center reveal">
        <span className="section-label flex justify-center">Organisation</span>
        <h1 className="text-5xl md:text-7xl font-bold mb-8">
          S2C : <span className="text-brand-green">Nos Départements</span>
        </h1>
        <p className="text-xl text-brand-white/60 leading-relaxed max-w-3xl mx-auto">
          Découvrez les entités qui portent la vision S2C. Chacune joue un rôle essentiel dans le 
          réveil spirituel de notre communauté.
        </p>
      </header>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* S2C TRIBES */}
          <div className="reveal md:col-span-8 h-96 bg-white/5 border border-white/10 rounded-[40px] p-12 flex flex-col justify-end relative overflow-hidden group hover:border-brand-green/30 transition-all duration-500">
            <UsersThree className="text-[150px] absolute -top-10 -right-10 text-white/5 group-hover:text-brand-green/20 transition-all duration-700 group-hover:rotate-12" />
            <h3 className="text-4xl font-bold mb-4 group-hover:text-brand-green transition-colors">
              S2C TRIBES
            </h3>
            <p className="text-brand-white/60 max-w-lg text-lg mb-6">
              Trouvez votre communauté locale. Des petits groupes réunis pour grandir ensemble dans la 
              parole et construire des relations solides.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-brand-green font-bold hover:gap-4 transition-all uppercase text-sm tracking-widest">
              Rejoindre une tribu <ArrowRight weight="bold" />
            </a>
          </div>

          {/* COMITÉ MUSICAL */}
          <div className="reveal md:col-span-4 h-96 bg-white/5 border border-white/10 rounded-[40px] p-12 flex flex-col justify-end relative group overflow-hidden hover:border-brand-green/30 transition-all duration-500">
            <MusicNotes className="text-[150px] absolute -top-10 -right-10 text-white/5 group-hover:text-brand-green/20 group-hover:rotate-12 transition-all duration-700" />
            <h3 className="text-3xl font-bold mb-4 uppercase group-hover:text-brand-green transition-colors">
              COMITÉ MUSICAL
            </h3>
            <p className="text-brand-white/60 mb-6 font-medium">
              L'excellence musicale au service de l'adoration. Les voix et instruments qui portent le S2C.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-brand-green/80 font-extrabold hover:text-brand-green hover:gap-4 transition-all uppercase text-sm tracking-widest">
              Écouter nos sessions <ArrowRight weight="bold" />
            </a>
          </div>

          {/* SNT YTH */}
          <div className="reveal md:col-span-5 h-96 bg-white/5 border border-white/10 rounded-[40px] p-12 flex flex-col justify-end relative group overflow-hidden hover:border-brand-yellow/30 transition-all duration-500">
            <Lightning className="text-[120px] absolute -bottom-10 -right-10 text-brand-yellow/10 group-hover:text-brand-yellow/20 group-hover:rotate-12 transition-all duration-700" />
            <h3 className="text-3xl font-bold mb-4 text-brand-yellow/80 group-hover:text-brand-yellow transition-colors">
              SNT YTH
            </h3>
            <span className="inline-block bg-white/10 text-xs px-3 py-1 rounded-full mb-4 w-max font-bold text-brand-white">
              JEUNESSE : 12-18 ANS
            </span>
            <p className="text-brand-white/50 mb-6">
              Impact, style et évangile. Le département pensé sur-mesure pour forger la génération de demain.
            </p>
          </div>

          {/* OUTREACH & MISSIONS */}
          <div className="reveal md:col-span-7 h-96 bg-white/5 border border-white/10 rounded-[40px] p-12 flex flex-col justify-end relative overflow-hidden group hover:border-brand-yellow/30 transition-all duration-500">
            <GlobeHemisphereWest className="text-[150px] absolute -bottom-10 -right-10 text-brand-white/10 group-hover:text-brand-yellow/20 group-hover:rotate-12 transition-all duration-700" />
            <h3 className="text-4xl font-bold mb-4 group-hover:text-brand-yellow transition-colors">
              OUTREACH & MISSIONS
            </h3>
            <p className="text-brand-white/50 max-w-lg text-lg mb-6">
              Notre rayonnement au-delà de nos murs. Des missions humanitaires et évangéliques pour 
              impacter notre monde en crise réel.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-brand-white/80 font-bold hover:text-brand-yellow transition-all uppercase text-sm tracking-widest">
              Découvrir nos missions <ArrowRight weight="bold" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepartmentsPage;
