import { OrderProvider } from "@/context/OrderContext";
import React from "react";
const Layout = ({children}: {children:React.ReactNode}) => {
    return (
        <>
            <OrderProvider>
                {children}
            </OrderProvider>
        </>
    );
};

export default Layout;
