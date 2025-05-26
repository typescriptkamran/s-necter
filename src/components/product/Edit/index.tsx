
import { getCategories } from "@/supabase/methods";
import EditUI from "./client";

const EditUIWrapper = async () => {
  const {data: categories, error: categoriesError} = await getCategories()
  if (!categories || categoriesError) return <p>{categoriesError.message}</p>
    return (
      <EditUI categories={categories}/>
  );
}

export default EditUIWrapper;