import { Category, Order, Product } from "@/types";



const withAbsoluteURL = (rel: string) => {
    const isServer = typeof window === 'undefined';
    const baseUrl = isServer 
        ? process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000' // fallback for local dev
        : '';
    console.log(`${baseUrl}${rel}`)
    return `${baseUrl}${rel}`
}
export const fetchCategories = async (): Promise<{data:Category[], error: string | undefined}> => {
    let data, error;
    try {
        const request = await fetch(withAbsoluteURL("/api/categories/all"));
        if (request.ok) {
            const body = await request.json()
            if (body) data  = body.data;
            else error = "Categories are empty"
        }
         else {
            
            error = "Failed to fetch Categories"
            
        }
    } catch (e) {
      
       error = e instanceof Error ? e.message : String(e)
      
    }
    return {error, data};
}
export const fetchProducts = async (): Promise<{data: Product[], error: string | undefined}> => {
    let data, error;
    try {
        const request = await fetch(withAbsoluteURL("/api/products/all"));

        if (request.ok) {
            const body = await request.json()
            if (body) data  = body.data;
            else error = "Products are empty"
        }
         else {
            
            error = "Failed to fetch Products"
            
        }
    } catch (e) {
      console.error(e)
       error = e instanceof Error ? e.message : String(e)
      
    }
    return {error, data};
}

export const fetchProduct = async (id: number): Promise<{data: Product[], error: string | undefined}> => {
    let data, error;
    try {
        const request = await fetch(withAbsoluteURL(`/api/products/get`), {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({ id }) 
        });
        if (request.ok) {
            const body = await request.json()
            if (body) data  = body.data;
            else error = "Product doesn't exist"
        }
         else {
            
            error = "Failed to fetch Product"
            
        }
    } catch (e) {
      
       error = e instanceof Error ? e.message : String(e)
      
    }
    return {error, data};
}
export const fetchProductWithSlug = async (slug: string): Promise<{data: Product[], error: string | undefined}> => {
    let data, error;
    try {
        const request = await fetch(withAbsoluteURL(`/api/products/get`), {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({ slug }) 
        });
        if (request.ok) {
            const body = await request.json()
            if (body) data  = body.data;
            else error = "Product doesn't exist"
        }
         else {
            
            error = "Failed to fetch Product"
            
        }
    } catch (e) {
      
       error = e instanceof Error ? e.message : String(e)
      
    }
    return {error, data};
}

export const fetchOrders = async (): Promise<{data: Order[], error: string | undefined}> => {
    let data, error;
    try {
        const request = await fetch("/api/order/all");
        if (request.ok) {
            const body = await request.json()
            if (body) data  = body.data;
            else error = "Orders are empty"
        }
         else {
            
            error = "Failed to fetch Orders"
            
        }
    } catch (e) {
      
       error = e instanceof Error ? e.message : String(e)
      
    }
    return {error, data};
}
