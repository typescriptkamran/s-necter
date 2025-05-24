"use client"
import { useCart } from "@/context/CartContext";
import {useTranslations} from "next-intl";
import React from "react";

const OrderSummary: React.FC = () => {
    const { cartItems, calculateTotal } = useCart();
    const t = useTranslations()
    return (
        <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">
                    {t("checkout.summary")}
                </h2>

                <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                        <div key={item.product.id} className="flex justify-between">
                            <div>
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-gray-600">
                                    {item.quantity} x{" "}
                                    {t("product.price", { price: item.product.price! })}
                                </p>
                            </div>
                            <p className="font-medium">
                                {t("product.price", {
                                    price: item.product.price! * item.quantity,
                                })}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                        <span>{t("cart.total")}</span>
                        <span>{t("product.price", { price: calculateTotal() })}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary;