"use client";
import React, { useActionState, useEffect } from "react";
import { Category, Product } from "@/types";
import { Button } from "@/components/generic/Button";
import { Input } from "@/components/generic/Input";
import { Textarea } from "@/components/generic/Textarea";
import { toast } from "sonner";
import { PopupStateEdit, useProduct } from "@/context/ProductContext";
import { Constants } from "@/types/supabase.types";
import { editProduct } from "@/actions/admin/products";
import { LoaderCircle } from "lucide-react";

const EditUI = ({ categories }: { categories: Category[] }) => {
    const { popupState, setPopupState, productList, updateProduct } =
        useProduct();
    const productId = (popupState as PopupStateEdit).id;

    const product = productList.find((p) => p.id === productId) as Required<
        Product
    >;
    const [actionState, action, isPending] = useActionState(editProduct, {
        success: null,
        ...product,
    });
    useEffect(() => {
        if (actionState.success) {
            const product = {
                ...actionState,
                success: undefined
            }
            updateProduct(product);
            toast.success("Product Edited");
        } else if (actionState.success === false) toast.error("Error");
    }, [actionState]);
    if (!product) {
        toast.error("Not Found");
        return <></>;
    }
    return (
        <form
            action={action}
            className="bg-white p-6 rounded-lg shadow-sm mb-6"
        >
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <input
                type="hidden"
                defaultValue={actionState.id ?? ""}
                name="id"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <Input
                        name="name"
                        defaultValue={actionState.name ?? ""}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Slug
                    </label>
                    <Input
                        name="slug"
                        defaultValue={actionState.slug ?? ""}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Price (₹)
                    </label>
                    <Input
                        type="number"
                        name="price"
                        defaultValue={actionState.price ?? ""}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Weight (KG)
                    </label>
                    <Input
                        name="weight"
                        type="number"
                        defaultValue={actionState.weight ?? ""}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Image URL
                    </label>
                    <Input
                        name="image"
                        defaultValue={actionState.image ?? ""}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Category
                    </label>
                    <select
                        name="categoryId"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
                        defaultValue={actionState.categoryId}
                        // onChange={(e)}
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
                    <label className="block text-sm font-medium mb-1">
                        State
                    </label>
                    <select
                        name="state"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm"
                        defaultValue={actionState.state}
                    >
                        <option defaultValue="">Select State</option>
                        {Constants.public.Enums.ProductActiveState.map((
                            state,
                        ) => (
                            <option key={state} defaultValue={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Description
                </label>
                <Input
                    name="description"
                    defaultValue={actionState.description ?? ""}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Details
                </label>
                <Textarea
                    name="details"
                    defaultValue={actionState.details ?? ""}
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
                    defaultValue={String(actionState.inStock) ?? "false"}
                    defaultChecked={actionState.inStock}
                    className="size-5"
                />
            </div>
            <div className="flex gap-2 justify-end">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        setPopupState({ type: "none" });
                    }}
                    disabled={isPending}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                    {!isPending
                        ? "Update Product"
                        : <LoaderCircle size={16} className="animate-spin" />}
                </Button>
            </div>
        </form>
    );
};

export default EditUI;
