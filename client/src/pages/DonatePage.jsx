import React, { useState } from 'react';
import { CheckCircle, Heart, LockKey } from '@phosphor-icons/react';
import useReveal from '../hooks/useReveal';

const DonatePage = () => {
  useReveal();
  const [donationType, setDonationType] = useState('ONCE'); // 'ONCE' or 'REGULAR'
  const [selectedAmount, setSelectedAmount] = useState(30000);
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (honeypot) return;
    
    setIsSubmitting(true);
    // Simulate delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Don de ${selectedAmount} FCFA validé ! (Mode démo)`);
    }, 1500);
  };

  return (
    <div className="selection:bg-brand-green selection:text-white">
      <header className="pt-48 pb-20 px-6 relative overflow-hidden">
        <div className="absolute -right-20 top-20 w-80 h-80 bg-brand-green/10 rounded-full blur-[100px] z-0"></div>
        <div className="absolute -left-20 bottom-0 w-80 h-80 bg-brand-yellow/10 rounded-full blur-[100px] z-0"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 reveal">
          <span className="section-label flex justify-center">Soutenir le Réveil</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-brand-white">
            Générosité <br />
            <span className="text-brand-yellow">Sans Limites.</span>
          </h1>
          <p className="text-xl text-brand-white/60 leading-relaxed">
            Chaque don est une graine semée pour le réveil. Soutenez S2C dans ses missions 
            d'évangélisation, d'équipement et de déploiement.
          </p>
        </div>
      </header>

      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info Card */}
          <div className="glass p-10 md:p-16 rounded-[40px] reveal">
            <h2 className="text-3xl font-bold mb-6 text-brand-white">Comment vos dons sont-ils utilisés ?</h2>
            <ul className="space-y-6 text-brand-white/70">
              <li className="flex items-start gap-4">
                <CheckCircle weight="fill" className="text-brand-green text-2xl mt-1 shrink-0" />
                <div>
                  <h4 className="text-brand-white font-bold text-lg">Financement des événements</h4>
                  <p className="text-sm">Soutenir nos rassemblements massifs et nos conférences locales.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle weight="fill" className="text-brand-green text-2xl mt-1 shrink-0" />
                <div>
                  <h4 className="text-brand-white font-bold text-lg">Missions Outreach</h4>
                  <p className="text-sm">Aider nos missionnaires à atteindre de nouvelles communautés.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle weight="fill" className="text-brand-green text-2xl mt-1 shrink-0" />
                <div>
                  <h4 className="text-brand-white font-bold text-lg">Équipement digital</h4>
                  <p className="text-sm">Développer la plateforme S2C et produire un contenu de haute qualité.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form Card */}
          <div className="bg-brand-black-soft/50 p-10 md:p-16 rounded-[40px] border border-white/10 flex flex-col justify-center reveal delay-100">
            {/* Donation Types */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => setDonationType('ONCE')}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold text-center border-2 transition-all flex flex-col items-center gap-2 ${
                  donationType === 'ONCE' 
                    ? 'border-brand-yellow text-brand-yellow bg-brand-yellow/10' 
                    : 'border-white/10 text-brand-white/50 hover:border-white/30 hover:text-brand-white'
                }`}
              >
                <span className="text-lg">Je donne</span>
                <span className="text-[10px] tracking-widest uppercase opacity-70">Don ponctuel</span>
              </button>
              <button
                onClick={() => setDonationType('REGULAR')}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold text-center border-2 transition-all flex flex-col items-center gap-2 ${
                  donationType === 'REGULAR' 
                    ? 'border-brand-yellow text-brand-yellow bg-brand-yellow/10' 
                    : 'border-white/10 text-brand-white/50 hover:border-white/30 hover:text-brand-white'
                }`}
              >
                <span className="text-lg">Je m'engage</span>
                <span className="text-[10px] tracking-widest uppercase opacity-70">Soutien régulier</span>
              </button>
            </div>

            <h3 className="text-xl font-bold mb-6 text-brand-white">Saisissez votre montant</h3>

            <div className="flex flex-wrap gap-4 mb-8">
              {[10000, 30000, 50000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all flex-1 text-center ${
                    selectedAmount === amount 
                      ? 'bg-brand-white text-brand-black scale-105 shadow-xl' 
                      : 'glass hover:border-brand-yellow text-brand-white'
                  }`}
                >
                  {amount.toLocaleString()} FCFA{donationType === 'REGULAR' ? ' / mois' : ''}
                </button>
              ))}
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="hidden" aria-hidden="true">
                <input 
                  type="text" 
                  value={honeypot} 
                  onChange={(e) => setHoneypot(e.target.value)} 
                  tabIndex="-1" 
                  autoComplete="off" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-brand-white/50 uppercase">
                  {donationType === 'REGULAR' ? 'Votre engagement mensuel' : 'Montant de votre don'} (FCFA)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(Number(e.target.value))}
                  className="w-full bg-brand-black/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-green transition-all text-xl text-brand-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary justify-center text-lg mt-4 shadow-none uppercase tracking-widest ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'TRAITEMENT...' : (donationType === 'REGULAR' ? 'Confirmer mon engagement' : 'Valider mon don')}
                <Heart weight="bold" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-brand-white/30 uppercase tracking-widest mt-6">
                <LockKey weight="fill" />
                <span>Paiement sécurisé crypté 256-bit</span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;
