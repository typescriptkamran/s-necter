"use client"
import React from 'react';
import { useRouter} from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

const ThankYou = ({orderId}: {orderId: string}) => {
  // const location = useLocation();
  const router = useRouter();
  const t = useTranslations("thankYou")

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <Check className="h-10 w-10 text-natural-olive" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">
          {t('title')}
        </h1>
        
        <p className="text-xl mb-3">
          {t('message')}
        </p>
        
        <p className="text-lg font-medium mb-6">
          {t('orderNumber', { orderId: orderId! })}
        </p>
        <p className="text-gray-600 mb-8">
          {t('contactMessage')}
        </p>
        
        <button
          onClick={() => router.push('/')}
          className="btn-primary"
        >
          {t('backToHome')}
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
