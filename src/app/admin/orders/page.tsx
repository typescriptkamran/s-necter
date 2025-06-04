import React from "react";
// import type {s} from '@/types';
import OrderList from "@/components/orders/List";
import { Order } from "@/types";
import { supabase } from "@/supabase/db";
import { Filter, SearchInput } from "./client";
import { getProducts } from "@/supabase/methods";

export const dynamic = "force-dynamic"; // Forces the page to be SSR, disables caching
const getOrders = async () => {
    "use server";
    let data: Order[] | null = null, error = "";
    try {
        const { data: $data, error: $error } = await supabase.from(
            "organic_Order",
        ).select("*");
        data = $data as Order[] | null;
        error = $error?.message ?? "";
    } catch (e) {
        error = e instanceof Error ? e.message : String(e);
    }
    return { data, error };
};
const OrdersManagement: React.FC = async () => {
    const { data: orderData, error: orderError } = await getOrders();
    if (orderError || !orderData) return <p>{orderError}</p>;
    const { data: productData, error: productError } = await getProducts();
    if (productError || !productData) return <p>{productError.message}</p>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Orders Management</h1>
                <span>
                <SearchInput />

                </span>
            </div>

            <Filter />
            <OrderList orders={orderData} products={productData} />
        </div>
    );
};

export default OrdersManagement;
