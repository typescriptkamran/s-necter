"use client";
import type { Order, OrderStatus, Product } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/generic/Table";
import { CheckCircle, Clock, Info, LoaderCircle } from "lucide-react";
import React, { useActionState, useEffect } from "react";
import { useOrder } from "@/context/OrderContext";
import { Button } from "@/components/generic/Button";
import { changeOrderStatus } from "@/actions/admin/orders";
import { useSearch } from "@/context/SearchContext";

const OrderList = (
    { orders, products }: { orders: Order[]; products: Product[] },
) => {
    const { setOrders, filterBy, orderList } = useOrder();
    const { dispatch, state } = useSearch<Order>();

    useEffect(() => {
        setOrders(orders);
    }, [orders]);

    useEffect(() => {
        if (orderList.length > 0) {
            dispatch({
                type: "SET_DATASET",
                payload: orderList,
            });
        }
    }, [orderList]);
    const $orders = state.dataSet.filter((data) =>
        data.name?.toLowerCase().includes(
            state.searchTerm.toLowerCase(),
        )
    );
    const filteredOrders = filterBy === "all"
        ? $orders
        : $orders.filter((order) => order.status === filterBy);

    return (
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
            {filteredOrders.length > 0
                ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">
                                        {order.id}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">
                                                {order.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {order.phone}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {order.address}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <ul>
                                            {order.cart.items.map((
                                                item,
                                                index,
                                            ) => (
                                                <li key={index}>
                                                    {products.find((p) =>
                                                        p.id === item.id
                                                    )?.name} × {item.count}
                                                </li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                                order.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-green-100 text-green-800"
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <MarkButton
                                            id={order.id}
                                            state={order.status}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredOrders.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center py-6"
                                    >
                                        No orders found matching your filter.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )
                : (
                    <div className="p-3 text-muted-foreground flex items-center justify-center w-full flex-col gap-2 h-96">
                        <Info className="size-12" />
                        <p>No Orders</p>
                    </div>
                )}
        </div>
    );
};
export default OrderList;

const MarkButton = (
    { id, state }: {
        id: number;
        state: OrderStatus;
    },
) => {
    const { dispatch } = useOrder();
    const [actionState, formAction, isPending] = useActionState(
        changeOrderStatus,
        { success: null, id, state },
    );
    useEffect(() => {
        if (actionState.success) {
            dispatch({
                type: "UPDATE_STATUS",
                payload: { id: actionState.id, status: actionState.state },
            });
        }
    }, [actionState]);
    return (
        <form action={formAction}>
            <input
                type="hidden"
                value={id}
                name="id"
            />
            <input
                type="hidden"
                value={state === "completed" ? "pending" : "completed"}
                name="state"
            />
            <Button
                variant="outline"
                size="sm"
                disabled={isPending}
            >
                {(!isPending)
                    ? state !==
                            "completed"
                        ? <CheckCircle size={16} />
                        : (
                            <Clock
                                size={16}
                            />
                        )
                    : <LoaderCircle size={16} className="animate-spin" />}
            </Button>
        </form>
    );
};
