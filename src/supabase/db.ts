import { Database } from "@/types/supabase.types";
import { createClient } from "@supabase/supabase-js";
const site = process.env.SUPABASE_SITE
const token = process.env.SUPABASE_TOKEN
export const supabase = createClient<Database>(site!, token!)