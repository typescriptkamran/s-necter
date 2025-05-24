import { OrderProvider } from "@/context/OrderContext";
import React from "react";
const Layout = ({children}: {children:React.ReactNode}) => {
    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Orders Management</h1>
            </div>
            <OrderProvider>
                {children}
            </OrderProvider>
        </>
    );
};

export default Layout;
