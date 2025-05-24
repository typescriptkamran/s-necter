import {Constants, Database} from "./supabase.types";

export type Product = Database["public"]["Tables"]["organic_Product"]["Insert"]
export interface Category {
  id: number,
  name: string,
  description:string
}
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: number;
  count: number;
}

export interface Order {
  id: number;
  name: string;
  phone: string;
  address: string;
  cart: {items: OrderItem[]} ;
  status: OrderStatus;
  createdAt: string;
}
export type OrderStatus = (typeof Constants.public.Enums.OrderStatus)[number]
export type ProductStatus = (typeof Constants.public.Enums.ProductActiveState)[number]
