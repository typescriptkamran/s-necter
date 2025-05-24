import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/supabase/db";

export const POST = async (req: NextRequest) => {
    let response;
    try {
        const {id, status} = await req.json();



        if (!id || !status) {
            throw new Error("Required fields are missing");
        }


        const { error, status: statusCode } = await supabase
            .from("organic_Order")
            .update({
                 status: status
            }).eq('id', id);

        if (error) {
            response = new NextResponse(
                JSON.stringify({
                    error: error.message || "An error occurred",
                }),
                { status: statusCode || 500 },
            );
        } else {
            response = new NextResponse(
                JSON.stringify({ message: "Order Updated successfully" }),
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
