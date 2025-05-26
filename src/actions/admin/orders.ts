"use server"
import { withValidatedStateAction } from "@/lib/utils";
import { supabase } from "@/supabase/db";
import { Constants } from "@/types/supabase.types";
import {z} from 'zod/v4'

const changeOrderStatusSchema = z.object({
    success: z.coerce.boolean().nullable(),
    id: z.coerce.number().nonnegative().nonoptional(),
    state: z.enum(Constants.public.Enums.OrderStatus).nonoptional().default('pending')

})
const changeOrderStatus = withValidatedStateAction(changeOrderStatusSchema, async ({ success, data }, prevState) => {
    if (!success) return {
        success: false,
        id: prevState.id,
        state: prevState.state
    };
    // change the product state
    const { error: stateError, data: order } = await supabase
        .from("organic_Order")
        .update({ status: data.state })
        .eq("id", data.id)
        .select()
        .single()
    if (stateError) {
        console.error("Error changing order state:", stateError.message);
        return { success: false, id: prevState.id, state: prevState.state };
    }
    // Revalidate paths
    return { success: true, id: prevState.id, state: order.status }
});

export {changeOrderStatus}
