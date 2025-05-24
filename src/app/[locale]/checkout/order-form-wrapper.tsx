// components/OrderFormWrapper.tsx
"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import OrderForm from "./order-form";

export default function OrderFormWrapper() {
    const { cartItems } = useCart();

    return (
        <OrderForm cartItems={cartItems} />
    );
}
