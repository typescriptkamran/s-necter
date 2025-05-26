"use server";

import { supabase } from "@/supabase/db";
import { revalidatePath } from "next/cache";
import { withValidatedAction, withValidatedStateAction } from "@/lib/utils";
import { z } from "zod/v4";
import { Constants } from "@/types/supabase.types";
const AddProductSchema = z.object({
    name: z.coerce.string().nonempty().nonoptional(),
    slug: z.coerce.string().nonempty().nonoptional(),
    description: z.coerce.string().nonempty().nonoptional(),
    image: z.coerce.string().nonempty().nonoptional(),
    price: z.coerce.number().nonnegative(),
    categoryId: z.coerce.number().nonnegative().nonoptional(),
    inStock: z.coerce.boolean().default(false),
    details: z.coerce.string().nonempty().nonoptional(),
    weight: z.coerce.number().nonnegative().nonoptional(),
    state: z.enum(Constants.public.Enums.ProductActiveState).nonoptional().default('normal')
})
const addProduct = withValidatedAction(AddProductSchema, async (parsed) => {
    if (!parsed.success) return;
    const newProduct = parsed.data;

    const { error } = await supabase.from('organic_Product').insert(newProduct)

    if (error) {
        throw new Error(`Error inserting product: ${error.message}`)
    }

    // ✅ Revalidate relevant paths
    revalidatePath('/products')           // product listing page
    revalidatePath(`/product/${newProduct.slug}`)    // dynamic product detail page
    revalidatePath('/')                   // optional: homepage if needed

})

const EditProductSchema = z.object({
    success: z.coerce.boolean().nullable(),
    id: z.coerce.number().nonnegative().nonoptional(),
    name: z.coerce.string().nonempty().nonoptional(),
    slug: z.coerce.string().nonempty().nonoptional(),
    description: z.coerce.string().nonempty().nonoptional(),
    image: z.coerce.string().nonempty().nonoptional(),
    price: z.coerce.number().nonnegative(),
    categoryId: z.coerce.number().nonnegative().nonoptional(),
    inStock: z.coerce.boolean().default(false),
    details: z.coerce.string().nonempty().nonoptional(),
    weight: z.coerce.number().nonnegative().nonoptional(),
    state: z.enum(Constants.public.Enums.ProductActiveState).nonoptional().default('normal')
})
const editProduct = withValidatedStateAction(EditProductSchema, async ({ success, data }, prevState) => {
    if (!success) return {
        ...prevState,
        success: false
    };
    // change the product state
    const { error: editError, data: product } = await supabase
        .from("organic_Product")
        .update({ ...data, success: undefined, created_at: undefined, id: undefined })
        .eq("id", data.id)
        .select()
        .single()
    if (editError) {
        console.error("Error editing product :", editError.message);
        return { ...prevState, success: false };
    }
    // Revalidate paths
    revalidatePath("/products/");
    revalidatePath(`/product/${product.slug}`);
    return { ...product, success: true }
});

const changeProductStatusSchema = z.object({
    success: z.coerce.boolean().nullable(),
    id: z.coerce.number().nonnegative().nonoptional(),
    state: z.enum(Constants.public.Enums.ProductActiveState).nonoptional().default('normal')

})
const changeProductStatus = withValidatedStateAction(changeProductStatusSchema, async ({ success, data }, prevState) => {
    if (!success) return {
        success: false,
        id: prevState.id,
        state: prevState.state
    };
    // change the product state
    const { error: stateError, data: product } = await supabase
        .from("organic_Product")
        .update({ state: data.state })
        .eq("id", data.id)
        .select()
        .single()
    if (stateError) {
        console.error("Error changing product state:", stateError.message);
        return { success: false, id: prevState.id, state: prevState.state };
    }
    // Revalidate paths
    revalidatePath("/products/");
    revalidatePath(`/product/${product.slug}`);
    return { success: true, id: prevState.id, state: product.state }
});

export { changeProductStatus, addProduct, editProduct };
