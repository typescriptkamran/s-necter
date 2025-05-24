import { supabase } from "@/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    let response;
    try {
        const { id, slug } = await req.json();
        if (id && Number.isInteger(id) || slug) {
            const { error, status, data } = await supabase
                .from("organic_Product")
                .select('*')
                .eq(`${id ? 'id' : 'slug'}`, id ? id : slug)
            if (error) {
                response = new NextResponse(
                    JSON.stringify({
                        error: error.message || "An error occurred",
                    }),
                    { status: status || 500 },
                );
            } else {
                response = new NextResponse(
                    JSON.stringify({ data: data }),
                    { status: 200 },
                );
            }
        } else {
            response = new NextResponse(
                JSON.stringify({
                    error: "`id` or `slug ` are required",
                }),
                { status: 400 },
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
