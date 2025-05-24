import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabase/db";
import {  Product } from "@/types";

export const POST = async (req: NextRequest) => {
    let response;
    try {
        const product: Product = await req.json();

        console.log(product)

        
        if ( !product.name || !product.description || !product.categoryId  || !product.inStock) {
            throw new Error("Required fields are missing");
        }

        
        const { error, status: statusCode, data } = await supabase
            .from("organic_Product")
            .insert(product).select();

        if (error) {
            response = new NextResponse(
                JSON.stringify({
                    error: error.message || "An error occurred",
                }),
                { status: statusCode || 500 },
            );
        } else {
            return new NextResponse(JSON.stringify(data))
        }
    } catch (e) {
        console.log(e)
        response = new NextResponse(
            JSON.stringify({ error: (e as Error).message || "Internal Server Error" }),
            { status: 500 },
        );
    }

    return response;
};
