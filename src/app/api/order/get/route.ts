import { supabase } from "@/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    let response;
    try {
        const { id } = await req.json();
        if (id && Number.isInteger(id)) {
            const { error, status, data } = await supabase
                .from("organic_Order")
                .select('*')
                .eq("id", id);
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
                    error: "`id` is required and must be an integer",
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
