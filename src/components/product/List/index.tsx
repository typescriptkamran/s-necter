"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/generic/Table";
import { Category, Product } from "@/types";
import Image from "next/image";
import { EditButton } from "@/app/admin/products/client";
import {  changeProductStatus } from "@/actions/admin/products";
import { Button } from "@/components/generic/Button";
import { Archive, BookOpen, Info } from "lucide-react";
import React, { useEffect } from "react";
import { useProduct } from "@/context/ProductContext";
import { Constants } from "@/types/supabase.types";

const ProductList = (
    { productData, categoriesData }: {
        productData: Product[];
        categoriesData: Category[];
    },
) => {
    const { productList, setProducts } = useProduct();
    useEffect(() => {
        setProducts(productData);
    }, [productData]);
    return (
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
            {productList.length > 0
                ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>
                                    State
                                </TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productList.map((product: Product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <Image
                                            width={48}
                                            height={48}
                                            src={product.image ?? ""}
                                            alt={product.name ?? ""}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {product.name}
                                    </TableCell>
                                    <TableCell>
                                        <span className="capitalize">
                                            {categoriesData.find((category) =>
                                                category.id ===
                                                    product.categoryId
                                            )?.name}
                                        </span>
                                    </TableCell>
                                    <TableCell>₹{product.price}</TableCell>
                                    <TableCell>
                                        {product.inStock ? "Yes" : "No"}
                                    </TableCell>
                                    <TableCell>
                                        <span className="bg-natural-golden/80 p-1 uppercase text-natural-cream rounded-sm">
                                            {product.state === "normal"
                                                ? "listed"
                                                : product.state}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <EditButton id={product.id!} />
                                            <ArchiveButton
                                                id={product.id!}
                                                state={product.state}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )
                : (
                    <div className="p-3 text-muted-foreground flex items-center justify-center w-full flex-col gap-2 h-96">
                        <Info className="size-12" />
                        <p>No Products</p>
                    </div>
                )}
        </div>
    );
};

const ArchiveButton = (
    { id, state }: {
        id: number;
        state: (typeof Constants.public.Enums.ProductActiveState)[number];
    },
) => {
    // const {}= useFormState()
    return (
        <form action={changeProductStatus}>
            <input
                type="hidden"
                value={id}
                name="id"
            />
            <input type="hidden" value={state} name="state"/>
            <Button
                variant="outline"
                size="sm"
            >
                {state !==
                        "archived"
                    ? <Archive size={16} />
                    : (
                        <BookOpen
                            size={16}
                        />
                    )}
            </Button>
        </form>
    );
};
export default ProductList;
