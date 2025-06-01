import {routing} from '@/i18n/routing'
type TranslationSchema = {
    nav: {
        home: string;
        products: string;
        about: string;
        contact: string;
    };
    product: {
        price: string; // e.g., "$ {price}"
    };
    meta: {
        title: string;
        description: string;
        keywords: string;
    };
    home: {
        hero: {
            title: string;
            subtitle: string;
            cta: string;
        };
    };
    cart: {
        title: string;
        empty: string;
        total: string;
        checkout: string;
        quantity: string;
    };
    checkout: {
        title: string;
        name: string;
        phone: string;
        address: string;
        paymentMethod: string;
        cod: string;
        summary: string;
        placeOrder: string;
        namePlaceholder: string;
        phonePlaceholder: string;
        addressPlaceholder: string;
    };
    thankYou: {
        title: string;
        message: string;
        orderNumber: string; // e.g., "Order Number: {orderId}"
        contactMessage: string;
        backToHome: string;
    };
    language: {[k in (typeof routing.locales)[number]]: string};
};
export type MessageReturnType = {locale: string, messages: TranslationSchema} | {}
export type {TranslationSchema};