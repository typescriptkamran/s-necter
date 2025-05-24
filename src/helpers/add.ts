import { Order, Product } from "@/types"

export const addOrder = async (order:Omit<Order, "id" | "status" | "createdAt">) => {
    let data, error;
    try {
        const request = await fetch(`/api/order/add`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify( {...order,cart: (order.cart) } ) 
        });
        if (!request.ok){
            
            error = "Failed to Add Order"
            
        } else {
            data = {
                redirected: request.redirected,
                url: request.url
            }
        }
    } catch (e) {
      
       error = e instanceof Error ? e.message : String(e)
      
    }
    return {error,data};
}

export const addProduct = async (product:Omit<Product, "id">) => {
    let data: Product | undefined, error;
    try {
        const request = await fetch(`/api/products/add`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify( product ) 
        });
        if (!request.ok){
            
            error = "Failed to Add Product"
            
        } else {
            data = await request.json()
        }
    } catch (e) {
      
       error = e instanceof Error ? e.message : String(e)
      
    }
    return {error,data};
}