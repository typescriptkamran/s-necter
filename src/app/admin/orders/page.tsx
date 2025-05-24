import React from "react";
// import type {s} from '@/types';
import OrderList from "@/components/orders/List";
import { Order } from "@/types";
import { supabase } from "@/supabase/db";
import Filter from "./client";
import { getProducts } from "@/supabase/methods";


const getOrders = async () => {
    "use server"
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
            <Filter />
            <OrderList orders={orderData} products={productData} />
        </div>
    );
};

export default OrdersManagement;
