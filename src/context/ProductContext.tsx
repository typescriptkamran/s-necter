"use client";
import React, { createContext, useContext, useReducer } from "react";
import { Product } from "@/types";
import { toast } from "sonner";
import { Constants } from "@/types/supabase.types";
export type PopupStateEdit = { type: "edit"; id: number };
export type PopupState =  PopupStateEdit| { type: "none" |  "add" };

type ProductAction =
    | { type: "SET_PRODUCTS"; payload: Product[] }
    | { type: "ADD_PRODUCT"; payload: Product }
    | { type: "CHANGE_STATE"; payload: { id: number, state: (typeof Constants.public.Enums.ProductActiveState)[number] } }
    | {
        type: "SET_POPUP";
        payload: PopupState;
    }
    | { type: "EDIT_PRODUCT"; payload: { product: Product } };

interface ProductState {
    productList: Product[];
    popupState: PopupState;
}

const initialState: ProductState = {
    productList: [],
    popupState: { type: "none" },
};

function ProductReducer(
    state: ProductState,
    action: ProductAction,
): ProductState {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, productList: action.payload };
        case "ADD_PRODUCT":
            return {
                ...state,
                productList: [...state.productList, action.payload],
            };
        case "SET_POPUP":
            return { ...state, popupState: action.payload };
        case "CHANGE_STATE":
            return {
                ...state,
                productList: state.productList.map((product) => {
                    if (product.id === action.payload.id) product.state = action.payload.state
                    return product
            }),
            };
        case "EDIT_PRODUCT":
            return {
                ...state,
                productList: state.productList.map((product) =>
                    product.id === action.payload.product.id
                        ? action.payload.product
                        : product
                ),
            };
        default:
            return state;
    }
}

interface ProductContextType extends ProductState {
    dispatch: React.Dispatch<ProductAction>;
    setPopupState: (popupState: PopupState) => void;
    updateProduct: (product: Product) => Promise<void>;
    archiveProduct: (id: Product["id"]) => Promise<void>;
    addProduct: (product: Omit<Product, "id">) => Promise<void>;
    setProducts: (products: Product[]) => Promise<void>
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = (
    { children },
) => {
    const [state, dispatch] = useReducer(ProductReducer, initialState);

    const setPopupState: ProductContextType["setPopupState"] = async (
        popupState: PopupState,
    ) => {
        dispatch({ type: "SET_POPUP", payload: popupState });
    };
    // FIXME
    const updateProduct: ProductContextType["updateProduct"] = async (product: Product) => {
        dispatch({type: 'EDIT_PRODUCT', payload: {product}})
        toast.success("Product Updated")
        setPopupState({type: 'none'})
    }
    const archiveProduct: ProductContextType["archiveProduct"] = async (id: Product["id"]) => {
            dispatch({type: 'CHANGE_STATE', payload: {id: id!, state: 'archived'}})
            toast.success("Product Deleted");
    }
    
    const addProduct: ProductContextType["addProduct"] = async (product: Product) => {
            dispatch({type: 'ADD_PRODUCT', payload: product!})
            toast.success("Product Added");
            dispatch({
                type: 'SET_POPUP', payload: {type: 'none'}
            })
        
    }

    const setProducts:ProductContextType["setProducts"] = async (products: Product[]) => {
        dispatch({type: "SET_PRODUCTS", payload: products })
    }
    const values = { ...state, dispatch, setPopupState,addProduct, updateProduct, archiveProduct, setProducts};

    return (
        <ProductContext.Provider value={values}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used within an ProductProvider");
    }
    return context;
};
