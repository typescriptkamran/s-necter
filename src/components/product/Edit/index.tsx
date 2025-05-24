'use client'
import React, { useEffect, useState } from "react";
import {Category, Product, ProductStatus} from "@/types";
import { Button } from "@/components/generic/Button";
import { Input } from "@/components/generic/Input";
import { Textarea } from "@/components/generic/Textarea";
import { toast } from "sonner";
import { fetchCategories, fetchProduct } from "@/helpers/fetch";
import { PopupStateEdit, useProduct } from "@/context/ProductContext";
import {Constants} from "@/types/supabase.types";

const EditUI =() => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product>({} as Product);
  const { popupState, setPopupState, updateProduct } = useProduct();
  const getProduct = async (id: number) => {
    const { error, data } = await fetchProduct(id);
    if (error) {
      toast.error(`Error: ${error}`);
    } else setProduct(data[0]);
  };

  const getCategories = async () => {
    const { error, data } = await fetchCategories();
    if (error) {
      toast.error(`Error: ${error}`);
    } else {
      setCategories(data);
    }
  };
  const productId = (popupState as PopupStateEdit).id;
  useEffect(() => {
    getCategories().then(async () => {
      await getProduct(productId);
    });
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateProduct(product);
  };

  if (!product) {
    toast.loading("Product is Loading..");
    return <></>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-sm mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      <input type="hidden" value={product.id ?? ""} name="id" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            name="name"
            value={product.name ?? ""}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <Input
            name="slug"
            value={product.slug ?? ""}
            onChange={(e) => setProduct({ ...product, slug: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price (₹)</label>
          <Input
            type="number"
            name="price"
            value={product.price ?? ""}
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Weight (KG)</label>
          <Input
              type="number"
              name="weight"
              value={product.weight ?? ""}
              onChange={(e) =>
                  setProduct({ ...product, weight: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <Input
            name="image"
            value={product.image ?? ""}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="categoryId"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
            value={product.categoryId}
            onChange={(e) =>
              setProduct({ ...product, categoryId: Number(e.target.value) })}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
              name="status"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
              value={product.state}
              onChange={(e) =>
                  setProduct({ ...product, state: e.target.value as ProductStatus })}
          >
            <option value="">Select State</option>
            {Constants.public.Enums.ProductActiveState.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <Input
          name="description"
          value={product.description ?? ""}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Details</label>
        <Textarea
            name="details"
            value={product.details ?? ""}
            onChange={(e) =>
                setProduct({ ...product, details: e.target.value })}
            className="h-24"
        />
      </div>
      <div className="mb-4">
        <label className="inline-block mr-1 text-sm font-medium">
          In Stock
        </label>
        <Input
          type="checkbox"
          name="inStock"
          value={String(product.inStock) ?? "false"}
          checked={product.inStock}
          onChange={(e) =>
            setProduct({ ...product, inStock: Boolean(e.target.value) })}
          className="size-5"
        />
      </div>
      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setProduct({} as Product);
            setPopupState({ type: "none" });
          }}
        >
          Cancel
        </Button>
        <Button type="submit">Update Product</Button>
      </div>
    </form>
  );
}

export default EditUI;