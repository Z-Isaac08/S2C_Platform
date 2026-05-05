import React, { useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  Play,
  Calendar,
  MicrophoneStage,
  UsersThree,
  MusicNotes,
  Lightning,
  GlobeHemisphereWest,
  Quotes,
  Heart,
  ShoppingBag,
  InstagramLogo,
  TiktokLogo,
  FacebookLogo,
} from '@phosphor-icons/react';
import useReveal from '../hooks/useReveal';
import Lightbox from '../components/Lightbox';

const HomePage = () => {
  useReveal();

  const [lightboxData, setLightboxData] = useState({
    isOpen: false,
    images: [],
    title: '',
    desc: '',
    initialIndex: 0,
  });

  const openLightbox = (images, title, desc) => {
    setLightboxData({
      isOpen: true,
      images,
      title,
      desc,
      initialIndex: 0,
    });
  };

  return (
    <div className="selection:bg-brand-green selection:text-white">
      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 video-mask">
          <div className="absolute inset-0 bg-brand-black/60 z-10"></div>
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/12663538_1920_1080_30fps.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 text-center px-6 mt-20">
          <h1 className="reveal text-5xl md:text-8xl lg:text-9xl font-bold mb-4 leading-[0.9]">
            REJOIGNEZ <br />
            <span className="text-gradient">LA FAMILLE.</span>
          </h1>
          <p className="reveal text-brand-yellow font-display text-lg md:text-2xl font-bold tracking-[0.3em] uppercase mb-8">
            Salon de Célébration et de Contemplation
          </p>
          <p className="reveal text-lg md:text-xl text-brand-white/70 max-w-2xl mx-auto mb-10 font-medium">
            Découvrez une expérience spirituelle sans barrières, centrée sur la transformation et le
            réveil de soi.
          </p>
          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/inscription" className="btn-primary w-full sm:w-auto">
              NOUS REJOINDRE
              <ArrowRight weight="bold" />
            </Link>
            <Link to="/a-propos" className="btn-secondary w-full sm:w-auto">
              EN SAVOIR PLUS
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] font-bold tracking-widest text-brand-white/30 uppercase">
            Scroll
          </span>
          <div className="w-1 h-8 bg-white/10 rounded-full relative overflow-hidden">
            <div className="absolute top-0 w-full h-1/2 bg-brand-yellow animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section id="vision" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal">
            <span className="section-label">Notre Vision</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">S2C : La Vision</h2>
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-brand-black-soft border border-white/5 group">
              <img
                src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000&auto=format&fit=crop"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                alt="Session"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-brand-yellow rounded-full flex items-center justify-center text-brand-black text-3xl hover:scale-110 transition-transform">
                  <Play weight="fill" />
                </button>
              </div>
            </div>
            <p className="mt-8 text-brand-white/60 text-lg leading-relaxed">
              Découvrez la vision derrière le{' '}
              <span className="text-brand-yellow font-bold">
                Salon de Célébration et de Contemplation
              </span>
              . Une invitation à la transformation profonde à travers une interview exclusive de
              présentation.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="reveal">
              <span className="section-label">Dernières Nouvelles</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Au cœur de S2C</h2>
            </div>

            {[
              {
                date: '15 MARS 2026',
                title: 'Lancement du S2C #4',
                desc: 'Préparez-vous pour le quatrième volet de notre série impactante.',
                img: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=400&auto=format&fit=crop',
              },
              {
                date: '10 MARS 2026',
                title: 'Nouvelle Session S2C Tribes',
                desc: 'Rejoignez votre groupe local pour une communion plus profonde.',
                img: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=400&auto=format&fit=crop',
              },
            ].map((news, i) => (
              <div
                key={i}
                className="reveal glass p-2 rounded-[32px] flex flex-col md:flex-row gap-6 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="w-full md:w-32 h-32 rounded-3xl overflow-hidden bg-brand-black-soft shrink-0">
                  <img src={news.img} className="w-full h-full object-cover" alt={news.title} />
                </div>
                <div className="flex flex-col justify-center pr-6">
                  <span className="text-brand-yellow text-xs font-bold mb-2">{news.date}</span>
                  <h4 className="text-xl font-bold mb-2">{news.title}</h4>
                  <p className="text-brand-white/40 text-sm">{news.desc}</p>
                </div>
              </div>
            ))}

            <div className="mt-8 pt-8 border-t border-white/5 reveal">
              <span className="section-label">À VENIR</span>
              <div className="space-y-6 mt-6">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green text-2xl group-hover:bg-brand-green group-hover:text-brand-black transition-all">
                    <Calendar />
                  </div>
                  <div>
                    <h5 className="font-bold">S2C Night: Adoration Non-Stop</h5>
                    <p className="text-xs text-brand-white/40">25 AVRIL 2026 • 20:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow text-2xl group-hover:bg-brand-yellow group-hover:text-brand-black transition-all">
                    <MicrophoneStage />
                  </div>
                  <div>
                    <h5 className="font-bold">Conférence: L'Art du Réveil</h5>
                    <p className="text-xs text-brand-white/40">12 MAI 2026 • 09:00</p>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="#"
              className="reveal font-bold text-brand-green flex items-center gap-2 group"
            >
              TOUTES LES ACTUALITÉS
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* IMPACT / GALLERY SECTION */}
      <section id="impact" className="py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div className="reveal">
            <span className="section-label">Impact Historique</span>
            <h2 className="text-4xl md:text-6xl font-bold">Éditions Précédentes</h2>
          </div>
          <Link to="#" className="reveal btn-secondary py-3 text-sm">
            ARCHIVES COMPLÈTES
          </Link>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'PROJET RE-PRESENT 2024',
              desc: 'ÉDITION TULSA',
              img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600',
              gallery: [
                'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200',
                'https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1200',
                'https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=1200',
              ],
            },
            {
              title: 'V4 CONFERENCE',
              desc: 'ÉDITION 2023',
              img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=600',
              gallery: [
                'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200',
                'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1200',
              ],
            },
            {
              title: 'RELATIONSHIP GOALS LIVE',
              desc: 'ÉDITION 2022',
              img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600',
              gallery: [
                'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200',
                'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1200',
              ],
            },
          ].map((item, i) => (
            <div
              key={i}
              className="reveal aspect-4/5 rounded-[40px] overflow-hidden bg-brand-black-soft relative group cursor-pointer"
              onClick={() => openLightbox(item.gallery, item.title, item.desc)}
            >
              <img
                src={item.img}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={item.title}
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-black via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-8 left-8">
                <h4 className="text-xl font-bold">{item.title}</h4>
                <p className="text-brand-yellow text-xs font-bold tracking-widest uppercase">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEPARTMENTS SECTION */}
      <section id="departements" className="py-32 px-6 bg-brand-black-soft/50">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-16">
            <span className="section-label">NOS DEPARTEMENTS</span>
            <h2 className="text-4xl md:text-6xl font-bold">S2C : Nos Départements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="reveal md:col-span-8 h-80 bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col justify-end relative overflow-hidden group hover:border-brand-green/50 transition-all duration-500">
              <UsersThree className="text-8xl absolute top-8 right-8 text-white/5 group-hover:text-brand-green/30 group-hover:rotate-12 transition-all duration-700" />
              <h3 className="text-3xl font-bold mb-4 group-hover:text-brand-green transition-colors">
                S2C TRIBES
              </h3>
              <p className="text-brand-white/50 max-w-md">
                Trouvez votre communauté locale. Des petits groupes pour grandir ensemble dans la
                foi.
              </p>
            </div>
            <div className="reveal md:col-span-4 h-80 bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col justify-end relative group hover:border-brand-green/50 transition-all duration-500">
              <MusicNotes className="text-6xl absolute top-8 right-8 text-white/5 group-hover:text-brand-green/30 group-hover:rotate-12 transition-all duration-700" />
              <h3 className="text-3xl font-bold mb-4 uppercase group-hover:text-brand-green transition-colors">
                COMITÉ MUSICAL
              </h3>
              <p className="text-brand-white/50">
                L'excellence musicale au service de l'adoration et du réveil.
              </p>
            </div>
            <div className="reveal md:col-span-4 h-80 bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col justify-end relative group hover:border-brand-yellow/50 transition-all duration-500">
              <Lightning className="text-6xl absolute top-8 right-8 text-white/5 group-hover:text-brand-yellow/30 group-hover:rotate-12 transition-all duration-700" />
              <h3 className="text-3xl font-bold mb-4 text-brand-yellow/80 group-hover:text-brand-yellow transition-colors">
                SNT YTH
              </h3>
              <p className="text-brand-white/50">
                Pour la jeunesse (12-18 ans). Impact, style et gospel.
              </p>
            </div>
            <div className="reveal md:col-span-8 h-80 bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col justify-end relative overflow-hidden group hover:border-brand-yellow/50 transition-all duration-500">
              <GlobeHemisphereWest className="text-8xl absolute top-8 right-8 text-white/5 group-hover:text-brand-yellow/30 group-hover:rotate-12 transition-all duration-700" />
              <h3 className="text-3xl font-bold mb-4 group-hover:text-brand-yellow transition-colors">
                OUTREACH & MISSIONS
              </h3>
              <p className="text-brand-white/50 max-w-md">
                Notre rayonnement au-delà des murs. Des missions internationales à l'action locale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center reveal">
          <span className="section-label">Retours & Témoignages</span>
          <Quotes className="text-6xl text-brand-green/30 mb-8 mx-auto" />
          <h2 className="text-3xl md:text-5xl font-bold italic leading-tight mb-12">
            "Le Réveil Authentique n'est pas seulement un évènement, c'est devenu mon mode de vie.
            Ma foi a été restaurée et ma vision clarifiée."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-yellow overflow-hidden p-1">
              <img
                src="https://i.pravatar.cc/150?u=s2c1"
                className="w-full h-full rounded-full object-cover"
                alt="Jean-Désiré K."
              />
            </div>
            <div className="text-left">
              <h4 className="font-bold">Jean-Désiré K.</h4>
              <p className="text-xs text-brand-white/40 uppercase tracking-widest">
                Membre S2C Tribes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DONATIONS CTA */}
      <section id="dons" className="py-32 px-6">
        <div className="max-w-7xl mx-auto glass rounded-[50px] p-10 md:p-20 relative overflow-hidden text-center reveal hover:scale-[1.01] transition-all duration-700">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-brand-green/20 rounded-full blur-[120px] animate-float"></div>
          <div
            className="absolute -left-20 -bottom-20 w-96 h-96 bg-brand-green/10 rounded-full blur-[120px] animate-float"
            style={{ animationDelay: '-3s' }}
          ></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="section-label flex justify-center">Générosité</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Soutenir l'œuvre</h2>
            <p className="text-brand-white/60 text-lg mb-12 leading-relaxed">
              Chaque don est une graine semée pour le réveil. Rejoignez-nous dans cette mission de
              transformation digitale et spirituelle.
            </p>
            <div className="flex justify-center">
              <Link to="/soutien" className="btn-primary inline-flex">
                FAIRE UN DON
                <Heart weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STORE CTA */}
      <section id="boutique" className="py-32 px-6">
        <div className="max-w-7xl mx-auto glass rounded-[50px] p-10 md:p-20 relative overflow-hidden text-center bg-brand-black-soft/30 reveal hover:scale-[1.01] transition-all duration-700">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px] animate-float"></div>
          <div
            className="absolute -left-20 -top-20 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[120px] animate-float"
            style={{ animationDelay: '-2s' }}
          ></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="section-label flex justify-center">Lifestyle Merch</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              La Boutique <span className="text-brand-yellow">Represent</span>
            </h2>
            <p className="text-brand-white/60 text-lg mb-12 leading-relaxed">
              Portez le message. Notre collection de vêtements et d'accessoires est conçue pour ceux
              qui veulent re-présenter Dieu dans leur quotidien.
            </p>
            <div className="flex justify-center">
              <Link to="/boutique" className="btn-secondary inline-flex">
                EXPLORER LA COLLECTION
                <ShoppingBag weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIALS SECTION */}
      <section className="py-32 px-6 bg-brand-yellow text-brand-black overflow-hidden relative">
        <div className="absolute -right-20 -bottom-20 rotate-12 opacity-10">
          <UsersThree size={400} weight="bold" />
        </div>
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter uppercase">
            Rejoindre la famille.
          </h2>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            <a href="#" className="group flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-[32px] bg-brand-black text-brand-yellow flex items-center justify-center text-4xl group-hover:-translate-y-4 transition-transform duration-500 shadow-2xl">
                <InstagramLogo />
              </div>
              <span className="font-bold tracking-widest text-xs">INSTAGRAM</span>
            </a>
            <a href="#" className="group flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-[32px] bg-brand-black text-brand-yellow flex items-center justify-center text-4xl group-hover:-translate-y-4 transition-transform duration-500 shadow-2xl">
                <TiktokLogo />
              </div>
              <span className="font-bold tracking-widest text-xs">TIKTOK</span>
            </a>
            <a href="#" className="group flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-[32px] bg-brand-black text-brand-yellow flex items-center justify-center text-4xl group-hover:-translate-y-4 transition-transform duration-500 shadow-2xl">
                <FacebookLogo />
              </div>
              <span className="font-bold tracking-widest text-xs">FACEBOOK</span>
            </a>
          </div>
        </div>
      </section>

      <Lightbox
        {...lightboxData}
        onClose={() => setLightboxData(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default HomePage;
