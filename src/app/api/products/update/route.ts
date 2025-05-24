import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabase/db";
import { Product } from "@/types";

export const POST = async (req: NextRequest) => {
    let response;
    try {


        const product: Omit<Product, 'created_at'> = await req.json()
        if (!product || !product.id) return new NextResponse(
            JSON.stringify({
                error: "Empty Body",
            }),
            { status: 401 },
        );


        const { error, status } = await supabase
            .from("organic_Product")
            .update({
                ...product
            }).eq('id', product.id!);

        if (error) {
            response = new NextResponse(
                JSON.stringify({
                    error: error.message || "An error occurred",
                }),
                { status: status || 500 },
            );
        } else {
            response = new NextResponse(
                JSON.stringify({ message: "Product Updated successfully" }),
                { status: 200 },
            );
        }
    } catch (e) {
        response = new NextResponse(
            JSON.stringify({ error: (e as Error).message || "Internal Server Error" }),
            { status: 500 },
        );
    }

    return response;
};
