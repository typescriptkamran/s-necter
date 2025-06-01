"use client";
import React, { PropsWithChildren, RefObject, useEffect } from "react";
import { Pencil, Plus, Search } from "lucide-react";
import { Button } from "@/components/generic/Button";
import { useProduct } from "@/context/ProductContext";
import { Input } from "@/components/generic/Input";
import { useSearch } from "@/context/SearchContext";
import { Product } from "@/types";
export const AddState = ({ children }: PropsWithChildren) => {
    const { popupState } = useProduct();

    return (
        popupState.type === "add" ? <div>{children}</div> : <></>
    );
};
export const EditState = ({ children }: PropsWithChildren) => {
    const { popupState } = useProduct();

    return (
        popupState.type === "edit" ? <div>{children}</div> : <></>
    );
};

export const SearchInput = () => {
    const ref = React.useRef<HTMLInputElement>(null);
    const { dispatch, state } = useSearch<Product>();
    useEffect(() => {
        if (ref.current) {
            dispatch({
                type: "SET_INPUT_REF",
                payload: ref as RefObject<HTMLInputElement>,
            });
        }
    }, [ref]);
    return (
        <Input
            icon={<Search size={16} />}
            ref={ref}
            value={state.searchTerm}
            onChange={(e) =>
                dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })}
            placeholder="Search.."
        />
    );
};
export const AddButton = () => {
    const { setPopupState } = useProduct();

    return (
        <Button onClick={() => setPopupState({ type: "add" })}>
            <Plus size={16} className="mr-1" /> Add Product
        </Button>
    );
};

export const EditButton = ({ id }: { id: number }) => {
    const { setPopupState } = useProduct();
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() =>
                setPopupState({
                    type: "edit",
                    id,
                })}
        >
            <Pencil size={16} />
        </Button>
    );
};
