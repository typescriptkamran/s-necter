'use client'
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Hero: React.FC = () => {
    const scrollToProducts = () => {
        const productsSection = document.getElementById('featured-products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const t = useTranslations('home');

    return (
        <div className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero.jpg"
                    alt="Hero Background"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center 70%' }}
                    priority
                    quality={100}
                />
                <div className="absolute inset-0 bg-black/30 z-10" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 z-20 mt-16">
                <div className="max-w-2xl text-white">
                    <h1 className="mb-4 leading-tight">{t('hero.title')}</h1>
                    <h2 className="text-xl md:text-2xl mb-8 font-normal">{t('hero.subtitle')}</h2>
                    <button
                        onClick={scrollToProducts}
                        className="btn-primary text-lg px-8 py-3"
                    >
                        {t('hero.cta')}
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
                <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </div>
    );
};

export default Hero;
