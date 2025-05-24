"use client"
import React from 'react';
import { useTranslations } from 'next-intl';

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('featured-products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const t=useTranslations('home')
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1515778767554-195d641642a1?auto=format&fit=crop&w=1920&h=1080")',
          backgroundPosition: 'center 70%'
        }}
      >
        <div className="absolute inset-0 bg-black/30 z-0"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 mt-16">
        <div className="max-w-2xl text-white">
          <h1 className="mb-4 leading-tight">
            {t('hero.title')}
          </h1>
          <h2 className="text-xl md:text-2xl mb-8 font-normal">
            {t('hero.subtitle')}
          </h2>
          <button 
            onClick={scrollToProducts}
            className="btn-primary text-lg px-8 py-3"
          >
            {t('hero.cta')}
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
