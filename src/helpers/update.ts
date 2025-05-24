import { OrderStatus, Product } from "@/types"

export const updateOrderStatus = async (id: number, status: OrderStatus) => {
    let data, error;
    try {
        const request = await fetch(`/api/order/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, status })
        });
        if (request.ok) {
            const body = await request.json()
            if (body) data = body.message;
            else error = body.error
        }
        else {

            error = "Failed to Update Status"

        }
    } catch (e) {

        error = e instanceof Error ? e.message : String(e)

    }
    return { error, data };
}
export const updateProduct = async (product: Omit<Product, 'createdAt'>) => {
    let data, error;
    try {
        const request = await fetch(`/api/products/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product)
        });
        if (request.ok) {
            const body = await request.json()
            if (body) data = body.message;
            else error = body.error
        }
        else {

            error = "Failed to Update Product"

        }
    } catch (e) {

        error = e instanceof Error ? e.message : String(e)

    }
    return { error, data };
}