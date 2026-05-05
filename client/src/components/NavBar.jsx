import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { List } from '@phosphor-icons/react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 px-6 transition-all duration-500 ${
        isScrolled ? 'glass py-4' : 'py-8'
      }`} 
      id="main-nav"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <Link
          to="/"
          id="nav-logo"
          className={`flex items-center gap-3 transition-all duration-500 whitespace-nowrap ${
            isScrolled 
              ? 'opacity-100 max-w-xs pointer-events-auto mr-8' 
              : 'opacity-0 max-w-0 overflow-hidden pointer-events-none'
          }`}
        >
          <div className="w-12 h-12 bg-brand-yellow rounded-xl flex items-center justify-center rotate-3 shadow-xl shrink-0">
            <span className="text-brand-black font-display font-bold text-2xl tracking-tighter">S2C</span>
          </div>
          <span className="font-display font-bold text-2xl tracking-wide hidden sm:block shrink-0">STRUCTURE S2C</span>
        </Link>

        {/* Links Container */}
        <div
          id="nav-links-container"
          className={`flex-1 flex transition-all duration-500 pr-8 lg:pr-0 ${
            isScrolled ? 'justify-center' : 'justify-start'
          }`}
        >
          <div className="hidden lg:flex items-center gap-10">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `text-sm font-semibold transition-colors hover:text-brand-yellow ${isActive ? 'text-brand-yellow' : ''}`
              }
            >
              ACCUEIL
            </NavLink>
            <NavLink
              to="/soutien"
              className={({ isActive }) => 
                `text-sm font-semibold transition-colors hover:text-brand-yellow ${isActive ? 'text-brand-yellow' : ''}`
              }
            >
              DONS
            </NavLink>
            <NavLink
              to="/departements"
              className={({ isActive }) => 
                `text-sm font-semibold transition-colors hover:text-brand-yellow ${isActive ? 'text-brand-yellow' : ''}`
              }
            >
              DÉPARTEMENTS
            </NavLink>
            <NavLink
              to="/boutique"
              className={({ isActive }) => 
                `text-sm font-semibold transition-colors hover:text-brand-yellow ${isActive ? 'text-brand-yellow' : ''}`
              }
            >
              BOUTIQUE
            </NavLink>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-6 shrink-0">
          <Link
            to="/inscription"
            className="px-6 py-3 border border-brand-white/20 rounded-full text-sm font-bold bg-white/5 hover:bg-white/10 transition-all"
          >
            S'INSCRIRE
          </Link>
          <button className="text-3xl lg:hidden">
            <List />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
