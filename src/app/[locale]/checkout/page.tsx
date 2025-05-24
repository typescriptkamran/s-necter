"use client";
import React from "react";
import {useTranslations} from "next-intl";
import OrderSummary from './order-summary'
import OrderFormWrapper from './order-form-wrapper'

const CheckoutForm: React.FC = () => {
    const t = useTranslations()
    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">
                {t("checkout.title")}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-3">
                    <OrderFormWrapper/>
                    {/* Order Summary */}
                    <OrderSummary/>
                </div>
            </div>
        </div>
    )
};

            export default CheckoutForm;
