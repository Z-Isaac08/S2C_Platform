import React, { useState } from 'react';
import { Plus, Books } from '@phosphor-icons/react';
import useReveal from '../hooks/useReveal';

const StorePage = () => {
  useReveal();
  const [filter, setFilter] = useState('TOUT');

  const products = [
    {
      id: 1,
      name: 'T-Shirt "REVEIL" Noir',
      price: '15 000 FCFA',
      category: 'VÊTEMENTS',
      img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800'
    },
    {
      id: 2,
      name: 'Ouvrage: La Voie du Réveil',
      price: '10 000 FCFA',
      category: 'OUVRAGES',
      img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800'
    },
    {
      id: 3,
      name: 'Hoodie S2C Authentique',
      price: '25 000 FCFA',
      category: 'VÊTEMENTS',
      img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800',
      soldOut: true
    },
    {
      id: 4,
      name: 'Casquette "Represent" 24',
      price: '8 000 FCFA',
      category: 'ACCESSOIRES',
      img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800'
    },
    {
      id: 5,
      name: 'T-Shirt "TRIBES" Blanc',
      price: '15 000 FCFA',
      category: 'VÊTEMENTS',
      img: 'https://images.unsplash.com/photo-1620012253291-b3b320d32bb5?q=80&w=800'
    }
  ];

  const filteredProducts = filter === 'TOUT' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="selection:bg-brand-green selection:text-white">
      <header className="pt-48 pb-20 px-6 relative overflow-hidden bg-brand-black-soft/30 border-b border-white/5">
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-brand-yellow/10 rounded-full blur-[100px]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 reveal">
          <span className="section-label flex justify-center">Lifestyle Merch</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-brand-white">
            La Boutique <br />
            <span className="text-brand-yellow">Represent.</span>
          </h1>
          <p className="text-xl text-brand-white/60 leading-relaxed max-w-2xl mx-auto">
            Découvrez notre collection de vêtements, ressources et accessoires exclusifs.
          </p>
        </div>
      </header>

      <section className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto pt-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center reveal">
            {['TOUT', 'VÊTEMENTS', 'OUVRAGES', 'ACCESSOIRES'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full border border-white/20 text-sm font-bold transition-all ${
                  filter === cat 
                    ? 'bg-brand-yellow text-brand-black' 
                    : 'hover:bg-white/5 text-brand-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, i) => (
              <div key={product.id} className="reveal group cursor-pointer">
                <div className="relative rounded-[40px] overflow-hidden aspect-square bg-brand-black-soft mb-6">
                  <img
                    src={product.img}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={product.name}
                  />
                  {product.soldOut ? (
                    <div className="absolute inset-x-0 bottom-4 px-4">
                      <span className="bg-brand-green text-brand-white text-[10px] font-bold px-3 py-1 rounded-full">
                        SOLD OUT
                      </span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="w-14 h-14 bg-brand-white text-brand-black rounded-full flex items-center justify-center text-xl">
                        <Plus weight="bold" />
                      </span>
                    </div>
                  )}
                </div>
                <h4 className={`font-bold text-xl uppercase tracking-tight ${product.soldOut ? 'text-brand-white/30' : 'text-brand-white'}`}>
                  {product.name}
                </h4>
                <p className={`font-bold mt-1 ${product.soldOut ? 'text-brand-white/10' : 'text-brand-yellow'}`}>
                  {product.price}
                </p>
              </div>
            ))}

            {/* Special Pack Item */}
            {filter === 'TOUT' || filter === 'OUVRAGES' ? (
              <div className="reveal group cursor-pointer delay-100">
                <div className="relative rounded-[40px] overflow-hidden aspect-[4/5] bg-brand-black-soft mb-6 flex items-center justify-center border border-white/5">
                  <div className="text-center p-6">
                    <Books className="text-4xl text-brand-green mb-4 mx-auto" weight="bold" />
                    <h3 className="text-xl font-bold mb-2 text-brand-white">Pack Vision Complète</h3>
                    <p className="text-sm text-brand-white/40 mb-4">
                      Comprenant tous nos ouvrages de la deuxième édition.
                    </p>
                    <button className="px-6 py-2 bg-white/10 rounded-full text-xs font-bold hover:bg-brand-green hover:text-brand-black transition-all text-brand-white">
                      VOIR L'OFFRE
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StorePage;
