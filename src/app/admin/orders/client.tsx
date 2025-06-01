"use client"

import { Button } from "@/components/generic/Button";
import { Input } from "@/components/generic/Input";
import { useOrder } from "@/context/OrderContext";
import { useSearch } from "@/context/SearchContext";
import { Order } from "@/types";
import { Search } from "lucide-react";
import React, { RefObject, useEffect } from "react";

const Filter = () => {
    const { dispatch, filterBy } = useOrder();

    return (
        <div className="mb-4 flex gap-2 items-center">
            <label className="block text-md font-medium mb-1">
                Filter:
            </label>
            <div className="flex gap-2">
                <Button
                    variant={filterBy === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                        dispatch({ type: "SET_FILTER", payload: "all" })}
                >
                    All Orders
                </Button>
                <Button
                    variant={filterBy === "pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                        dispatch({ type: "SET_FILTER", payload: "pending" })}
                >
                    Pending
                </Button>
                <Button
                    variant={filterBy === "completed" ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                        dispatch({ type: "SET_FILTER", payload: "completed" })}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
};
export  {Filter}
export const SearchInput = () => {
    const ref = React.useRef<HTMLInputElement>(null);
    const { dispatch, state } = useSearch<Order>();
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
