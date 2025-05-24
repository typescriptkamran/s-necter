"use client"

import { Button } from "@/components/generic/Button";
import { useOrder } from "@/context/OrderContext";

const Filter = () => {
    "use client";
    const { dispatch, filterBy } = useOrder();

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
                Filter by Status:
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
export default Filter