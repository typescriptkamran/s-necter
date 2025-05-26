import React from 'react';
import {getCategories, getProducts} from '@/supabase/methods';
import {AddButton, AddState, EditState} from './client'
import AddUI from "@/components/product/Add";
import EditUI from "@/components/product/Edit";
import ProductList from "@/components/product/List";

export const dynamic = 'force-dynamic'; // Forces the page to be SSR, disables caching
const ProductsManagement = async () => {

  const {data: productData, error: productError} = await getProducts();
  if (!productData || productError) return <p>{productError.message}</p>
  const {data: categoriesData, error: categoriesError} = await getCategories();
  if (!categoriesData || categoriesError) return <p>{categoriesError.message}</p>

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <AddButton/>

      </div>
        <AddState>
            <AddUI/>
        </AddState>
        <EditState>
            <EditUI/>
        </EditState>
        <ProductList productData={productData} categoriesData={categoriesData} />
    </>
  )
}

export default ProductsManagement;
