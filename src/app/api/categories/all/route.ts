

import { supabase } from "@/supabase/db"
import { NextResponse } from "next/server"

export const GET = async () => {
    let response;
    try {
        const request = await supabase.from('organic_Category').select('*')
        if (request.error) response = new NextResponse(JSON.stringify({ error: request.error }), { status: request.status | 500 })
        else {
            response = new NextResponse(JSON.stringify({ count: request.count, data: request.data }), { status: request.status | 200 })
        }
    } catch (e) {
        console.error(e)
    }
    return response
}