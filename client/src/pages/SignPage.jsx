import React, { useState } from 'react';
import useReveal from '../hooks/useReveal';

const SignPage = () => {
  useReveal();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+225',
    phone: '',
    website: '', // Honeypot
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validatePhone = (phone) => {
    // Validation souple pour l'international : au moins 8 chiffres
    return /^\d{8,15}$/.test(phone.replace(/\s/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // 1. Check Honeypot
    if (formData.website) {
      console.warn("Bot detected via honeypot");
      return;
    }

    // 2. Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError('Tous les champs sont obligatoires.');
      setIsSubmitting(false);
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError('Veuillez entrer un numéro de téléphone valide.');
      setIsSubmitting(false);
      return;
    }

    // 3. Send to Server
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/members/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          countryCode: formData.countryCode,
          phone: formData.phone,
          website: formData.website,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.errors?.[0]?.message || 'Une erreur est survenue.');
      }

      setIsSubmitting(false);
      alert("Inscription réussie ! Un email de confirmation vous a été envoyé.");
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+225',
        phone: '',
        website: '',
      });

    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="selection:bg-brand-green selection:text-white">
      <header className="pt-48 pb-10 px-6 text-center reveal">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 uppercase tracking-tighter">
          Rejoindre le <span className="text-brand-yellow italic">Mouvement</span>
        </h1>
        <p className="text-brand-white/50 text-xl font-display uppercase tracking-widest">
          Inscrivez-vous pour la prochaine édition
        </p>
      </header>

      <section className="py-12 px-6 max-w-2xl mx-auto reveal delay-100">
        <div className="glass p-10 md:p-12 rounded-[40px]">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold text-center">
              {error}
            </div>
          )}
          
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <input 
                type="text" 
                name="website" 
                value={formData.website} 
                onChange={(e) => setFormData({...formData, website: e.target.value})} 
                tabIndex="-1" 
                autoComplete="off" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-brand-white/40 uppercase">
                  Prénom
                </label>
                <input
                  type="text"
                  required
                  placeholder="Paul"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-brand-black/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-yellow transition-all text-brand-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-brand-white/40 uppercase">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  placeholder="Koffi"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-brand-black/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-yellow transition-all text-brand-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-brand-white/40 uppercase">
                Adresse Email
              </label>
              <input
                type="email"
                required
                placeholder="paul.koffi@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-brand-black/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-yellow transition-all text-brand-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-brand-white/40 uppercase">
                Numéro de Téléphone
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="+225"
                  value={formData.countryCode}
                  onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                  className="w-24 bg-brand-black/50 border border-white/10 rounded-2xl py-4 px-4 text-center text-sm font-bold text-brand-white focus:outline-none focus:border-brand-yellow transition-all"
                />
                <input
                  type="tel"
                  required
                  placeholder="07 XX XX XX XX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="flex-1 bg-brand-black/50 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-yellow transition-all text-brand-white"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary justify-center text-lg uppercase tracking-widest font-display ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'TRAITEMENT EN COURS...' : 'CONFIRMER MON INSCRIPTION'}
              </button>
              <p className="text-[10px] text-center text-brand-white/30 mt-6 uppercase tracking-[0.2em]">
                En vous inscrivant, vous acceptez de recevoir nos actualités par email.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignPage;
