"use client";
import type { Order, OrderStatus as OrderStatusType, Product } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/generic/Table";
import {Info} from 'lucide-react'
import React, { useEffect } from "react";
import { useOrder } from "@/context/OrderContext";
import { Button } from "@/components/generic/Button";
// import { useProduct } from "@/context/ProductContext";

const OrderList = ({orders, products}: {orders: Order[], products: Product[]}) => {
    const { updateStatus,setOrders, filterBy, orderList } = useOrder();
    // const {productList} = useProduct();
    const filteredOrders = filterBy === "all"
        ? orderList
        : orderList.filter((order) => order.status === filterBy);

    function getOtherStatus(status: OrderStatusType) {
        return status === "completed" ? "pending" : "completed";
    }

    useEffect(() => {
        setOrders(orders)
    }, [orders])

    console.log(orderList[0])

    return (
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
            {orderList.length > 0
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
                                                    {products.find(p => p.id === item.id)?.name} × {item.count}
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
                                        <Button
                                            variant={order.status === "pending"
                                                ? "default"
                                                : "outline"}
                                            size="sm"
                                            onClick={() => {
                                                updateStatus(
                                                    order.id,
                                                    getOtherStatus(
                                                        order.status,
                                                    ),
                                                );
                                            }}
                                        >
                                            Mark as{" "}
                                            {getOtherStatus(order.status)}
                                        </Button>
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
