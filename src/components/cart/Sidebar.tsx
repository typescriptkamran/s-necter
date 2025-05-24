"use client"
import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import Image from "next/image"
const Sidebar: React.FC = () => {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart,
    calculateTotal
  } = useCart();
  const t = useTranslations()
  const router = useRouter();
  
  const handleCheckout = () => {
    closeCart();
    router.push('/checkout'); // or any path
  };
  
  if (!isCartOpen) return null;
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40" 
        onClick={closeCart}
      ></div>
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 animate-slide-in-right overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">{t('cart.title')}</h2>
          <button 
            onClick={closeCart}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="grow overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p>{t('cart.empty')}</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.product.id} className="border-b pb-4">
                  <div className="flex items-center">
                    <div className="w-20 h-20 rounded overflow-hidden mr-3">
                      <Image 
                        width={300}
                        height={400}
                        src={item.product.image!} 
                        alt={item.product.name!}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="grow">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        {t('product.price', { price: item.product.price! })}
                      </p>
                      
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => updateQuantity(item.product.id!, item.quantity - 1)}
                          className="p-1 bg-gray-100 rounded"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id!, item.quantity + 1)}
                          className="p-1 bg-gray-100 rounded"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{t('product.price', { price: item.product.price! * item.quantity })}</p>
                      <button 
                        onClick={() => removeFromCart(item.product.id!)}
                        className="text-red-500 text-sm mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="p-4 border-t mt-auto">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">{t('cart.total')}</span>
              <span className="font-semibold">{t('product.price', { price: calculateTotal() })}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full btn-primary py-3"
            >
              {t('cart.checkout')}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
