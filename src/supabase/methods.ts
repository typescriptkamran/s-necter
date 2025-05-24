import {supabase} from "@/supabase/db";

const getProducts = async () => {
    return supabase.from('organic_Product').select('*');
}
const getCategories = async () => {
    return supabase.from('organic_Category').select('*');
}
export {getProducts, getCategories}