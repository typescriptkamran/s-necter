import {Input} from "@/components/generic/Input";
import React from "react";
import {Button} from "@/components/generic/Button";
import {Textarea} from "@/components/generic/Textarea";
import {UploadImage,CancelButton} from './Client'
import {Category} from "@/types";
import {getCategories} from "@/supabase/methods";
import { addProduct } from "@/actions/admin/products";
import {Constants} from '@/types/supabase.types'
const AddUI = async () => {
    const {data: categories, error} = await getCategories();

    if (!categories || error) return <p>{error.message}</p>
    return (
        <form
            className="bg-white p-6 rounded-lg shadow-sm mb-6"
            action={addProduct}
        >
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input
                        name="name"
                        defaultValue=""
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <Input
                        name="slug"
                        defaultValue={""}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Price (₹)</label>
                    <Input
                        type="number"
                        name="price"
                        defaultValue={0}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Weight (KG)</label>
                    <Input
                        type="number"
                        name="weight"
                        defaultValue={0}
                    />
                </div>

                <UploadImage/>
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        name="categoryId"
                        defaultValue={categories[0].id}
                    >
                        <option value="" disabled>Select Category</option>
                        {categories.map((category: Category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        name="state"
                        defaultValue={Constants.public.Enums.ProductActiveState[0]}
                    >
                        <option value="" disabled>Select Category</option>
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
                    defaultValue={""}

                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Details</label>
                <Textarea
                    name="details"
                    defaultValue={""}
                    className="h-24"
                />
            </div>
            <div className="mb-4">
                <label className="inline-block mr-2 text-sm font-medium">
                    In Stock
                </label>
                <input type="checkbox"
                    name="inStock"
                    defaultChecked={false}
                    className="size-5"
                />
            </div>
            <div className="flex gap-2 justify-end">
                <CancelButton/>
                <Button type="submit">Save Product</Button>
            </div>
        </form>
    );
};

export default AddUI;