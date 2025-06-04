"use client"
import React, {useEffect, useState} from 'react';
import {Link} from '@/i18n/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/generic/Button';
import { useCart } from '@/context/CartContext';
import LanguageSelector from '@/components/LanguageSelector';
import {useTranslations} from "next-intl";
import {motion, useScroll, useTransform} from 'motion/react'
import {usePathname} from '@/i18n/navigation'
const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, toggleCartSidebar } = useCart();
  const t = useTranslations('nav');
  const pathname = usePathname()
  const {scrollY} = useScroll()
  const background = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]);
  const color = useTransform(scrollY, [0, 50], ["#F9F6F1", "#000000"]);
  const [animate,setAnimate] = useState(false)
  useEffect(() => {
    if (pathname === '/') {
      setAnimate(true)
    } else setAnimate(false)
  }, [pathname])
  // Calculate total items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <motion.header
        style={animate ? {
          backgroundColor: background,
          color
        }:{}}
        className={(animate ? '' : 'bg-white') + ' ' + "fixed w-full top-0 z-50 shadow-sm"}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold">
          KhalisG
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="nav-link">
            {t('home')}
          </Link>
          <Link href="/products" className="nav-link">
            {t('products')}
          </Link>
          <Link href="/about" className="nav-link">
            {t('about')}
          </Link>
          <Link href="/contact" className="nav-link">
            {t('contact')}
          </Link>
        </nav>

        {/* Right side - Language + Cart */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Cart Button */}
          <Button
            variant="outline"
            size="icon" 
            // size="icon"
            onClick={toggleCartSidebar}

            className={(animate ? 'border-transparent' : '') + " " + "relative bg-transparent"}
          >
            <ShoppingCart size={18} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-natural-golden text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg p-4">
          <div className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="nav-link block py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <Link 
              href="/products" 
              className="nav-link block py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('products')}
            </Link>
            <Link 
              href="/about" 
              className="nav-link block py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <Link 
              href="/contact" 
              className="nav-link block py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('contact')}
            </Link>
          </div>
        </nav>
      )}
    </motion.header>
  );
};

export default NavBar;
