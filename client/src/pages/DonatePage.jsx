import React, { useState } from 'react';
import { CheckCircle, Heart, LockKey, CreditCard, DeviceMobile } from '@phosphor-icons/react';
import useReveal from '../hooks/useReveal';

const DonatePage = () => {
  useReveal();
  const [donationType, setDonationType] = useState('ONCE'); // 'ONCE' or 'REGULAR'
  const [selectedAmount, setSelectedAmount] = useState(30000);
  const [paymentMethod, setPaymentMethod] = useState('MOMO'); // 'MOMO' or 'CARD'
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    website: '', // Honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Check Honeypot
    if (formData.website) {
      console.warn("Bot detected via honeypot");
      return;
    }

    // 2. Validation
    if (!formData.email || (paymentMethod === 'MOMO' && !formData.phone)) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setIsSubmitting(true);
    
    // TODO: Send to Server (Hub2 Integration)
    console.log("Initiating payment with Hub2...", {
      amount: selectedAmount,
      type: donationType,
      method: paymentMethod,
      email: formData.email,
      phone: formData.phone
    });

    // Simulate delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Redirection vers Hub2 pour le paiement de ${selectedAmount} FCFA...`);
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
            <h2 className="text-3xl font-bold mb-6 text-brand-white">Pourquoi nous soutenir ?</h2>
            <ul className="space-y-6 text-brand-white/70">
              <li className="flex items-start gap-4">
                <CheckCircle weight="fill" className="text-brand-green text-2xl mt-1 shrink-0" />
                <div>
                  <h4 className="text-brand-white font-bold text-lg">Impact Spirituel</h4>
                  <p className="text-sm">Financement de nos conférences et moments d'adoration.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle weight="fill" className="text-brand-green text-2xl mt-1 shrink-0" />
                <div>
                  <h4 className="text-brand-white font-bold text-lg">Missions Locales</h4>
                  <p className="text-sm">Aide aux communautés et rayonnement régional.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle weight="fill" className="text-brand-green text-2xl mt-1 shrink-0" />
                <div>
                  <h4 className="text-brand-white font-bold text-lg">S2C Digital</h4>
                  <p className="text-sm">Maintenance de la plateforme et production de contenus inspirants.</p>
                </div>
              </li>
            </ul>
            
            <div className="mt-12 p-8 bg-brand-white/5 rounded-3xl border border-white/5">
              <p className="text-sm italic text-brand-white/40">
                "Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte; car Dieu aime celui qui donne avec joie."
                <span className="block mt-2 font-bold opacity-60">— 2 Corinthiens 9:7</span>
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-brand-black-soft/50 p-10 md:p-16 rounded-[40px] border border-white/10 flex flex-col justify-center reveal delay-100">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold text-center">
                {error}
              </div>
            )}

            {/* Donation Types */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => setDonationType('ONCE')}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold text-center border-2 transition-all ${
                  donationType === 'ONCE' 
                    ? 'border-brand-yellow text-brand-yellow bg-brand-yellow/10' 
                    : 'border-white/10 text-brand-white/50 hover:border-white/30'
                }`}
              >
                Je donne
              </button>
              <button
                onClick={() => setDonationType('REGULAR')}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold text-center border-2 transition-all ${
                  donationType === 'REGULAR' 
                    ? 'border-brand-yellow text-brand-yellow bg-brand-yellow/10' 
                    : 'border-white/10 text-brand-white/50 hover:border-white/30'
                }`}
              >
                Je m'engage
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <input 
                  type="text" 
                  value={formData.website} 
                  onChange={(e) => setFormData({...formData, website: e.target.value})} 
                  tabIndex="-1" 
                  autoComplete="off" 
                />
              </div>

              {/* Amount */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {[10000, 30000, 50000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setSelectedAmount(amount)}
                      className={`px-6 py-2 rounded-xl font-bold transition-all flex-1 text-sm ${
                        selectedAmount === amount 
                          ? 'bg-brand-white text-brand-black' 
                          : 'bg-white/5 text-brand-white/60 hover:bg-white/10'
                      }`}
                    >
                      {amount.toLocaleString()} FCFA
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Autre montant"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(Number(e.target.value))}
                  className="w-full bg-brand-black/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-yellow transition-all text-brand-white"
                />
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-brand-white/40 uppercase">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-brand-black/50 border border-white/10 rounded-2xl py-3 px-6 focus:outline-none focus:border-brand-yellow transition-all text-brand-white text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest text-brand-white/40 uppercase">Téléphone</label>
                  <input
                    type="tel"
                    required={paymentMethod === 'MOMO'}
                    placeholder="07 XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-brand-black/50 border border-white/10 rounded-2xl py-3 px-6 focus:outline-none focus:border-brand-yellow transition-all text-brand-white text-sm"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold tracking-widest text-brand-white/40 uppercase">Moyen de paiement</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('MOMO')}
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                      paymentMethod === 'MOMO' 
                        ? 'border-brand-green bg-brand-green/10 text-brand-green' 
                        : 'border-white/10 text-brand-white/40 grayscale hover:grayscale-0'
                    }`}
                  >
                    <DeviceMobile size={24} />
                    <div className="text-left">
                      <p className="text-xs font-bold">Mobile Money</p>
                      <p className="text-[8px] opacity-60">Orange, MTN, Wave...</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                      paymentMethod === 'CARD' 
                        ? 'border-brand-green bg-brand-green/10 text-brand-green' 
                        : 'border-white/10 text-brand-white/40 grayscale hover:grayscale-0'
                    }`}
                  >
                    <CreditCard size={24} />
                    <div className="text-left">
                      <p className="text-xs font-bold">Carte Bancaire</p>
                      <p className="text-[8px] opacity-60">Visa, Mastercard</p>
                    </div>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary justify-center text-lg mt-4 uppercase tracking-widest font-display ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'TRAITEMENT...' : (donationType === 'REGULAR' ? 'Confirmer l\'engagement' : 'Valider mon don')}
                <Heart weight="bold" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-brand-white/30 uppercase tracking-widest mt-6">
                <LockKey weight="fill" />
                <span>Paiement sécurisé via Hub2</span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;
