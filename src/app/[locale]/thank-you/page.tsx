'use client';

import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/cart/Sidebar';
import ThankYou from '@/components/ThankYou';
import {Link} from '@/i18n/navigation';

const ThankYouPage: React.FC = () => {
    const [orderId, setOrderId] = useState<string | null>(null);

    useEffect(() => {
        const id = sessionStorage.getItem("orderId");
        setOrderId(id);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <Sidebar />
            <main className="flex-grow pt-24 px-4">
                {orderId ? (
                    <ThankYou orderId={orderId} />
                ) : (
                    <div className="max-w-xl mx-auto text-center mt-12">
                        <h1 className="text-3xl font-bold mb-4">No recent order found</h1>
                        <p className="mb-6 text-gray-600">It looks like you haven't placed an order yet. Please browse our products and place an order to see your confirmation here.</p>
                        <Link
                            href="/public"
                            className="inline-block px-6 py-3 bg-natural-golden text-white rounded-xl hover:bg-natural-olive transition"
                        >
                            Go to Homepage
                        </Link>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ThankYouPage;
