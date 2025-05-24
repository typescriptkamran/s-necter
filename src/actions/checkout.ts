"use server";
import { supabase } from "@/supabase/db";
import { z } from "zod";
import {OrderItem} from "@/types";
import {revalidatePath} from "next/cache";

type CheckListState = {
    errors: {
        general?: string;
        phone?: string;
        address?: string;
        name?: string;
        cart?: string;
    };
    success: false | { value: true; id: number };
};

// Define Zod Schema with nested cart validation
const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    cart: z
        .string()
        .min(1, { message: "Cart is required" })
        .transform((val) => {
            try {
                console.log(val)
                return JSON.parse(val);
            } catch {
                throw new Error("Invalid cart format");
            }
        })
        .refine(
            (cart) =>
                cart &&
                Array.isArray(cart.items) &&
                cart.items.length > 0 &&
                cart.items.every(
                    (item: OrderItem) =>
                        Number.isInteger(item.count) &&
                        item.count > 0 &&
                        Number.isInteger(item.id)
                ),
            { message: "Invalid cart structure" }
        ),
});

const checklistAction = async (
    _: CheckListState,
    formData: FormData
): Promise<CheckListState> => {
    try {
        const raw = {
            name: formData.get("name"),
            address: formData.get("address"),
            phone: formData.get("phone"),
            cart: formData.get("cart"),
        };

        const parseResult = formSchema.safeParse(raw);

        if (!parseResult.success) {
            const fieldErrors = parseResult.error.flatten().fieldErrors;

            return {
                success: false,
                errors: {
                    name: fieldErrors.name?.[0],
                    address: fieldErrors.address?.[0],
                    phone: fieldErrors.phone?.[0],
                    cart: fieldErrors.cart?.[0],
                    general: "Required Fields Are Missing",
                },
            };
        }

        const { name, address, phone, cart } = parseResult.data;

        const { data, error } = await supabase
            .from("organic_Order")
            .insert({
                name: name.trim(),
                address: address.trim(),
                phone: phone.trim(),
                status: "pending",
                cart: cart,
            })
            .select();

        if (error) {
            return { errors: { general: error.message }, success: false };
        }

        if (!data || !data[0] || !Number.isInteger(data[0].id)) {
            return {
                errors: {
                    general: "Unexpected Response From Database",
                },
                success: false,
            };
        }
        revalidatePath('/admin/orders')
        return { success: { value: true, id: data[0].id }, errors: {} };
    } catch (error) {
        return {
            errors: {
                general: error instanceof Error ? error.message : String(error),
            },
            success: false,
        };
    }
};

export { checklistAction };
export type { CheckListState };
